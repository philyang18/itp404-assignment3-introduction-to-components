import React from 'react';
import logo from './logo.svg';
import './App.css';
import { getResults } from './SubredditApi';
import SubredditPost from './SubredditPost';
import Loading from './Loading';
import SearchHistory from './SearchHistory';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      results: [],
      searchValue: '',
      searchHistory: [],
      loading: false,
      error: false,
      counter: 0
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);  
  }
  handleChange(event) {
    this.setState({searchValue: event.target.value});

  }

  async handleSubmit(event) {
    event.preventDefault();

    this.setState({error: false, loading: true, results: []});
    let results = await getResults(this.state.searchValue);
    if (results === 0) {
      this.setState({error: true});
    }
    else {
      if (!(this.state.searchHistory.some(item => this.state.searchValue === item))) {
         this.setState({searchHistory: [this.state.searchValue, ...this.state.searchHistory]});
      }

      this.setState({results, loading: false});
      console.log(this.state.searchHistory);
    }

  }
  handlePreviousSearch = async(search) => {
    this.setState({error: false, loading: true, results: []});
    let results = await getResults(search);
    if (results === 0) {
      this.setState({error: true});
    }
    else {
      this.setState({results, loading: false, searchValue: search});
    }
  }
  addCounter = () => {
    this.setState(prevState => {
      return {counter: prevState.counter + 1}
    })
    console.log(this.state.counter);
  }
  render() {
    return (
      <div>
        <form id="reddit-form" onSubmit={this.handleSubmit} >
          <input id="search-bar" type="search" placeholder="Search a Subreddit" value={this.state.searchValue} onChange={this.handleChange} />
          <input id="search-button" type="submit" value="Search" />
        </form>
        
        <div id="search-history">
          {this.state.searchHistory.map((search) => {
              return <SearchHistory onSelect={this.handlePreviousSearch} search={search} key={search}/>
          })}
        </div>
        {this.state.error ?
          <div id="error">Oops! Something went wrong!</div> :
          <div id="results" className="container">
            {this.state.results.length > 0 ? <div id="stats" className="row"><p className="sr-subscribers col-6">{this.state.results[0].data.subreddit_subscribers.toLocaleString()} subscribers to "{this.state.searchValue}"</p><p id="numClicks" className="col-6">{this.state.counter.toLocaleString()} post(s) clicked</p></div>: <p/> }
            {this.state.loading ? <Loading /> : this.state.results.map((result) => {
              return <SubredditPost result={result} key={result.data.id} handleCounter={this.addCounter}/>
            })}
          </div>
        }
      </div>
    );

  }
}

export default App;
