import React from 'react';
import TextField from "material-ui/TextField";
import RaisedButton from "material-ui/RaisedButton";
import '../App.css';
import CheckIcon from 'material-ui/svg-icons/navigation/check';
import CancelIcon from 'material-ui/svg-icons/navigation/cancel';
import {TableRow,TableRowColumn} from 'material-ui/Table';


 export default class Form extends React.Component{
   constructor(props){
     super(props);

     this.state = {
      values: {
        ...props.x
      },
       errors : {
         fullName: "",
         email: "",
         phoneNumber: ""
       }
     };
   }


//this line of code gets the value from the input field and sets it to the
//state
  change = e => {
    const{name, value}= e.target;
    this.setState(state =>({
      values:{
        ...state.values,
      [name]: value
    }
  }));
  };

//some validation
  validate = () => {
    let isError = false;
    const errors = {
      fullName:"",
      email:"",
      phoneNumber:""
    };

  const {fullName,email}= this.state.values;

  //if fullname has less than 10 characters
  if (fullName.length < 10){
        isError = true;
        errors.fullName ="try with at least 10 characters!";
      }

//checking error for email
  if (email.indexOf("@") === -1) {
          isError = true;
          errors.email = "Requires valid email";
        }
// if there is an error we'r gonna keep the state same
// and add error

      this.setState({
        errors
    });
    return isError;
  };

// this is the function for the submit button
  onSubmit = e => {
    e.preventDefault();
//check for errors
  const err = this.validate();
//clear errors
  if(!err){
    this.props.handleSave(this.props.i, this.state.values);

  }
};
  render() {
    const {header, x, i} = this.props;

      return [
        header.map((y,k)=> (
         //y is the header
            <TableRowColumn key={`trc-${k}`}>
              <TextField
                name={y.prop}
                onChange={this.change}
                value= {this.state.values[y.prop]}
                errorText={this.state.errors[y.prop]}
              />
            </TableRowColumn>
          )),
        <TableRowColumn key="icon-row-column">

          <CheckIcon onClick={this.onSubmit}/>

          <CancelIcon onClick={this.props.stopEditing}/>
        </TableRowColumn>

    ];
  }

}
