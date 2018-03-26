import React from 'react';
import TextField from "material-ui/TextField";
import RaisedButton from 'material-ui/RaisedButton';
import '../App.css';

 class Form extends React.Component{

  state = {

    fullName: "",
    fullNameError: "",
    email: "",
    emailError: "",
    phoneNumber: "",
    phoneNumberError: "",
  };

//this line of code gets the value from the input field and sets it to the
//state
  change = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

//some validation
  validate = () => {
    let isError = false;
    const errors = {
      fullNameError:"",
      emailError:"",
      phoneNumberError:"",
    };

  if (this.state.fullName.length < 9){
        isError = true;
        errors.fullNameError ="try with at least 8 characters!";
      }

//checking error for email
  if (this.state.email.indexOf("@") === -1) {
          isError = true;
          errors.emailError = "Requires valid email";
        }
// if there is an error we'r gonna keep the state same
// and add error
   (isError)
      this.setState({
        ...this.state,
        ...errors
    });


    return isError;
  }
// this is the function for the submit button
  onSubmit = e => {
    e.preventDefault();

//check for errors
  const err = this.validate();
//clear all the values
  if(!err){
    this.props.onSubmit(this.state);
    this.setState({

      fullName: "",
      fullNameError: "",
      email: "",
      emailError: "",
      phoneNumber: "",
      phoneNumberError: "",

    });

  };
}
  render() {
    return (
      <form>

        <TextField
          name="fullName"
          hintText="Full Name"
          // floatingLabelText="Full name"
          value={this.state.fullName}
          onChange ={e => this.change(e)}
          floatingLabelFixed
          errorText = {this.state.fullNameError}
          

        />

        <TextField
          name="email"
          hintText="email"
          type="email"
          // floatingLabelText="email"
          value={this.state.email}
          onChange ={e => this.change(e)}
          floatingLabelFixed
          errorText = {this.state.emailError}
        />
        <TextField
          name="phoneNumber"
          hintText="phoneNumber"
          // floatingLabelText="email"
          value={this.state.phoneNumber}
          onChange ={e => this.change(e)}
          floatingLabelFixed
          errorText = {this.state.phoneNumberError}
        />
        <RaisedButton label="Add New" onClick={e => this.onSubmit(e)} primary />
      </form>
    );
  }

}
export default Form;
