const { db } = require('../configs/firebase');

const postLogin = async (req, res) => {
  const { email, password } = req.body;

  let responseUsers;
  try {
    docs = (await db.collection('users').where('email', '==', email).get())
      .docs;
    responseUsers = docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));
    if (!responseUsers.length) {
      return res.status(400).send({
        success: false,
        message: 'Usuario o contraseña no válidos.',
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

  if (responseUsers[0].password !== password) {
    return res.status(400).send({
      success: false,
      message: 'Usuario o contraseña no válidos.',
      data: null,
    });
  }

  const personalInfo = {
    id: responseUsers[0].id,
    name: responseUsers[0].name,
    email: responseUsers[0].email,
  };

  return res.status(200).send({
    success: true,
    message: 'Login exitoso.',
    data: { user: personalInfo, token: 'test' },
  });
};

exports.postLogin = postLogin;
