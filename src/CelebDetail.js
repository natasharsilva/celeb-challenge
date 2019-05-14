import React, { Component } from "react";
// import { Link, Redirect } from 'react-router-dom'
import axios from "axios";

class CelebDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      celebrities: [],
      celebrity: null
    };
  }
  render() {
    return (
      <div className="celebDetail">
        <h1>Celeb Detail</h1>
        {!this.state.celebrity && <div>Loading...</div>}
        {this.state.celebrity && (
          <div key={this.state.celebrity[0].id}>
            <img
              src={
                "https://image.tmdb.org/t/p/w185" +
                this.state.celebrity[0].profile_path
              }
              alt=""
            />
            <br />
            <h3>{this.state.celebrity[0].name}</h3>
            <br />
            <h4>Known for</h4>
            {this.state.celebrity[0].known_for.map(movie => (
              <div key={movie.id}>
                <img
                  src={"https://image.tmdb.org/t/p/w185" + movie.backdrop_path}
                  alt=""
                />
                <br />
                {movie.name ? movie.name : movie.title}
              </div>
            ))}
          </div>
        )}
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
          celebrities: celebrities.data.results,
          celebrity: celebrities.data.results.filter(
            element => element.id === Number(this.props.match.params.celebId)
          )
        });
        console.log("THIS IS THE STATE CELEBRITY", this.state.celebrity);
      })
      .catch(err => console.log(err));
  }
}

export default CelebDetail;
