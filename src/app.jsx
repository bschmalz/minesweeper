import React, { Component } from 'react'
import { render } from 'react-dom'

class Board extends Component {
	constructor() {
		super();
		this.state = {
			//squares: Array(9).fill(null),
			squares: [...Array(20).keys()].map(i => Array(20)),
			xIsNext: true,
			current: 'cat is next', 
			done: false
		};
		this.click = this.click.bind(this);
		this.win = this.win;

	}

	
	click(r,b) {
		console.log('row is ', r);
		console.log('box is ', b);
		let arr = this.state.squares.slice();
		arr[r][b] = 'X';
		this.setState({squares: arr});
    }

	render() {    	
		let rows = [];
		for (let r = 0; r < 20; r++) {
			rows.push(
					<Row key = {r} row = {r} squares = {this.state.squares} onClick = {(r, b) => this.click(r,b)}/>
				);
		}

		return (

      <div id="container">
        <h1 id="header">Tic Cat Dog</h1>
        {rows}
	  </div>
      )
      
    }
}


class Box extends Component {

	render() { 
		return (
			<button className = "box" onClick = {this.props.onClick}>{this.props.value}</button>
			)
	}
}

class Row extends Component {

	render() {
		let boxes = []; 
		for (let b = 0; b < 20; b++) {
			boxes.push(
				<Box key = {b} boxkey = {b} value = {this.props.squares[this.props.row][b]} onClick = {() => this.props.onClick(this.props.row, b)} location = {this.props.row[b]}/>
				)
		}
		return (
			<div>
				{boxes}
			</div>
			)
	}
}

render(<Board />, document.getElementById('content'));
    	
