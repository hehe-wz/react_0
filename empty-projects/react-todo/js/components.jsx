/** @jsx React.DOM */

var app = app || {};
app.components = app.compoennt || {};

(function() {
  'use strict';

  //JSX
  var TodoApp = app.components.TodoApp = React.createClass({
    getInitialState: function() {
      return {
        todos: [],
      };
    },

    // Component Lifecycle
    componentDidMount: function() {
      var data = app.retrieveData();
      this.setState({todos: data});
    },
    // Component Lifecycle /

    render: function() {
      return (
        <div className="outer-container">
          <p>interesting text ...</p>
          // Create component
          <NewTodo
            createNewTodo={this.createNewTodo}
          />
          <TodoList
            todos={this.state.todos}
            updateVal={this.updateVal}
            toggleCompleted={this.toggleCompleted}
            deleteTodo={this.deleteTodo}
          />
          <ClearCompleted
            clearCompleted={this.clearCompleted}
          />
          // Create component /
        </div>
      );
    },

  // Pass Props from parent
    updateVal: function(val, index) {
      var todos = this.state.todos;
      todos[index].val = val;
      this.setState({todos: todos});
    },
  // Pass Props from parent /

    // Finish Interact
    toggleCompleted: function(index) {
      var todos = this.state.todos;
      todos[index].completed = !todos[index].completed;
      this.setState({todos: todos});
    },

    deleteTodo: function(index) {
      var todos = this.state.todos;
      todos.splice(index, 1);
      this.setState({todos: todos});
    },
    // Finish Interact /

    // Create new todo
    createNewTodo: function(newValue) {
      var todos = this.state.todos;
      todos.unshift({val: newValue, completed: false});
      this.setState({todos: todos});
    },
    // Create new todo /

    // Clear completed
    clearCompleted: function() {
      var todos = this.state.todos;
      var newTodos = todos.filter(function(el, index) {
        return !el.completed;
      });
      this.setState({todos: newTodos});
    },
    // Clear completed /
  });
  //JSX /

  // Create component
  var NewTodo = app.components.NewTodo = React.createClass({
    // NewTodo state
    mixins: [
      React.addons.LinkedStateMixin,
    ],

    getInitialState: function() {
      return {
        newValue: '',
      };
    },
    // NewTodo state /

    render: function() {
      // Create new todo
      return (
        <div className="add-todo-group input-group input-group-lg">
          <span className="input-group-addon">
            <i className="glyphicon glyphicon-list-alt"></i>
          </span>
          <input
            className="form-control"
            placeholder="New Todo"
            type="text"
            valueLink={this.linkState('newValue')}
          />
          <span className="input-group-btn">
            <button
              className="btn btn-success"
              type="button"
              onClick={this.handleNewTodo}
            >
              <i className="glyphicon glyphicon-plus"></i>
            </button>
          </span>
        </div>
      );
      // Create new todo /
    },

    // NewTodo state
    handleNewTodo: function(e) {
      this.props.createNewTodo(this.state.newValue);
      this.setState({newValue: ''});
    },
    // NewTodo state
  });

  var TodoList = app.components.TodoList = React.createClass({
    render: function() {
      return (
        <div className="todos">
          {this.props.todos.map(function(el, index) {
            // Pass Props from parent (including outer)
            return (
              <TodoItem
                todo={el}
                index={index}
                updateVal={this.props.updateVal}
                toggleCompleted={this.props.toggleCompleted}
                deleteTodo={this.props.deleteTodo}
              />
            );
            // Pass Props from parent /
          }.bind(this))}
        </div>
      );
    }
  });

  var ClearCompleted = app.components.ClearCompleted = React.createClass({
    render: function() {
      // Clear completed
      return (
        <div className="btn-clear-group">
          <button
            className="btn btn-primary btn-clear"
            onClick={this.props.clearCompleted}>
            Clear Completed
          </button>
        </div>
      );
      // Clear completed /
    },
  });

  // Create component /

  // Pass Props from parent
  var TodoItem = app.components.TodoItem = React.createClass({
    render: function() {
      var inputClassName = "form-control";
      if (this.props.todo.completed) {
        inputClassName += " finished";
      }
      return (
        <div className="input-group input-group-lg">
          <span className="input-group-addon">
            <input
              checked={this.props.todo.completed}
              type="checkbox"
              onChange={this.handleToggle}
            />
          </span>
          <input className={inputClassName}
            value={this.props.todo.val}
            type="text"
            onChange={this.handleVal}
          />
          <span className="input-group-btn">
            <button
              className="btn btn-danger"
              type="button"
              onClick={this.handleDelete}
            >
              <i className="glyphicon glyphicon-remove" />
            </button>
          </span>
        </div>
      )
    },

    handleVal: function(e) {
      this.props.updateVal(e.target.value, this.props.index);
    },

    handleToggle: function(e) {
      this.props.toggleCompleted(this.props.index);
    },

    handleDelete: function(e) {
      this.props.deleteTodo(this.props.index);
    },
  });
  // Pass Props from parent /

})();
