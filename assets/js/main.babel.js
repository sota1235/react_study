'use strict';
/**
 * main.js
 *
 * main script
 */

var React    = require('react');
var ReactDOM = require('react-dom');

var CommentList = React.createClass({
  render: () => {
    return (
      <div className="commentList">
        Hello, world! I am a comment list.
      </div>
    );
  }
});

var CommentForm = React.createClass({
  render: () => {
    return (
      <div className="commentForm">
        Hello, world! I am a comment form.
      </div>
    );
  }
});

var CommentBox = React.createClass({
  render: () => {
    return (
      <div className="commentBox">
        <h1>Comments</h1>
        <CommentList />
        <CommentForm />
      </div>
    );
  }
});

ReactDOM.render(
  <CommentBox />,
  document.getElementById('example')
);
