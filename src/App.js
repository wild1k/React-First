import React, { Component } from "react";
import axios from "axios";
import './App.css';


function EmployeeCard (img, name, phone){
  return (
  <>
  <EmployeeCard>
    <img src={img} alt={name.first} />
    <div>
    <p>{`${name.title} ${name.first} ${name.last}`}</p>
    <p>{phone}</p>
    </div>
    </EmployeeCard>
</>
);
}


class App extends Component {
  state = {
    users:[],
    numInput: 0,
  };

  handleInputChange = (e) => {
    const {name , value} = e.target;
    this.setState({[name]: value});
  };

  makeRequest= async () => {
    const URL = `https://randomuser.me/api/?results=${this.state.numInput}&nat=us`;
    
  
    try {
     let results = await axios.get(URL);
     console.log(results.data.results);
      this.setState({users: results.data.results});
    } catch (e) {
      console.log("ERROR: " , e);
    }
  };

  renderEmployees =()=> {
    return this.state.users.map((user=> <EmployeeCard key={user.id.value} name={user.name} img={user.picture.large}  phone={user.phone}/>));
  }

  render () {
  return (
    <>
    
    <div className="App">
      <h1>Employee Directory</h1>
      <label htmlFor="numInput">
        # of Employees
        <input id="numInput" name="numInput" value={this.state.numInput} type="number" min="0" onChange={this.handleInputChange}
        />
      </label>
      <button onClick={this.makeRequest()}>Submit</button>
      <div>
      <EmployeeCard/>
      </div>
    </div>
  </>
  )};
}


export default App;
