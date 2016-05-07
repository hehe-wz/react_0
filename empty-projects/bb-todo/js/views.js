// View
window.TodoView = Backbone.View.extend({
  // Toggle
  initialize: function() {
    this.model.on('change', this.render, this);
  },
  events: {
    'change input[type=checkbox]' : 'toggle',
    // Binding
    'change .form-control' : 'update', // Binding/
    // Remove
    'click .btn-danger' : 'remove', // Remove /
  },
  toggle: function() {
    this.model.toggle();
  }, // Toggle /
  // Binding
  update: function() {
    this.model.updateText(this.$('.form-control').val());
  }, // Binding /
  // Remove
  remove: function() {
    this.model.destroy();
  }, // Remove /
  template: _.template('<span class="input-group-addon"><input <%= completed ? "checked=checked" : "" %> type="checkbox"></span><input value="<%= val %>" class="form-control<%= completed ? " finished" : "" %>" type="text"><span class="input-group-btn"><button class="btn btn-danger" type="button"><i class="glyphicon glyphicon-remove"></i></button></span>'),
  render: function() {
    this.$el.html(this.template(this.model.toJSON()));
    return this;
  },
  className: 'input-group input-group-lg',
});

window.TodosView = Backbone.View.extend({
  // MVC
  initialize: function() {
    this.collection.on('add', this.addOne, this);
    this.collection.on('reset', this.addAll, this);
    this.collection.on('destroy', this.render, this);
  }, // MVC /
  addOne: function(todoItem) {
    var todoView = new TodoView({model: todoItem});
    this.$el.append(todoView.render().el);
  },
  addAll: function() {
    this.$el.empty();
    this.collection.forEach(this.addOne, this);
  },
  render: function() {
    this.addAll();
    return this;
  },
  // Filter
  filterCompleted: function() {
    this.collection.filterCompleted();
    this.render(); // not auto-binded;
  }, // Filter /
});

// View /
