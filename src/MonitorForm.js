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
       </form>

       <h3>Your owner is: {this.state.owner}</h3>
       <h3>Your operation is: {this.state.operation}</h3>

     </div>
   );
 }
}