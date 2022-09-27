const functions = require('firebase-functions');

const {
  getTareas,
  getTarea,
  postTarea,
  patchTarea,
  deleteTarea,
} = require('./controllers/tareas');

exports.getTareas = functions.https.onRequest(async (req, res) => {
  getTareas(req, res);
});

exports.getTarea = functions.https.onRequest(async (req, res) => {
  getTarea(req, res);
});

exports.postTarea = functions.https.onRequest(async (req, res) => {
  postTarea(req, res);
});

exports.patchTarea = functions.https.onRequest(async (req, res) => {
  patchTarea(req, res);
});

exports.deleteTarea = functions.https.onRequest(async (req, res) => {
  deleteTarea(req, res);
});
