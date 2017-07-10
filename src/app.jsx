import React, { Component } from 'react'
import { render } from 'react-dom'


class Board extends Component {
	constructor() {
		super();
		this.state = {
			squares: [...Array(20).keys()].map(i => Array(20)),
			xIsNext: true,
			current: 'cat is next', 
			done: false
		};
		this.click = this.click.bind(this);
		this.checkNeighbors = this.checkNeighbors.bind(this);
		this.clickNeighbors = this.clickNeighbors.bind(this);
		this.win = this.win;
	}

	componentDidMount() {
		let arr = this.state.squares.slice();
		for (let i = 0; i < 20; i++) {
			for (let y = 0; y < 20; y++) {
				let random = Math.floor(Math.random() * 7) + 1; 
				if (random === 5) arr[i][y] = 'B'; 
			}
		}
		console.log('mounted');
		this.setState({squares: arr});
	}

	clickNeighbors(r,b) {
		let arr = this.state.squares.slice();
		let neighbors = [[r-1, b-1], [r-1, b], [r-1, b+1], [r, b-1], [r, b+1], [r+1, b-1], [r+1, b], [r+1, b+1]];
		neighbors.forEach(item => {
			let row = item[0];
    		let box = item[1];
    		if (row >=0 && row < 20 && box >= 0 && box < 20 && !arr[row][box] && arr[row][box] !== 0) {
    			console.log('clicking row ' + row + ' and box ' +  box);
    			this.click(row, box)
    		};
		});
	}
	
	click(r,b) {
		let arr = this.state.squares.slice();
		if (arr[r][b] === 'B') {
			console.log('game over');
			return; 
		}
		if (arr[r][b]) {
			console.log('already clicked');
			return;
		};
		console.log('not clicked'); 
		let result = this.checkNeighbors(r,b);
		arr[r][b] = result; 
		this.setState({squares: arr}, () => {
			if (result === 0) this.clickNeighbors(r,b);
		});	
    }

    checkNeighbors(r,b) {
    	let arr = this.state.squares.slice();
    	let neighbors = [[r-1, b-1], [r-1, b], [r-1, b+1], [r, b-1], [r, b+1], [r+1, b-1], [r+1, b], [r+1, b+1]];
    	let bombs = 0; 
    	neighbors.forEach(item => {
    		let row = item[0];
    		let box = item[1];
    		if (arr[row] && arr[row][box]) {
    			if (arr[row][box] === 'B') {
    				bombs++;
    			}
    		};
    	});

    	return bombs; 
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
        <h1 id="header">MineSweeper</h1>
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
    	
