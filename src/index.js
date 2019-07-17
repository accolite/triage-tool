import React from "react";
import { render } from "react-dom";
// import { makeData } from "./Utils";
import { makeData } from "./data/triage-data";
import matchSorter from "match-sorter";
import TreeView from './components/TreeView';
import ReqResViewer from './components/ReqResViewer';
import MonitorForm from './MonitorForm';
// Import React Table
import ReactTable from "react-table";
import "react-table/react-table.css";
import { width } from "window-size";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./style.css";

import { pathOr, values } from "ramda";

import { SocketHandlerFactory } from "./services/SocketService";

let loginResponse;

const makeStoreHelper = () => {
  return {
    dispatch(action) {
    },
    getRefreshToken() {
      return pathOr("", ["refresh_token"], loginResponse);
    },

    getAccessToken() {
      return pathOr("", ["access_token"], loginResponse);
    },

    updateToken() {
    },

    logOut() {
    },
  };
};

const socketObject = SocketHandlerFactory(
  null,
  makeStoreHelper(),
  {
    PRU_API_URL: "ws://278f7924.ngrok.io/ws",
    PRU_API_KEY: "a3b0c44298fc1c149afbf4c8996fb92427ac41e4649b934ca495991b7852b855",
  }
);
class App extends React.Component {
  constructor() {
    super();
    this.state = {
      // data: makeData(),
      data: [],
      showReqRes: false,
      selectedNodeData: {},
    };
  }
  notify = msg => toast(msg);
  onClickNode = ( nodeData ) => {
    this.setState({
      showReqRes: true,
      selectedNodeData: nodeData,
    });
  }
  handleOnCloseReqResViewer = () => {
    this.setState({
      showReqRes: false,
    });
  }
  doSearch = async (event, obj) => {
    //make websocket call here
    const access_token = pathOr("", ["access_token"], loginResponse);
    const { operation, owner } = obj;
    const payload = {
      operation: "createEvent",
      access_token,
      body: {   
        name: "monitor",
        owner: "shailsguat0@yopmail.com",
        priority: 10,
      }
    };
    const searchResponse = await socketObject.sendData(payload);
    const { status, body } = searchResponse || {};
    if (status.code === 0) {
      this.setState({
        data: values(body)
      });
    } else {
      this.setState({
        data: []
      });
      this.notify("Could not get response. Please make sure you have clicked on the login button.");
    }
  }
  doLogin = async event => {
    //make websocket call here
    const payload = {
      "operation":"login",
      "body":{
        "realm": "google",
        "loginId": "shailsguat0@yopmail.com",
        "password": "347563821"
      }
    }
    loginResponse = await socketObject.sendData(payload);
  };
  render() {
    const { data, showReqRes, selectedNodeData } = this.state;
    return (
      <div>
        <ReqResViewer
          visible={showReqRes}
          handleOnClose={this.handleOnCloseReqResViewer}
          data={selectedNodeData}
        />
        <MonitorForm
            doLogin={this.doLogin}
            doSearch={this.doSearch}
        />
        <ReactTable
          data={data}
          filterable
          defaultFilterMethod={(filter, row) =>
            String(row[filter.id]) === filter.value
          }
          columns={[
            {
              Header: "Operation",
              accessor: "operationName",
              filterMethod: (filter, row) =>
                row[filter.id].includes(filter.value)
            },
            {
              Header: "Request Timestamp",
              id: "timestamprew",
              accessor: d => pathOr("",["requestMessage", "timestamp"],d),
              filterMethod: (filter, rows) =>
                matchSorter(rows, filter.value, { keys: ["lastName"] }),
              filterAll: true
            },
            {
              Header: "Reply Timestamp",
              id: "timestampres",
              accessor: d => pathOr("",["replyMessage", "timestamp"],d),
              filterMethod: (filter, rows) =>
                matchSorter(rows, filter.value, { keys: ["lastName"] }),
              filterAll: true
            },
            {
              Header: "Status",
              id: "status",
              accessor: d => pathOr("",["replyMessage","status","code"],d),
              filterMethod: (filter, rows) =>
                matchSorter(rows, filter.value, { keys: ["lastName"] }),
              filterAll: true,
              Cell: row => (
                <span >
                  <span style={{
                    color: row.value === 0 ? '#57d500' : '#ff2e00',
                  }}>
                    &#x25cf;
                  </span> {
                    row.value
                  }
                </span>
              ),
              style: {
                textAlign: "center",
              },
            },
            {
              Header: "Request/ Response",
              id: "jsonReqRes",
              accessor: d => d,
              expander: true,
              Expander: ({ isExpanded, ...rest }) =>
                <div>
                  {isExpanded
                    ? <span>&#x2299;</span>
                    : <span>&#x2295;</span>}
                </div>,
              style: {
                cursor: "pointer",
                fontSize: 25,
                padding: "0",
                textAlign: "center",
                userSelect: "none"
              },

            },

          ]}
          defaultPageSize={10}
          className="-striped -highlight"
          SubComponent= {(row) => <TreeView data={row.original} onClickNode={this.onClickNode}/>}
        />
      </div>
    );
  }
}

render(<App />, document.getElementById("root"));
