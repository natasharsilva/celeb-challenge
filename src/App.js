import React, { Component } from "react";
import "./App.css";
import { NavLink, Route } from "react-router-dom";
import CelebDetail from "./CelebDetail";
import axios from "axios";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      celebrities: []
    };
  }
  render() {
    return (
      <div className="App">
        <div className="header">
          <h1>Movie Celebrities</h1>
          <input type="text" placeholder="Search for a movie celebrity" />
        </div>
        <div className="container">
          <div className="row">
            <div className="col-5">
              <div className="celebrityList">
                {this.state.celebrities.map(celebrity => (
                  <div key={celebrity.id} className="celebrityItem">
                    <img
                      src={
                        "https://image.tmdb.org/t/p/w185" +
                        celebrity.profile_path
                      }
                      className="celebIcon"
                      alt=""
                    />
                    <NavLink to={"/" + celebrity.id}>{celebrity.name}</NavLink>
                  </div>
                ))}
              </div>
            </div>
            <div className="col-7">
              <Route path="/:celebId" component={CelebDetail} />
            </div>
          </div>
        </div>
      </div>
    );
  }

  componentDidMount() {
    axios
      .get(
        "http://api.themoviedb.org/3/person/popular?page=1&api_key=bfaea294cf3874e7cf9198a4c96c5f9d"
      )
      .then(celebrities => {
        this.setState({
          celebrities: celebrities.data.results
        });
        console.log(this.state.celebrities);
      })
      .catch(err => console.log(err));
  }
}

export default App;
