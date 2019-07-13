import React from "react";
import { render } from "react-dom";
import { makeData } from "./Utils";
import matchSorter from "match-sorter";
import ReactJson from 'react-json-view'
import TreeView from './components/TreeView';
import MonitorForm from './MonitorForm';
// Import React Table
import ReactTable from "react-table";
import "react-table/react-table.css";
import { width } from "window-size";
import './style.css';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      data: makeData().updateCustomer,
    };
  }
  render() {
    const { data } = this.state;
    return (
      <div>
        <MonitorForm/>
        <ReactTable
          data={data}
          filterable
          defaultFilterMethod={(filter, row) =>
            String(row[filter.id]) === filter.value
          }
          columns={[
            {
              Header: "Message Id",
              accessor: "msgId",
              filterMethod: (filter, row) =>
                row[filter.id].includes(filter.value)            },
            {
              Header: "Request Timestamp",
              id: "timestamprew",
              accessor: d => d.requestMessage.timestamp,
              filterMethod: (filter, rows) =>
                matchSorter(rows, filter.value, { keys: ["lastName"] }),
              filterAll: true
            },
            {
              Header: "Reply Timestamp",
              id: "timestampres",
              accessor: d => d.replyMessage.timestamp,
              filterMethod: (filter, rows) =>
                matchSorter(rows, filter.value, { keys: ["lastName"] }),
              filterAll: true
            },
            {
              Header: "Status",
              id: "status",
              accessor: d => d.replyMessage.status.code,
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
          SubComponent= {(row) => <TreeView/>}
          // {(row) =>
          //   <div className="main-container">
          //     <div className="left-container">
          //       <ReactJson src={data[row.index].requestMessage}
          //         name={false}
          //         theme={"ocean"}
          //         enableClipboard={false}
          //         displayDataTypes={false}
          //       />
          //     </div>
          //     <div className="right-container">
          //      <ReactJson src={data[row.index].replyMessage}
          //         name={false}
          //         theme={"ocean"}
          //         enableClipboard={false}
          //         displayDataTypes={false}
          //       />
          //     </div>
          //   </div>}
        />
      </div>
    );
  }
}

render(<App />, document.getElementById("root"));
