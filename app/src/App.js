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
    const { input, data } = this.state;
    const array = input.split(' ');

    // Set array for lenght max is 9
    // i.e. 9 words max to search
    // >>>> Due to operation below for calculating relevance
    // Maximum occurence value would be 9.99999999...
    const words = array.slice(0, 10);

    for (let item in data)
    {
      let relevance = 0;
      const counts = {};

      words.forEach(word =>
      {
        // modifier g for global search
        // modifier i for case-insensitive
        const regex = new RegExp(word, 'gi');
        const count = data[item].opening_crawl.match(regex);

        if (count !== null)
        {
          // Add count (of that word occurence)
          counts[word] = count.length;

          // Calculate relevance value for that word
          let total = 0;
          for (let i = 0; i < count.length; ++i)
          {
            // https://www.w3schools.com/js/tryit.asp?filename=tryjs_numbers_inaccurate2
            total = ((total * 10) + (1 * Math.pow(10, -i)) * 10) / 10;
          }

          // Add word relevance value to total item relevance
          relevance += total;
        }
        else
        {
          counts[word] = 0;
          relevance += 0;
        }
      });

      // Add new props to current item object in array
      data[item].relevance = relevance;
      data[item].counts = counts;

    }

    // Sort by relevance value
    data.sort(function (a, b) { return b.relevance - a.relevance });
    this.setState({ data });

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
                  (data.length > 0) ?
                    data.map((e, i) => (<Item key={i} data={e} />)) :
                    <div className="status">No result...</div>
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