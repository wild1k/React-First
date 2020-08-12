import React, { Component } from "react";
import axios from "axios";
import './App.css';
import Searchbar from "./components/SearchBar/index";
import Button from "./components/Button/index";
import EmployeeCard  from "./components/EmployeeCard/index";
import NavBar from "./components/NavBar/index";


const styles = {
  employeeContainer: {
    alignContent: "spaceBetween",
    flexDirection: "column",
    flexWrap: "wrap",
  
  }
}

class App extends Component {
  state = {
    searchField: "",
    users:[],
    filteredUsers: []
  };

  componentDidMount() {
    this.makeRequest()
  }

  handleInputChange = (e) => {
    e.preventDefault();
    let usersCopy = [...this.state.users]
    this.setState({
      searchField: e.target.value, filteredUsers: usersCopy.filter(users => (
        users.name.first.toLowerCase().includes(e.target.value.toLowerCase()) ||
        users.name.last.toLowerCase().includes(e.target.value.toLowerCase()) ||
        users.name.fullName.toLowerCase().includes(e.target.value.toLowerCase())
      ))
    });
  };

  makeRequest= async () => {
    const URL = "https://randomuser.me/api/?results=30&nat=us"
    
    
    try {
     let results = await axios.get(URL);
     results.data.results.map(user => {
       const fullName = `${user.name.first} ${user.name.last}`
       user.name.fullName = fullName
       return fullName
     })

     console.log(results.data.results);

      this.setState({
        users: results.data.results,
        filteredUsers: results.data.results,
      });
    } catch (e) {
      console.log("ERROR: " , e);
    }
  };


  sortEmpAlphaFirst = (e) => {
    e.preventDefault()
    const usersCopy = [...this.state.users]
    usersCopy.sort(function(a, b){
      if(a.name.first < b.name.first) { return -1; }
    if(a.name.first > b.name.first) { return 1; }
    return 0;
    })
}

  sortEmpAlphaLast = (e) => {
    e.preventDefault()
    const usersCopy = [...this.state.users]
    const sortedUsers = usersCopy.sort((a, b) => {
      if (a.name.last < b.name.last) {
        return -1
      } else {
        return 1
      }
    })
    this.setState({ filteredUsers: sortedUsers })
  }

  renderEmployees =()=> {
    return this.state.users.map(users=> <EmployeeCard key={users.id.value} name={users.name} img={users.picture.large}  phone={users.phone} email={users.email}/>);
  }

  render () {
  return (
    <>
    <div className="App">
      <NavBar/>
     
        <Searchbar />
        <div style={styles.employeeContainer}>
        <Button onClick={this.sortEmpAlphaFirst} title={'Sort by First Name'} />
            <Button onClick={this.sortEmpAlphaLast} title={'Sort by Last Name'} />
            <Button searchField={this.state.searchField} handleInputChange={this.handleInputChange} title={'Submit'}/>

        <div className="row">
          {this.renderEmployees()}
          </div>
        </div>

    </div>
  </>
  )};
}


export default App;
