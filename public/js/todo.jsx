class Todo {

	constructor(skeleton) {

	this.content = skeleton.content;
	this.id = skeleton.id;

	}

	static index() {

		fetch("/todos").then(
			(response) => {
				response.json().then( (data) => {
					Todo.all = [];
					data.forEach(
						( element ) => { Todo.all.push(new Todo(element)); }
					); }
				);
			}
		);
		
	}

	static add(skeleton) {
		var newTodo = new Todo(skeleton);
		var body = "content=" + encodeURIComponent(skeleton.content);
		Todo.all.push(newTodo);

		Todo.rerender();

		fetch("/todos", {
			method: "POST",
			headers: {"Content-type": "application/x-www-form-urlencoded"},
			body: body
		}).then((response) => response.json().then( (data) => {
			newTodo.id = data.id;
			Todo.rerender();
		}));

	}

	static rerender() {
		this.setState({});
	}

	static delete(event, index) {
		event.preventDefault();
		const indexToDelete = Todo.all[index].id;
		Todo.all.splice(index, 1);
		fetch("/todos/" + encodeURIComponent(indexToDelete), {
			method: "DELETE"
		}).then(Todo.rerender());
	}

}

Todo.index();

export default Todo;