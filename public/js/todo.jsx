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
		if (element == null || element.id == null) {
			console.log(JSON.stringify(element));
			return ;
		}
		event.preventDefault();
		element.content = event.target.textContent;
		console.log(event.target.textContent);
		fetch("http://35.185.197.2/todos/" + element.id, {
			method: "PUT",
			headers: {"Content-type": "text/plain"},
			body: event.target.textContent
		});
	}

	static rerender() {
		this.setState({});
	}

	static delete(event, element) {
		console.log("deleting " + element.id);
		if (element == null || element.id == null)
			return ;
		event.preventDefault();
		Todo.all = Todo.all.filter( (element2) => element2.id != element.id);
		Todo.rerender();
		fetch("http://35.185.197.2/todos/" + encodeURIComponent(element.id), {
			method: "DELETE"
		});
	}

}

Todo.index();

export default Todo;