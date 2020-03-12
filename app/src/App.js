import React, { Component } from 'react';
// Components
import Item from './components/Item';
// Styles
import './Styles.css';

class App extends Component
{
  constructor()
  {
    super();
    this.state = {
      json: null,
      data: [],
      input: '',
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async componentDidMount()
  {
    // Load samples
    const res = await fetch('https://swapi.co/api/films/');
    if (res.ok)
    {
      const json = await res.json();
      this.setState({ json: json.results, data: json.results });
    }
  }

  handleChange(event)
  {
    const { value } = event.target;
    this.setState({ input: value.trim() });
  }

  handleSubmit()
  {
    console.log(this.state.input);
  }

  render()
  {
    const { json, data } = this.state;

    return (
      <div className="content" >
        <h1 style={{ marginBottom: 0 }}>Star Wars</h1>
        <h2 style={{ marginTop: 4 }}>Search App</h2>
        <div><input onChange={this.handleChange} placeholder="Type your search here..."></input></div>
        <div><button onClick={this.handleSubmit}>Search</button></div>
        <div>
          {
            (json !== null) ?
              <React.Fragment>
                {
                  data.map((e, i) => (<Item key={i} data={e} />))
                }
              </React.Fragment> :
              <div className="status">Loading...</div>
          }
        </div>
      </div>
    );
  }
}

export default App;