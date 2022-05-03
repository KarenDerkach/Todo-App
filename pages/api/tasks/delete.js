// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const dbConnect = require("../../../config/dbconnection");
const TasksModel = require("../../../config/TasksModel");

dbConnect();

export default (req, res) => {
  const {
    body,
    query: { id },
  } = req;

  try {
    const deleteTask = TasksModel.findByIdAndDelete(id);
    if (!deleteTask) return res.status(404).json({ message: "Task not found" });
    return res.status(204).json(deleteTask);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
