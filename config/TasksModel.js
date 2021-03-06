import mongoose, { models, model } from "mongoose";

const { Schema } = mongoose;

const entrieTaskSchema = new Schema(
  {
    title: {
      type: String,
      required: (true, "Title is required"),
    },
    description: {
      type: String,
      required: true,
      maxlength: [100, "Description must be less than 100 characters"],
    },
    status: {
      type: ["Pending", "In Progress", "Done"],
      default: ["Pending"],
    },
    color: {
      type: String,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const TaskModel = models.tasks || model("tasks", entrieTaskSchema);

export default TaskModel;
