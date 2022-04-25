const { findOneAndUpdate } = require('../schema/Task');
const Task = require('../schema/Task');

const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find();
    res.status(201).json({ tasks });
  } catch (err) {
    res.status(500).json({
      error: {
        type: err.name,
        message: err.message,
      },
    });
  }
};

const createTask = async (req, res) => {
  try {
    const task = await Task.create(req.body);
    res.status(201).json({ task });
  } catch (err) {
    res.status(400).json({
      error: {
        type: err.name,
        message: err.message,
      },
    });
  }
};

const getTask = async (req, res) => {
  try {
    //   if you use findOne you can use if(!task) but if you use findById when not found it will invoke the catch and in other hand findOne will make const task = null
    Task.findById(req.params.id)
      .then((task) => res.status(201).json({ task }))
      .catch((err) =>
        res.status(404).json({
          error: {
            type: 'Not found',
            message: 'Task ID not found or has been deleted',
            id: err.value,
          },
        }),
      );
  } catch (err) {
    res.status(500).json({ err });
  }
};
const updateTask = async (req, res) => {
  try {
    const {
      params: { id: _id },
      body,
    } = req;
    // basically {new: true, runValidators: true} it's same with { ...old, new} so yeah i think you get the point and why Validators to false because we set true need name on schema so if the input from form just change the completed then it will err so wee need to disable so we can mix with old data {...data, new}.
    const task = await Task.findOneAndUpdate({ _id }, body, {
      new: true,
      runValidators: false,
    });
    if (!task)
      return res.status(404).json({
        error: {
          type: 'Not found',
          message: 'Task ID not found or has been deleted',
          id: _id,
        },
      });
    res.status(201).json({ task, status: 'success' });
  } catch (err) {
    res.status(400).json({
        error: {
          type: err.name,
          message: err.message,
        },
      })
  }
};
const deleteTask = async (req, res) => {
  try {
    const { id: _id } = req.params;
    const task = await Task.findOneAndDelete({ _id });

    if (!task)
      return res.status(404).json({
        error: {
          type: 'Not found',
          message: 'Task ID not found or has been deleted',
          id: _id,
        },
      });
    res.status(201).json({ task, status: 'success' });
  } catch (err) {
    res.status(400).json({
      error: {
        type: err.name,
        message: err.message,
      },
    });
  }
};

module.exports = {
  getAllTasks,
  createTask,
  getTask,
  updateTask,
  deleteTask,
};
