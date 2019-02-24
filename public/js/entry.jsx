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
			}, 500);
	}

	list() {
		if (Todo.all == undefined)
			return (<p>fetching todo list...</p>);

		var listItems = Todo.all.map(
			(element, index) => {
				return (<div key={index} className="li-div">
				<p contentEditable="true" onInput={(e) => Todo.update(e, element) }>{element.content}</p>
				<button className="del-button"  onClick={ (e) => { Todo.delete(e, element) } } >X</button>
				</div>);
			}
		);

		return (
			<div id='list-container'>{listItems}</div>
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
			<button id="add-button" onClick={this.add}>ADD</button><br />
			{this.list()}
			</div>
		); }
}


document.addEventListener("DOMContentLoaded", () => {
  const root = document.getElementById("root");
  ReactDOM.render(<Root/>, root);
});
