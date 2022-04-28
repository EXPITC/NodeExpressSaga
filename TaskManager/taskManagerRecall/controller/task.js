const Task = require('../schema/Task');

const getTasks = async (req, res) => {
  const task = await Task.find();
  res.json(task);
};

const getTask = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findOne({ _id: id });
    if (!task)
      return res.status(404).json({
        err: { msg: 'Task not found or has been deleted', id },
      });
    res.status(201).json(task);
  } catch (err) {
    res.status(500).json({ err });
  }
};

const newTask = async (req, res) => {
  try {
    const task = await Task.create(req?.body);
    res.status(201).json({ task, status: 'success' });
  } catch (err) {
    res.status(500).json({ err });
  }
};

const editTask = async (req, res) => {
  try {
    const {
      params: { id: id },
      body,
    } = req;

    const query = { _id: id };
    const task = await Task.findOneAndUpdate(query, body, {
      new: true,
      runValidators: false,
    });

    if (!task)
      return res.status(404).json({
        err: { msg: 'Task not found or has been deleted', id },
      });

    res.status(201).json(task);
  } catch (err) {
    res.status(500).json(err);
  }
};

const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    await Task.findOneAndDelete(
      { _id: id },
      {
        new: false,
      },
    )
      .then((task) =>
        res.status(201).json({ task, status: 'successfully deleted' }),
      )
      .catch((err) =>
        res.status(404).json({
          err: { msg: 'Task not found or has been deleted', id: err.value },
        }),
      );
  } catch (err) {
    res.status(500).json(err);
  }
};

const activeTask = async (req, res) => {
  try {
    const query = { complete: false };
    const task = await Task.find(query).sort({ date: 'desc' });
    res.status(201).json(task);
  } catch (err) {
    res.status(500).json(err);
  }
};

const activeOrCompletedTaskToday = async (req, res) => {
  try {
    var { ActiveOrCompleted } = req.params;
      switch (ActiveOrCompleted) {
          case 'active': ActiveOrCompleted = true
        case 'completed': ActiveOrCompleted = false
    }
    const today = new Date();
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);

    const query = {
      completed: ActiveOrCompleted ? false : true,
      date: { $gte: today, $lt: tomorrow },
    };
    const tasks = await Task.find(query);

    res.status(201).json(ActiveOrCompleted);
  } catch (err) {
    res.status(500).json(err);
  }
};
module.exports = {
  getTasks,
  getTask,
  newTask,
  editTask,
  deleteTask,
  activeTask,
  activeOrCompletedTaskToday,
};
