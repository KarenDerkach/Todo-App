// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const dbConnect = require("../../../config/dbconnection");
const TasksModel = require("../../../config/TasksModel");

dbConnect();

export default async (req, res) => {
  const {
    body,
    query: { id },
    method,
  } = req;
  switch (method) {
    case "GET":
      try {
        const task = await TasksModel.findById(id);
        if (!task) return res.status(404).json({ message: "Task not found" });
        return res.status(200).json(task);
      } catch (err) {
        return res.status(500).json({ message: err.message });
      }
    case "PUT":
      try {
        const findTask = await TasksModel.findByIdAndUpdate(id, body, {
          new: true,
        });
        if (!findTask)
          return res.status(404).json({ message: "Task not found" });
        return res.status(200).json(findTask);
      } catch (err) {
        res.status(500).json({ message: err.message });
      }
    default:
        res.status(400).json({ message: "Method not allowed" });
  }
};
