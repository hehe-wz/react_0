ngTodo.controller('NgTodoCtrl', function($scope) {
  $scope.todos = [
    {val: "thing a", completed: false},
    {val: "thing b", completed: true},
    {val: "thing c", completed: false},
    {val: "thing d", completed: false},
    {val: "thing e", completed: true},
  ];

  // $scope.newTask = "initial value";
  $scope.addNewTask = function() {
    $scope.todos.unshift({val: $scope.newTask, completed: false});
    $scope.newTask = '';
  };

  $scope.clearCompleted = function() {
    $scope.todos = $scope.todos.filter(function(el, index) {
      return !el.completed;
    });
  };

  $scope.removeTodo = function(index) {
    $scope.todos.splice(index, 1);
  };
});
