import React from "react";


export default class MonitorForm extends React.Component {

  constructor(props){
    super(props);
    this.state = { owner: '', operation: '' };
  }

  handleChangeOwner = event => {
    this.setState({ owner: event.target.value });
  };
  handleChangeOperation = event => {
    this.setState({ operation: event.target.value });
  };
  handleSearch = event => {
    //make websocket call here
  };
  doLogin = event => {
    //make websocket call here
  };
  render() {
    return (
      <div>
        <form>
          <label htmlFor="owner">Owner</label>
          <input
            type="text"
            name="owner"
            value={this.state.owner}
            onChange={this.handleChangeOwner}
          />
        <label htmlFor="operation">Operation</label>
          <input
            type="text"
            name="operation"
            value={this.state.operation}
            onChange={this.handleChangeOperation}
          />
        <input
            type="button"
            name="query"
            value="Query"
            onClick={this.handleSearch}
          />
        <input
            type="button"
            name="refreshToken"
            value="Refresh Token"
            onClick={this.handleSearch}
          />
        </form>
      </div>
    );
  }
}