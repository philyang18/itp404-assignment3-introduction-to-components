import React from 'react';

export default class SubredditPost extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			result: props.result.data
		};
	}
	triggerCounter = (event) => {
		this.props.handleCounter();
	}
	render() {
		return (
			<div className="result-div row">
		    <div className="sr-score col-lg-1 col-md-2 col-sm-2">
		      {this.state.result.ups.toLocaleString()}
		    </div>
		    <div className="title-div col-lg-11 col-md-10 col-sm-10">
		      <a className="sr-title col-12" onClick={this.triggerCounter} href={this.state.result.url} target="_blank">{this.state.result.title}</a>
		      <p className="sr-author col-12">Posted by u/{this.state.result.author}</p>
				{this.state.result.num_comments > 0 ? <p className="sr-comments">{this.state.result.num_comments.toLocaleString()} comments</p> : <p className="sr-comments">No comments</p>}
		    </div>
		  </div>
		);

	}
}
