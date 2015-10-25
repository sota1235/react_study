'use strict';
/**
 * main.js
 *
 * main script
 */

var React    = require('react');
var ReactDOM = require('react-dom');

var CommentBox = React.createClass({
  render: () => {
    return (
      <div className="commentBox">
        Hello, world! I am a CommentBox.
      </div>
    );
  }
});

ReactDOM.render(
  <CommentBox />,
  document.getElementById('example')
);
