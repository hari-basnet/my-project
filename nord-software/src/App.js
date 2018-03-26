import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
import './App.css';
import Form from './components/Form';
import Table from './components/Table';
import orderBy from 'lodash/orderBy';
injectTapEventPlugin();

const invertDirection = {
  asc: "desc",
  desc: "asc"
};

class App extends Component {

  state = {
    showCheckboxes: false,
    data: [
      {
      fullName: "Bijay Bania",
      email: "tgounin0@wordpress.com",
      phoneNumber: "040894849948"

    },
    {
      fullName: "hari krishna basnet",
      email: "basnet@harikrishna.com",
      phoneNumber: "040845454545"

    },
    {
      fullName: "sanjay raj bastola",
      email: "sanyay@wordpress.com",
      phoneNumber: "04082356778"
    },
    {
      fullName: "hari dutta sharma",
      email: "haridutta0@wordpress.com",
      phoneNumber: "04089567643"
    },
    {
      fullName: "Rupak jung basnet ",
      email: "rupakbasnet0@wordpress.com",
      phoneNumber: "04573473457"
    },
    {
      fullName: "balaram pokhrel",
      email: "balaram@wordpress.com",
      phoneNumber: "040894849948"
    },
    {
      fullName: "hitman bastola",
      email: "hitmanbas@wordpress.com",
      phoneNumber: "04084534948"
    },
    {
      fullName: "gaurav shumsher",
      email: "gshamsher@wordpress.com",
      phoneNumber: "040894849948"
    },
    {
      fullName: "dil bhusan pathak",
      email: "dilbhusan@wordpress.com",
      phoneNumber: "04465576878"
    },
    {
      fullName: "bal krishna basnet",
      email: "balkrishna@wordpress.com",
      phoneNumber: "044656765757"
    }
    ],
    editIdx: -1,
    columnToSort: "",
    sortDirection: "desc"
  };
  handleRemove= (i)=>{
    this.setState(state =>({
      data: state.data.filter((x,j) => j !== i),
    }));

  }
  startEditing = (i) => {
    this.setState({editIdx: i});
  }

  stopEditing = () =>{
    this.setState({editIdx: -1});
  }

  handleSave = (i, x) => {

    this.setState(state => ({
      data: state.data.map(
        (row, j) => (j=== i ? x : row)
    )
    }));
    this.stopEditing();
  };

  handleSort = columnName => {
    this.setState(state => ({
      columnToSort: columnName,
      sortDirection:
        state.columnToSort === columnName
          ? invertDirection[state.sortDirection]
          : "asc"
    }));
  };

  render() {
    return (
      <MuiThemeProvider>
        <div className="App">
          <div className = "header"><h2>Nord Software</h2></div>
          <div className = "body-part">

            <h2>List of participants</h2>
            <div className ="form-part">
              <Form onSubmit={submission => this.setState({
                data: [...this.state.data, submission]
              })}
              />
            </div>
            <div className = "table-part"></div>
            <Table
              handleSort={this.handleSort}
              handleRemove={this.handleRemove}
              startEditing={this.startEditing}
              editIdx={this.state.editIdx}
              stopEditing={this.stopEditing}
              handleSave={this.handleSave}
              columnToSort={this.state.columnToSort}
              sortDirection={this.state.sortDirection}
              data={orderBy(
                this.state.data,
                this.state.columnToSort,
                this.state.sortDirection
              )}
              header={[
                {
                  name: "Name",
                  prop: "fullName",
                },
                {
                  name: "E-mail address",
                  prop: "email",
                },
                {
                  name: "Phone Number",
                  prop: "phoneNumber",
                }

              ]}
            />
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
