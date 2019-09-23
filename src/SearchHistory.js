import React from 'react';

export default class SearchHistory extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			search: props.search
		};
	}
	handleClick = (event) => {
		event.preventDefault();
		this.props.onSelect(this.state.search);
	}
	render() {
		return (
			<p className="previous-search" onClick={this.handleClick}>{this.state.search}</p>
		);
	}

	
}