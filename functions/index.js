const functions = require('firebase-functions');

const { pnSubscribe, pnSendMoney } = require('./controllers/pushNotifications');

exports.pnSubscribe = functions.https.onRequest(async (request, response) => {
  pnSubscribe(request, response);
});

exports.pnSendMoney = functions.https.onRequest(async (request, response) => {
  pnSendMoney(request, response);
});
