import React from 'react';
import logo from './logo.svg';
import './App.css';
import { getResults } from './SubredditApi';
import SubredditPost from './SubredditPost';
import Loading from './Loading';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      results: [],
      search: '',
      loading: false,
      error: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(event) {
    this.setState({search: event.target.value});

  }

  async handleSubmit(event) {
    event.preventDefault();
    this.setState({error: false});
    this.setState({loading: true});
    let results = await getResults(this.state.search);
    if (results === 0) {
      this.setState({error: true});
    }
    else {
      this.setState({results, loading: false});
      console.log(results);
    }

  }

  render() {
    return (
      <div>
        <form id="reddit-form" onSubmit={this.handleSubmit} >
          <input id="search-bar" type="search" placeholder="Search a Subreddit" value={this.state.search} onChange={this.handleChange} />
          <input id="search-button" type="submit" value="Search" />
        </form>
        {this.state.error ?
          <div id="error">Oops! Something went wrong!</div> :
          <div id="results" className="container">
            {this.state.results.length > 0 ? <p className="sr-subscribers">{this.state.results[0].data.subreddit_subscribers.toLocaleString()} subscribers to "{this.state.search}"</p> : <p/> }
            {this.state.loading ? <Loading /> : this.state.results.map((result) => {
              return <SubredditPost result={result} key={result.data.id}/>
            })}
          </div>

        }
      </div>
    );

  }
}

export default App;
