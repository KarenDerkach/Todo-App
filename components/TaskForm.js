import { useState, useEffect } from "react";
import {useRouter} from 'next/router'
import FormControl from '@mui/material/FormControl';
import { InputLabel, Input } from "@mui/material";


export default function TaskForm({task}) {

    const {query, push} = useRouter()
  

    const [input, setInput] = useState({
    title: "",
    description: "",
    color: "",
    status: "Pending",
  });

  const [errors, setError] = useState({
    title: "",
    description: "",
  });

  const colors = ["red🔴", "yellow🟡", "green🟢", "blue🔵"];

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

  const newTask = async () => {
    try{
      await fetch("http://localhost:3000/api/tasks/list", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(input),
        })
      }
      catch(err){
        console.log(err)
      }
    }

    const editTask  = async () => {
      try{
        await fetch(`http://localhost:3000/api/tasks/${query.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          }
          ,body: JSON.stringify(input),
        })
      
      }catch(err){
        console.log(err)
      }
    }
  

  const validate = () => {
    const errors = {};
    if (!input.title) {
      errors.title = "Title is required";
    }
    if (!input.description) {
      errors.description = "Description is required";
    }
    return errors;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = validate();
    if (Object.keys(errors).length > 0) {
       return setError(errors);
    }

    if(query.id){
      await editTask()
    }else{
      await newTask()
    }

    setInput({
      title: "",
      description: "",
      color: "",
      status: "Pending",
    });

    push('/task/home')

  };

  useEffect(()=>{
    if(query.id){
      setInput({
        title: task.title,
        description: task.description,
        color: task.color,
        status: task.status,
      })
    }
  },[])

  return (
    <div>
 
      <h1>{query.id ? "Edit Task" : "Create Task"}</h1>

      <FormControl onSubmit={handleSubmit}>
        <InputLabel  htmlFor="my-input">Title</InputLabel>
        <Input
          type="text"
          name="title"
          value={input.title}
          placeholder="Title"
          onChange={handleChangeInput}
        />
        {errors.title && <p>{errors.title}</p>}
        <InputLabel>Description</InputLabel>
        <textarea
          name="description"
          value={input.description}
          placeholder="Description"
          rows="2"
          onChange={handleChangeInput}
        />
        {errors.description && <p>{errors.description}</p>}
        <InputLabel>Color</InputLabel>
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
        <InputLabel>Status</InputLabel>
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
        <button type="submit">{query.id ? "Update":"Add"}</button>
      </FormControl>
   
    </div>
  );
}
