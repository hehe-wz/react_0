window.TodoApp = new (Backbone.Router.extend({
  routes: {'':'index'},
  // MVC
  initialize: function() {
    this.todoItems = new TodoItems();
    this.todosView = new TodosView({collection: this.todoItems});
    this.todosView.render();

    // Filter
    $('.btn-clear').click(function(e) {
      window.TodoApp.todosView.filterCompleted();
    }); // Filter /

    // Add
    $('.btn-success').click(function(e) {
      window.TodoApp.todoItems.add({val:$("#newTodo").val(), completed: false});
      $("#newTodo").vale('');
    }); // Add /
  }, // MVC /
  index: function() {
    // MVC
    var fixtures = [
      {val: 'Learn Backbone.js', completed:true},
      {val: 'Look at cat pictures', completed: true},
      {val: 'Also, puppies', completed: false},
      {val: 'Choose an MVC', completed: false},
      {val: 'Hear some rad presenters', completed: true}
    ];
    $('#app').html(this.todosView.el);
    this.todoItems.reset(fixtures); // MVC /
  },
  start: function() {
    Backbone.history.start();
  }
}));
