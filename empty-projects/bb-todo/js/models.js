window.TodoItem = Backbone.Model.extend({
  // Toggle
  toggle: function() {
    this.set('completed', !this.get('completed'));
  }, // Toggle /
  // Binding
  updateText: function(text) {
    this.set('val', text);
  }, // Binding/
});

window.TodoItems = Backbone.Collection.extend({
  model: TodoItem,
  // Remove
  initialize: function() {
    this.on('destroy', this.removeElement, this);
  },
  removeElement: function(model) {
    this.remove(model);
  }, // Remove /
  // Filter
  filterCompleted: function() {
    this.remove(this.filter(function(item) {
      return item.get('completed');
    }));
  } // Filter /
});
