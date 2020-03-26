import React, { Component } from 'react';
// Components
import Item from './components/Item';
// Styles
import './assets/Styles.css';

class App extends Component
{
  constructor()
  {
    super();
    this.state = {
      list: null,
      input: '',
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  /**
   * Get data from API when page loads
   */
  async componentDidMount()
  {
    // Load film samples from Star Wars API
    const res = await fetch('https://swapi.co/api/films/');
    if (res.ok)
    {
      const json = await res.json();
      this.setState({ list: json.results });
    }
  }

  /**
   * Input value change
   * @param {obj} event 
   */
  handleChange(event)
  {
    const { value } = event.target;
    this.setState({ input: value.trim() });
  }

  /**
   * Search for most relevant list items
   */
  handleSubmit()
  {
    const { input, list } = this.state;



    const array = input.split(' ');

    // Set array for lenght max is 9
    // i.e. 9 words max to search
    // >>>> Due to operation below for calculating relevance
    // Maximum occurence value would be 9.99999999...
    const words = array.slice(0, 10);

    for (let item in list)
    {
      let relevance = 0;
      const counts = {};

      words.forEach(word =>
      {
        // modifier g for global search
        // modifier i for case-insensitive
        const regex = new RegExp(word, 'gi');
        const count = list[item].opening_crawl.match(regex);

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
      list[item].relevance = relevance;
      list[item].counts = counts;

    }

    // Sort by relevance value
    list.sort(function (a, b) { return b.relevance - a.relevance });
    this.setState({ list });

  }

  render()
  {
    const { list } = this.state;

    return (
      <div className="content">
        <h1 style={{ marginBottom: 10 }}>Star Wars</h1>
        <div>
          <input
            onChange={this.handleChange}
            placeholder="Type your search here..."
          >
          </input>
        </div>
        <div><button onClick={this.handleSubmit}>Search</button></div>
        <div>
          {
            (list !== null) ?
              <React.Fragment>
                {
                  list.map((e, i) => (<Item key={i} data={e} />))
                }
              </React.Fragment> :
              <div className="status">Fetching data...</div>
          }
        </div>
      </div>
    );
  }
}

export default App;