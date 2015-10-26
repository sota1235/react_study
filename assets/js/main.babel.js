'use strict';
/**
 * main.js
 *
 * main script
 */

var React    = require('react');
var ReactDOM = require('react-dom');

var Comment = React.createClass({
  render: function() {
    return (
      <div className="comment">
        <h2 className="commentAuthor">
          {this.props.author}
        </h2>
        {this.props.children}
      </div>
    );
  }
});

var CommentList = React.createClass({
  render: () => {
    return (
      <div className="commentList">
        <Comment author="Pate Hunt">This is one comment</Comment>
        <Comment author="Jordan Walke">This is *another* comment</Comment>
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
