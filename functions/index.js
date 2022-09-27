const functions = require('firebase-functions');

const {
  getTasks,
  getTask,
  postTask,
  patchTask,
  deleteTask,
} = require('./controllers/tasks');

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
