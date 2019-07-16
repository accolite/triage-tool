import uuidv4 from "uuid/v4";
import { isNil } from "ramda";

const TOKEN_STRING = "access_token";

const getConnectionOpenTimeoutErrorMessage = () => "Connection timed out";
const getRequestTimeoutErrorMessage = () => "Request timed out";

const SOCKET_CONNECTION_TIMEOUT = 1000 * 60; //milliseconds
//TODO : check if there are entitlements involved. If yes, 401 can mean something else too
const TOKEN_EXPIRY_CODE = 401;
const REFRESH_TOKEN_EXPIRY_CODE = 401;
let URL_PATH;
let API_KEY;

const NO_RESPONSE_EVENTS = {
  // createEvent: true,
};

/**
 * @description Factory for the socket handler
 * @param {number} _globalTimeout - Manual global timeout. Set to 30000 by default
 */
export const SocketHandlerFactory = (
  _globalTimeout,
  storeHelper,
  appConfig
) => {
  //Private member to indicate if connection is open
  let _isOpen = false;

  URL_PATH = appConfig.PRU_API_URL;
  API_KEY = appConfig.PRU_API_KEY;
  //Private member to hold the connection details
  const _connectionHolder = {};

  //Private member to hold the wbsocket object
  let _ws = null;

  //Private member to hold the open connection promise
  let _openPromise = null;

  //Private member to hold the refresh token promise
  let _refreshTokenPromise = Promise.resolve(true);

  /**
   *
   * @param {any} data - The response from the server
   * @returns {any} connectionObject -
   */
  const _getConnectionObject = data => {
    if (!data.correlationId) {
      console.log(
        "Request Id not found in Error. Please check with backend team.",
        data
      );
      return null;
    }

    const connectionObject = _getConnectionObjectFromId(data.correlationId);
    if (connectionObject === null) {
      console.info("connectionObject not found while processing response");
      return null;
    }
    return connectionObject;
  };

  const _openConnection = (resolve, reject) => {
    console.log("Opening Websocket connection to: ", URL_PATH);
    _ws = new WebSocket(URL_PATH);
    const openConnectionTimeOutId = setTimeout(() => {
      reject(getConnectionOpenTimeoutErrorMessage());
    }, _globalTimeout);

    _ws.onopen = () => {
      if (
        openConnectionTimeOutId !== null &&
        openConnectionTimeOutId !== undefined
      ) {
        clearTimeout(openConnectionTimeOutId);
        _isOpen = true;
        const openMsg = "Connection is open";
        console.info(openMsg);
        resolve(openMsg);
      } else {
        _ws && _ws.close();
      }
    };

    _ws.onerror = e => {
      if (!isNil(openConnectionTimeOutId)) {
        clearTimeout(openConnectionTimeOutId);
        reject(getConnectionOpenTimeoutErrorMessage());
      }
      _openPromise = null;
      console.log("Connection to websocket closed", e);
    };

    _ws.onmessage = _socketIncomingConnectionHandler;

    _ws.onclose = e => {
      console.info(e.code, e.reason);
      _isOpen = false;
      _openPromise = null;
      _ws = null;
    };
  };

  const _removeConnectionObject = msgId => {
    _connectionHolder[msgId] = null;
    delete _connectionHolder[msgId];
  };

  const _getRefreshToken = () => {
    return storeHelper.getRefreshToken();
  };

  const _getConnectionObjectFromId = id => _connectionHolder[id];

  const _socketIncomingConnectionHandler = message => {
    const data = JSON.parse(message.data);
    console.log("Received", data);
    const connectionObject = _getConnectionObject(data);
    if (!connectionObject) {
      return;
    }
    clearTimeout(connectionObject.timeoutId);
    if (
      !connectionObject.isRefreshTokenCall &&
      data.status.code === TOKEN_EXPIRY_CODE
    ) {
      _refreshToken();
      return;
    }

    connectionObject.resolve(data);
    _removeConnectionObject(connectionObject.msgId);
  };

  const _updateTokenInRequests = newToken => {
    for (const key in _connectionHolder) {
      if (_connectionHolder.hasOwnProperty(key)) {
        const dataToSend = _connectionHolder[key].payload;
        if (dataToSend.hasOwnProperty("token")) {
          dataToSend["token"] = newToken;
        }
        if (dataToSend.hasOwnProperty("access_token")) {
          dataToSend["access_token"] = newToken;
        }
      }
    }
  };

  const _refreshTokenNetworkCall = (resolve, reject) => {
    const payload = {
      operation: "refreshToken",
      refresh_token: _getRefreshToken(),
    };
    const refreshTokenTimeout = 120 * 1000; //2 min timeout for refresh token
    _sendDataToSocket(payload, null, refreshTokenTimeout, true)
      .then(response => {
        if (response.status.code === REFRESH_TOKEN_EXPIRY_CODE) {
          storeHelper.logOut();
          _rejectAllPendingNetworkCalls();
          reject(false);
          _refreshTokenPromise = Promise.resolve(true);
          return;
        }
        storeHelper.updateToken(response[TOKEN_STRING]);
        _updateTokenInRequests(response[TOKEN_STRING]);
        resolve("Token refreshed");
      })
      .catch(() => {
        reject();
      });
  };

  const _rejectAllPendingNetworkCalls = () => {
    Object.keys(_connectionHolder).forEach(key => {
      clearTimeout(_connectionHolder[key]["timeoutId"]);
      _connectionHolder[key]["reject"]({
        status: {
          code: 401,
        },
      });
      _removeConnectionObject(key);
    });
  };

  const _setNewIdsToExistingConnections = () => {
    Object.keys(_connectionHolder).forEach(key => {
      if (_connectionHolder[key].isRefreshTokenCall) {
        return;
      }
      clearTimeout(_connectionHolder[key]["timeoutId"]);
      const newMsgId = uuidv4();
      _connectionHolder[newMsgId] = {
        ..._connectionHolder[key],
        msgId: newMsgId,
      };
      _connectionHolder[newMsgId]["payload"]["msgId"] = newMsgId;
      _removeConnectionObject(key);
      _makeSocketCall(
        _connectionHolder[newMsgId]["timeoutTime"],
        _connectionHolder[newMsgId]["payload"],
        _connectionHolder[newMsgId]
      );
    });
  };

  const _refreshToken = () => {
    //Make token refresh call promise
    _refreshTokenPromise = new Promise(_refreshTokenNetworkCall);
    //change the ids of the pending network calls
    _setNewIdsToExistingConnections();
  };

  const _makeSocketCall = (currentTimeout, dataToSend, connObject) => {
    const sendData = () =>
      _setTimeoutAndSendMessage(currentTimeout, dataToSend, connObject);

    //TODO Simplify below logic
    if (_isOpen) {
      _refreshTokenPromise.then(sendData).catch(console.log);
    } else {
      if (isNil(_openPromise)) {
        _openPromise = new Promise(_openConnection);
      }
      _openPromise
        .then(() => _refreshTokenPromise)
        .then(sendData)
        .catch(rejectConnection); //This is the catch for the open connection promise
    }

    const rejectConnection = () => {
      _openPromise = null;
      // reject("Connection cannot open");
    };
  };

  const _sendDataToSocket = (
    inputData,
    screenCode,
    localTimeOut,
    isRefreshTokenCall
  ) => {
    const connectionPromise = new Promise((resolve, reject) => {
      const msgId = uuidv4();
      const {
        context,
        actionType,
        actionPayload,
        ...restOfInputData
      } = inputData;
      const dataToSend = {
        msgId,
        ...restOfInputData,
        apikey: API_KEY,
      };

      const currentTimeout = localTimeOut || _globalTimeout;
      const connObject = {
        msgId,
        resolve,
        reject,
        screenCode,
        context,
        actionType,
        actionPayload,
        payload: dataToSend,
        timeoutTime: currentTimeout,
        isRefreshTokenCall,
      };

      if (NO_RESPONSE_EVENTS[dataToSend.operation]) {
        //if no response expected, resolve the promise
        resolve();
      } else {
        //cache request (connObject) only when response is expected
        _connectionHolder[msgId] = connObject;
      }
      _makeSocketCall(currentTimeout, dataToSend, connObject);
    });
    return connectionPromise;
  };

  const _setTimeoutAndSendMessage = (currentTimeout, data, connObject) => {
    if (currentTimeout > 0 && !NO_RESPONSE_EVENTS[data.operation]) {
      _connectionHolder[data.msgId]["timeoutId"] = setTimeout(() => {
        connObject.reject(getRequestTimeoutErrorMessage());
        delete _connectionHolder[connObject.msgId];
      }, currentTimeout);
    }
    const dataToSend = JSON.stringify(data);
    console.log("Sending: ", dataToSend);
    _ws.send(dataToSend);
  };

  // Code for socket handler
  function SocketHandler() {
    _globalTimeout = _globalTimeout || SOCKET_CONNECTION_TIMEOUT;
  }

  SocketHandler.prototype.sendData = (
    socketPostData,
    screenKey,
    localTimeOut
  ) => _sendDataToSocket(socketPostData, screenKey, localTimeOut, false);

  SocketHandler.prototype.stopListening = () => {
    if (!isNil(_ws)) {
      _ws.close();
    }
    _isOpen = false;
  };

  SocketHandler.prototype.startListening = () => new Promise(_openConnection);

  return new SocketHandler();
};
