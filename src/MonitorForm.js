import React from "react";

//call api
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
  doSearch = event => {
    return this.props.doSearch(event, {
      owner: this.state.owner,
      operation: this.state.operation,
    });
  }

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
            name="login"
            value="Login"
            onClick={this.props.doLogin}
          />
          <input
            type="button"
            name="query"
            value="Query"
            onClick={this.doSearch}
          />
        </form>
      </div>
    );
  }
}