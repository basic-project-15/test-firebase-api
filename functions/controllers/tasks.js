const { db } = require('../configs/firebase');

const getTasks = async (req, res) => {
  let responseTasks;
  try {
    docs = (await db.collection('tasks').get()).docs;
    responseTasks = docs.map(doc => ({
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
    data: { tasks: responseTasks },
  });
};

const getTask = async (req, res) => {
  const { idTask } = req.query;
  let responseTask;
  try {
    let doc = await db.collection('tasks').doc(idTask).get();
    if (doc.exists) {
      responseTask = { id: idTask, ...doc.data() };
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
    data: { task: responseTask },
  });
};

const postTask = async (req, res) => {
  const { title, description } = req.body;

  let responseTasks;
  try {
    docs = (await db.collection('tasks').where('title', '==', title).get())
      .docs;
    responseTasks = docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));
    if (responseTasks.length) {
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

  let newTask = await db.collection('tasks').add({
    title,
    description,
  });

  return res.status(200).send({
    success: true,
    message: 'Tarea creada.',
    data: { idTask: newTask.id },
  });
};

const patchTask = async (req, res) => {
  const { idTask, title, description } = req.body;

  let responseTasks;
  try {
    let doc = await db.collection('tasks').doc(idTask).get();
    if (!doc.exists) {
      return res.status(400).send({
        success: false,
        message: 'Task no encontrada.',
        data: null,
      });
    }
    let docs = (await db.collection('tasks').where('title', '==', title).get())
      .docs;
    responseTasks = docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));
    if (responseTasks.length && responseTasks[0]?.id !== idTask) {
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

  await db.collection('tasks').doc(idTask).update({
    title,
    description,
  });

  return res.status(200).send({
    success: true,
    message: 'Tarea actualizada.',
    data: { idTask },
  });
};

const deleteTask = async (req, res) => {
  const { idTask } = req.query;
  try {
    let doc = await db.collection('tasks').doc(idTask).get();
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

  await db.collection('tasks').doc(idTask).delete();

  return res.status(200).send({
    success: true,
    message: 'Tarea eliminada',
    data: { idTask },
  });
};

exports.getTasks = getTasks;
exports.getTask = getTask;
exports.postTask = postTask;
exports.patchTask = patchTask;
exports.deleteTask = deleteTask;
