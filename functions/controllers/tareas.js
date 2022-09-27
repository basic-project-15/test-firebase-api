const { db } = require('../configs/firebase');

const getTareas = async (req, res) => {
  let responseTareas;
  try {
    docs = (await db.collection('tareas').get()).docs;
    responseTareas = docs.map(doc => ({
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
    message: 'Tareas listadas',
    data: { tareas: responseTareas },
  });
};

const getTarea = async (req, res) => {
  const { idTarea } = req.body;
  let responseTarea;
  try {
    let doc = await db.collection('tareas').doc(idTarea).get();
    if (doc.exists) {
      responseTarea = doc.data();
    } else {
      return res.status(400).send({
        success: false,
        message: 'Tarea no encontrada.',
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
    message: 'Tarea listada',
    data: { tarea: responseTarea },
  });
};

const postTarea = async (req, res) => {
  const { titulo, descripcion } = req.body;

  let responseTareas;
  try {
    docs = (await db.collection('tareas').where('titulo', '==', titulo).get())
      .docs;
    responseTareas = docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));
    if (responseTareas.length) {
      return res.status(400).send({
        success: false,
        message: 'Ya existe una tarea con este titulo.',
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

  nuevaTarea = await db.collection('tareas').add({
    titulo,
    descripcion,
  });

  return res.status(200).send({
    success: true,
    message: 'Tarea creada.',
    data: { idTarea: nuevaTarea.id },
  });
};

const patchTarea = async (req, res) => {
  const { idTarea, titulo, descripcion } = req.body;

  let responseTareas;
  try {
    let doc = await db.collection('tareas').doc(idTarea).get();
    if (!doc.exists) {
      return res.status(400).send({
        success: false,
        message: 'Tarea no encontrada.',
        data: null,
      });
    }
    let docs = (
      await db.collection('tareas').where('titulo', '==', titulo).get()
    ).docs;
    responseTareas = docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));
    if (responseTareas.length && responseTareas[0]?.id !== idTarea) {
      return res.status(400).send({
        success: false,
        message: 'Ya existe una tarea con este titulo.',
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

  nuevaTarea = await db.collection('tareas').doc(idTarea).update({
    titulo,
    descripcion,
  });

  return res.status(200).send({
    success: true,
    message: 'Tarea actualizada.',
    data: { idTarea },
  });
};

const deleteTarea = async (req, res) => {
  const { idTarea } = req.body;
  try {
    let doc = await db.collection('tareas').doc(idTarea).get();
    if (!doc.exists) {
      return res.status(400).send({
        success: false,
        message: 'Tarea no encontrada.',
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

  await db.collection('tareas').doc(idTarea).delete();

  return res.status(200).send({
    success: true,
    message: 'Tarea eliminada',
    data: { idTarea },
  });
};

exports.getTareas = getTareas;
exports.getTarea = getTarea;
exports.postTarea = postTarea;
exports.patchTarea = patchTarea;
exports.deleteTarea = deleteTarea;
