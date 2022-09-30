const { db } = require('../configs/firebase');

const getUsers = async (req, res) => {
  let responseUsers;
  try {
    docs = (await db.collection('users').get()).docs;
    responseUsers = docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: 'Hubo un error inesperado.',
      data: error,
    });
  }

  return res.status(200).send({
    success: true,
    message: 'Usuarios listados',
    data: { users: responseUsers },
  });
};

const getUser = async (req, res) => {
  const { idUser } = req.query;
  let responseUser;
  try {
    let doc = await db.collection('users').doc(idUser).get();
    if (doc.exists) {
      responseUser = { id: idUser, ...doc.data() };
    } else {
      return res.status(400).send({
        success: false,
        message: 'Usuario no encontrado.',
        data: null,
      });
    }
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: 'Hubo un error inesperado.',
      data: error,
    });
  }

  return res.status(200).send({
    success: true,
    message: 'Usuario listado',
    data: { user: responseUser },
  });
};

const postUser = async (req, res) => {
  const { name, email, password } = req.body;

  let responseUsers;
  try {
    docs = (await db.collection('users').where('email', '==', email).get())
      .docs;
    responseUsers = docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));
    if (responseUsers.length) {
      return res.status(400).send({
        success: false,
        message: 'Ya existe un usuario con este correo.',
        data: null,
      });
    }
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: 'Hubo un error inesperado.',
      data: error,
    });
  }

  let newUser = await db.collection('users').add({
    name,
    email,
    password,
  });

  return res.status(200).send({
    success: true,
    message: 'Usuario creado.',
    data: { idUser: newUser.id },
  });
};

const patchUser = async (req, res) => {
  const { idUser, name, email, password } = req.body;

  let responseUsers;
  try {
    let doc = await db.collection('users').doc(idUser).get();
    if (!doc.exists) {
      return res.status(400).send({
        success: false,
        message: 'Usuario no encontrada.',
        data: null,
      });
    }
    let docs = (await db.collection('users').where('email', '==', email).get())
      .docs;
    responseUsers = docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));
    if (responseUsers.length && responseUsers[0]?.id !== idUser) {
      return res.status(400).send({
        success: false,
        message: 'Ya existe un usuario con este correo.',
        data: null,
      });
    }
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: 'Hubo un error inesperado.',
      data: error,
    });
  }
  let newUser = {};
  if (password) {
    newUser = {
      name,
      email,
      password,
    };
  } else {
    newUser = {
      name,
      email,
    };
  }
  await db.collection('users').doc(idUser).update(newUser);

  return res.status(200).send({
    success: true,
    message: 'Usuario actualizadoa.',
    data: { idUser },
  });
};

const deleteUser = async (req, res) => {
  const { idUser } = req.query;
  try {
    let doc = await db.collection('users').doc(idUser).get();
    if (!doc.exists) {
      return res.status(400).send({
        success: false,
        message: 'Usuario no encontrado.',
        data: null,
      });
    }
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: 'Hubo un error inesperado.',
      data: error,
    });
  }

  await db.collection('users').doc(idUser).delete();

  return res.status(200).send({
    success: true,
    message: 'Usuario eliminado',
    data: { idUser },
  });
};

exports.getUsers = getUsers;
exports.getUser = getUser;
exports.postUser = postUser;
exports.patchUser = patchUser;
exports.deleteUser = deleteUser;
