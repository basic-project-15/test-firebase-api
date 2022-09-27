const { db, messaging } = require("../configs/firebase");

const pnSubscribe = async (request, response) => {
  const { phoneNumber, fcmToken } = request.body;

  let responseUser;
  try {
    docs = (await db.collection("users").where('phoneNumber', '==', phoneNumber).get()).docs;
    responseUser = docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    return response.status(400).send({
      success: false,
      message: "Ubo un error inesperado.",
      data: error,
    });
  }

  if (!responseUser.length) {
    let newUser;
    try {
      newUser = await db.collection("users").add({
        phoneNumber,
        fcmToken,
      });
    } catch (error) {
      return response.status(400).send({
        success: false,
        message: "Ubo un error inesperado.",
        data: error,
      });
    }
    return response.status(200).send({
      success: true,
      message: "Usuario agregado",
      data: newUser.id,
    });
  } else {
    const idUser = responseUser[0].id;
    try {
      await db.collection("users").doc(idUser).update({
        fcmToken,
      });
    } catch (error) {
      return response.status(400).send({
        success: false,
        message: "Ubo un error inesperado.",
        data: error,
      });
    }
    return response.status(200).send({
      success: true,
      message: "Usuario actualizado",
      data: idUser,
    });
  }
}

exports.pnSubscribe = pnSubscribe;

const pnSendMoney = async (request, response) => {
  const { phoneNumber, title, description } = request.body;

  let responseUser;
  try {
    docs = (await db.collection("users").where('phoneNumber', '==', phoneNumber).get()).docs;
    responseUser = docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    return response.status(400).send({
      success: false,
      message: "Ubo un error inesperado.",
      data: error,
    });
  }
  if (!responseUser.length) {
    return response.status(400).send({
      success: false,
      message: "Usuario no encontrado",
      data: {},
    });
  }

  try {
    const tokens = [responseUser[0].fcmToken];
    const payload = {
      notification: {
        title,
        body: description,
        sound: 'default',
        badge: '1',
      },
    };
    messaging.sendToDevice(tokens, payload);
  } catch (error) {
    return response.status(400).send({
      success: false,
      message: "Usuario no encontrado",
      data: {},
    });
  }
  return response.status(200).send({
    success: true,
    message: "Push notification enviada.",
    data: phoneNumber,
  });
}

exports.pnSendMoney = pnSendMoney;
