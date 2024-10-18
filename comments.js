// Create web server and listen on port 3000
// Load the comments.json file and read the comments array
// Create a route that returns all comments
// Create a route that returns a single comment by ID
// Create a route that returns all comments by a specific user
// Create a route that returns all comments that contain a specific keyword
// Create a route that returns all comments by a specific user that contain a specific keyword
// Create a route that returns all comments that contain a specific keyword and are posted by a specific user
// Create a route that returns all comments that contain a specific keyword and are posted before a specific date
// Create a route that returns all comments that contain a specific keyword and are posted after a specific date
// Create a route that returns all comments that contain a specific keyword and are posted between two specific dates

// Load the express library
const express = require('express');
const app = express();

// Load the comments.json file
const comments = require('./comments.json');

// Create a route that returns all comments
app.get('/comments', (req, res) => {
  res.json(comments);
});

// Create a route that returns a single comment by ID
app.get('/comments/:id', (req, res) => {
  const comment = comments.find(comment => comment.id === parseInt(req.params.id));
  if (!comment) {
    return res.status(404).send('The comment with the given ID was not found');
  }
  res.json(comment);
});

// Create a route that returns all comments by a specific user
app.get('/comments/user/:user', (req, res) => {
  const userComments = comments.filter(comment => comment.user === req.params.user);
  if (userComments.length === 0) {
    return res.status(404).send('The user with the given name was not found');
  }
  res.json(userComments);
});

// Create a route that returns all comments that contain a specific keyword
app.get('/comments/keyword/:keyword', (req, res) => {
  const keywordComments = comments.filter(comment => comment.text.includes(req.params.keyword));
  if (keywordComments.length === 0) {
    return res.status(404).send('The keyword was not found');
  }
  res.json(keywordComments);
});

// Create a route that returns all comments by a specific user that contain a specific keyword
app.get('/comments/user/:user/keyword/:keyword', (req, res) => {
  const userKeywordComments = comments.filter(comment => 
    comment.user === req.params.user && comment.text.includes(req.params.keyword)
  );
  if (userKeywordComments.length === 0) {
    return res.status(404).send('No comments found for the given user and keyword');
  }
  res.json(userKeywordComments);
});