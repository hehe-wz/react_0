/** @jsx React.DOM */

var app = app || {};

(function() {
  'use strict';

  // Component Lifecycle
  app.retrieveData = function() {
    return app.FIXTURES;
  };
  // Component Lifecycle /

  //JSX
  app.init = function() {
    var TodoApp = app.components.TodoApp;
    React.renderComponent(
      <TodoApp />,
      document.getElementById('app')
    );
  };

  app.init();
  //JSX /

})();
