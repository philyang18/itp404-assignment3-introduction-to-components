import React from 'react';

export default function SubredditPost(props) {
	let result = props.result.data;
	return (
		<div className="result-div row">
	    <div className="sr-score col-lg-1 col-md-2 col-sm-2">
	      {result.ups.toLocaleString()}
	    </div>
	    <div className="title-div col-lg-11 col-md-10 col-sm-10">
	      <a className="sr-title col-12" href={result.url} target="_blank">{result.title}</a>
	      <p className="sr-author col-12">Posted by u/{result.author}</p>
				{result.num_comments > 0 ? <p className="sr-comments">{result.num_comments.toLocaleString()} comments</p> : <p className="sr-comments">No comments</p>}
	    </div>
	  </div>
	);


}
