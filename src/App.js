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

  handleInputChange = event => {
    this.setState({ search: event.target.value });
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

  searchByLast = (e) => {
    e.preventDefault()
    const search = this.state.searchField
    const sortedUsers = this.state.users.filter((users, searchField) => {
      if (search === users.name.last){
        return true
      }
      if (search !== users.name.last) {
         console.log(searchField);
        return false
      }
      return 0;
    })
    this.setState({ filteredUsers: sortedUsers})
   
}


  sortEmpAlphaFirst = (e) => {
    e.preventDefault()
    const sortedUsers = this.state.filteredUsers.sort((a, b) => {
      if (a.name.first < b.name.first) {
        return -1
      } 
      if (a.name.first > b.name.first) {
        return 1
      }
      return 0;
    })
    this.setState({ filteredUsers: sortedUsers })

}

  sortEmpAlphaLast = (e) => {
    e.preventDefault()
    const sortedUsers = this.state.filteredUsers.sort((a, b) => {
      if (a.name.last < b.name.last) {
        return -1
      } 
      if (a.name.last > b.name.last) {
        return 1
      }
      return 0;
    })
    this.setState({ filteredUsers: sortedUsers })
    console.log(this.state);
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
        <Button onHandleClick={this.sortEmpAlphaFirst} title={'Sort by First Name'} />
            <Button onHandleClick={this.sortEmpAlphaLast} title={'Sort by Last Name'} />
            {/* <Button onHandleClick={this.searchByLast} title={'Submit'}/> */}

        <div className="row">
          {this.renderEmployees()}
          </div>
        </div>

    </div>
  </>
  )};
}


export default App;
