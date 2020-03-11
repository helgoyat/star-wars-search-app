import React, { Component } from 'react';
import './Styles.css';

class App extends Component
{
  constructor()
  {
    super();
    this.state = {
      data: []
    }
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit()
  {
    fetch('https://swapi.co/api/films/1/')
      .then(response => response.json())
      .then(json => console.log(json))
  }

  render()
  {
    return (
      <div className="content" >
        <h1 style={{ marginBottom: 0 }}>Star Wars</h1>
        <h2 style={{ marginTop: 4 }}>Search App</h2>
        <div><input placeholder="Type your search here..."></input></div>
        <div><button onClick={this.handleSubmit}>Search</button></div>
      </div>
    );
  }
}

export default App;