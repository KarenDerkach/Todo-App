import axios from "axios";
import { useState } from "react";
import {useRouter} from 'next/router'

export default function TaskForm() {

    const router = useRouter()
  
    const [input, setInput] = useState({
    title: "",
    description: "",
    color: "",
    status: "Pending",
  });

  const colors = ["🔴", "🟡", "🟢", "🔵"];

  const handleChangeInput = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  const handleSelectColor = (e) => {
    setInput({
      ...input,
      color: e.target.value,
    });
  };

  const handleSelectStatus = (e) => {
    setInput({
      ...input,
      status: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await axios.post("api/tasks/list", {
      title: input.title,
      description: input.description,
      status: input.status,
      color: input.color,
    });
    console.log(response);
    setInput({
      title: "",
      description: "",
      color: "",
      status: "Pending",
    });
    router.push('/tasks/home')

  };
  return (
    <div>
      <h1>Task Form</h1>

      <form onSubmit={handleSubmit}>
        <label>Title</label>
        <input
          type="text"
          name="title"
          value={input.title}
          placeholder="Title"
          onChange={handleChangeInput}
        />
        <label>Description</label>
        <textarea
          name="description"
          value={input.description}
          placeholder="Description"
          rows="2"
          onChange={handleChangeInput}
        />
        <label>Color</label>
        <select
          type="text"
          name="color"
          placeholder="Color"
          onClick={handleSelectColor}
        >
          {colors.map((color, index) => (
            <option key={index} value={color}>
              {color}
            </option>
          ))}
        </select>
        <label>Status</label>
        <select
          type="text"
          name="status"
          placeholder="Status"
          onClick={handleSelectStatus}
        >
          <option value="Pending">Pending</option>
          <option value="In Progress">In Progress</option>
          <option value="Done">Done</option>
        </select>
        <button type="submit">Add Task</button>
      </form>
    </div>
  );
}
