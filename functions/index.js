const functions = require('firebase-functions');

const {
  getTasks,
  getTask,
  postTask,
  patchTask,
  deleteTask,
} = require('./controllers/tasks');
const {
  getUsers,
  getUser,
  postUser,
  patchUser,
  deleteUser,
} = require('./controllers/users');
const { postLogin } = require('./controllers/auth');

// Tasks
exports.getTasks = functions.https.onRequest(async (req, res) => {
  getTasks(req, res);
});

exports.getTask = functions.https.onRequest(async (req, res) => {
  getTask(req, res);
});

exports.postTask = functions.https.onRequest(async (req, res) => {
  postTask(req, res);
});

exports.patchTask = functions.https.onRequest(async (req, res) => {
  patchTask(req, res);
});

exports.deleteTask = functions.https.onRequest(async (req, res) => {
  deleteTask(req, res);
});

// Users
exports.getUsers = functions.https.onRequest(async (req, res) => {
  getUsers(req, res);
});

exports.getUser = functions.https.onRequest(async (req, res) => {
  getUser(req, res);
});

exports.postUser = functions.https.onRequest(async (req, res) => {
  postUser(req, res);
});

exports.patchUser = functions.https.onRequest(async (req, res) => {
  patchUser(req, res);
});

exports.deleteUser = functions.https.onRequest(async (req, res) => {
  deleteUser(req, res);
});

// Auth
exports.postLogin = functions.https.onRequest(async (req, res) => {
  postLogin(req, res);
});
