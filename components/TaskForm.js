import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { Button, Typography, TextField, MenuItem, Box } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export default function TaskForm({ task }) {
  const { query, push } = useRouter();

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
    try {
      await fetch(`${process.env.PROTOCOL}${process.env.NEXT_PUBLIC_VERCEL_URL}/api/tasks/list`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(input),
      });
    } catch (err) {
      console.log(err);
    }
  };

  const editTask = async () => {
    try {
      await fetch(`${process.env.PROTOCOL}${process.env.NEXT_PUBLIC_VERCEL_URL}/api/tasks/${query.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(input),
      });
    } catch (err) {
      console.log(err);
    }
  };

  const validate = () => {
    const errors = {};
    if (!input.title) {
      errors.title = "Title is required";
    }
    if (!input.description) {
      errors.description = "Description is required";
    }
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = validate();
    if (Object.keys(errors).length > 0) {
      return setError(errors);
    }

    if (query.id) {
      await editTask();
    } else {
      await newTask();
    }

    setInput({
      title: "",
      description: "",
      color: "",
      status: "Pending",
    });

    push("/task/home");
  };

  useEffect(() => {
    if (query.id) {
      setInput({
        title: task.title,
        description: task.description,
        color: task.color,
        status: task.status,
      });
    }
  }, []);

  return (
    <>
      <Box
        sx={{
          marginTop: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography variant="h3" component="div" gutterBottom>
          {query.id ? "Edit Task" : "Create Task"}
        </Typography>

        <Box
          component="form"
          onSubmit={handleSubmit}
          noValidate
          sx={{ mt: 1, display: "flex", flexDirection: "column" }}
        >
          {!errors.title ? (
            <TextField
              margin="normal"
              id="outlined-basic"
              label="Title"
              variant="outlined"
              name="title"
              value={input.title}
              rows="2"
              onChange={handleChangeInput}
            />
          ) : (
            <TextField
              margin="normal"
              error
              id="standard-error-helper-text"
              label="Error"
              defaultValue="Title"
              name="title"
              helperText={errors.title}
              variant="standard"
              onChange={handleChangeInput}
            />
          )}

          {!errors.description ? (
            <TextField
              margin="normal"
              id="outlined-basic"
              label="Description"
              variant="outlined"
              name="description"
              value={input.description}
              rows="2"
              onChange={handleChangeInput}
            />
          ) : (
            <TextField
              margin="normal"
              error
              id="standard-error-helper-text"
              label="Error"
              name="description"
              defaultValue="Description"
              helperText={errors.description}
              variant="standard"
              onChange={handleChangeInput}
            />
          )}

          <TextField
            margin="normal"
            id="outlined-select-currency"
            select
            label="Color"
            onChange={handleSelectColor}
            helperText="Please select your color"
            value={input.color}
          >
            {colors.map((color, index) => (
              <MenuItem key={index} value={color}>
                {color}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            margin="normal"
            id="outlined-select-currency"
            select
            label="Status"
            onChange={handleSelectStatus}
            helperText="Please select your status"
            value={input.status}
          >
            <MenuItem value="Pending">Pending</MenuItem>
            <MenuItem value="In Progress">In Progress</MenuItem>
            <MenuItem value="Done">Done</MenuItem>
          </TextField>
          <Button type="submit" variant="contained">
            {query.id ? "Update" : "Add"}
          </Button>
        </Box>
      </Box>
      <Link href="/task/home">
        <Box
          sx={{
            marginTop: 5,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Button variant="outlined" startIcon={<ArrowBackIcon />}>
            Back
          </Button>
        </Box>
      </Link>
    </>
  );
}
