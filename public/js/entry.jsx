import React from 'react';
import ReactDOM from 'react-dom';
import Todo from './todo';



class Root extends React.Component {

	constructor(props)
	{
		super(props);
		Todo.rerender = Todo.rerender.bind(this);
		setTimeout(
			() => {
				this.setState({});
				console.log("fetched");
			}, 500);
	}

	list() {
		if (Todo.all == undefined)
			return (<p>fetching todo list...</p>);

		var listItems = Todo.all.map(
			(element, index) => {
				return (<div key={index} >
				<li style={{display: 'inline'}}>{JSON.stringify(element)}</li>
				<button style={{display: 'inline'}} onClick={ (e) => { Todo.delete(e, index) } } >X</button>
				</div>);
			}
		);

		return (
			<ul>{listItems}</ul>
		)
	}

	add(e) {
		e.preventDefault();
		const input = document.getElementById("new-todo");
		const content = input.value;
		input.value = "";
		Todo.add({
			content: content
		});
	}

	render() {
		return (
			<div>
			<input id="new-todo" type="text" placeholder="New Todo Item"></input><br />
			<button onClick={this.add}>Add</button><br />
			{this.list()}
			</div>
		); }
}


document.addEventListener("DOMContentLoaded", () => {
  const root = document.getElementById("root");
  ReactDOM.render(<Root/>, root);
});
