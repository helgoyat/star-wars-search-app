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
    this.validate = this.validate.bind(this);
    this.addWord = this.addWord.bind(this);
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
   * Check input format
   */
  validate()
  {
    const { input } = this.state;

    if (input.length > 0)
    {
      return true;
    }
    return false;
  }

  /**
   * Add default word suggestion to input
   * @param {string} word 
   */
  addWord(word)
  {
    const { input } = this.state;
    const newInput = (input.length > 0) ? input + " " + word : word;
    this.setState({ input: newInput });
  }

  /**
   * Input value change
   * @param {obj} event 
   */
  handleChange(event)
  {
    const { value } = event.target;
    this.setState({ input: value });
  }

  /**
   * Search for most relevant list items
   */
  handleSubmit()
  {
    this.setState((prevState) => ({ input: prevState.input.trim() }), () =>
    {
      const { input, list } = this.state;
      const isValid = this.validate();

      if (isValid)
      {
        const newList = [...list];

        // Set array with max length of 4
        // i.e. 4 words max to search
        const array = input.split(' ');
        const words = array.slice(0, 4);

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
              const occurrence = count.length;
              const total = this.calculateRelevance(occurrence);

              counts[word] = occurrence;
              relevance += total;
            }
            else
            {
              counts[word] = 0;
              relevance += 0;
            }
          });

          // Add new props to item
          newList[item].relevance = relevance;
          newList[item].counts = counts;
        }

        // Sort by relevance
        newList.sort(function (a, b) { return b.relevance - a.relevance });

        this.setState({ list: newList });
      }
    });
  }

  calculateRelevance(occurrence)
  {
    // Calculate word relevance value
    let relevance = 0;

    for (let i = 7; i >= 0; --i)
    {
      if (i === (7 - occurrence))
      {
        // Max occurrence value taken into account is 8 for a word
        break;
      }
      else
      {
        const bitVal = Math.pow(2, i);
        relevance += bitVal;
      }
    }

    return relevance;
  }

  render()
  {
    const { list, input } = this.state;

    return (
      <div className="content">
        <h1 style={{ marginBottom: 10 }}>Star Wars</h1>
        <div>
          <input
            value={input}
            onChange={this.handleChange}
            placeholder="Type your search here..."
          >
          </input>
        </div>
        <div>
          <font className="suggestion" onClick={() => this.addWord('empire')}>empire</font>
          <font className="suggestion" onClick={() => this.addWord('powerful')}>powerful</font>
          <font className="suggestion" onClick={() => this.addWord('mission')}>mission</font>
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