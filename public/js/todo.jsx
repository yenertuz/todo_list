class Todo {

	constructor(skeleton) {

	this.content = skeleton.content;
	this.id = skeleton.id;

	}

	static index() {

		fetch("http://35.185.197.2/todos").then(
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

		fetch("http://35.185.197.2/todos", {
			method: "POST",
			headers: {"Content-type": "application/x-www-form-urlencoded"},
			body: body
		}).then((response) => response.json().then( (data) => {
			newTodo.id = data.id;
			Todo.rerender();
		}));

	}

	static update(event, element) {
		if (element.id == null) {
			console.log(JSON.stringify(element));
			return ;
		}
		event.preventDefault();
		element.content = event.target.innerHTML;
		fetch("http://35.185.197.2/todos", {
			method: "PUT",
			headers: {"Content-type": "text/plain"},
			body: event.target.innerHTML
		});
	}

	static rerender() {
		this.setState({});
	}

	static delete(event, index) {
		if (index == null)
			return ;
		event.preventDefault();
		Todo.all = Todo.all.filter( (element) => element.id != index);
		Todo.rerender();
		fetch("http://35.185.197.2/todos/" + encodeURIComponent(index), {
			method: "DELETE"
		});
	}

}

Todo.index();

export default Todo;