import React from 'react'
import { useRouter } from 'next/router';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
// import Paper from '@mui/material/Paper';
// import Draggable from 'react-draggable';

export default function ButtonDelete({open, handleClose, id}) {

    const router = useRouter();

    const handleDelete = async (id) => {
        // console.log("id",typeof(id))
        try{
          await fetch(`http://localhost:3000/api/tasks/${id}`,{
              method: 'DELETE'

          })         
      }
      catch(err){
          console.log(err)
      }
      }
    const deleteTask = () => {
        handleDelete(id)
        router.push('/task/home')
        handleClose()
    }
  return (
    <div>
        <Dialog
        open={open}
        onClose={handleClose}
        //PaperComponent={PaperComponent}
        aria-labelledby="draggable-dialog-title"
      >
        <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
          Delete Task
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this task?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={deleteTask}>Delete</Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
