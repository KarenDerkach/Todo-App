import { useEffect, useState } from 'react';
import {useRouter} from 'next/router'
import ButtonDelete from './ButtonDelete';
import TablePaginationAction from './tools/TablePaginationAction';
import PropTypes from 'prop-types';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
//icons
import EditIcon from '@mui/icons-material/Edit';
import ClearIcon from '@mui/icons-material/Clear';
//import search from '../components/tools/Img/notcontent.jpg'
//grid
import Grid from '@mui/material/Grid';



export default function TaskList ({data}){
    //console.log("props de taskList",data)

    const {push} = useRouter()

    const [open, setOpen] = useState(false);

    TablePaginationAction.propTypes = {
        count: PropTypes.number.isRequired,
        onPageChange: PropTypes.func.isRequired,
        page: PropTypes.number.isRequired,
        rowsPerPage: PropTypes.number.isRequired,
      };

      const [page, setPage] = useState(0);
      const [rowsPerPage, setRowsPerPage] = useState(5);
    
      // Avoid a layout jump when reaching the last page with empty rows.
      const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - data.length) : 0;
    
      const handleChangePage = (event, newPage) => {
        setPage(newPage);
      };
    
      const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
      };

//CONFIG DELETE BUTTON

const handleClickOpen = () => {
  setOpen(true);
};

const handleClose = () => {
  setOpen(false);
};

      

      //if not exits tasks
      if(data.length === 0){
        return (
            <Grid  columns={1} style={{height: "80vh"}}>
                <Grid item style={{textAlign:"center"}}>
            <div>There are no tasks yet</div>
            {/* <img src={search} alt="img"/> */}
            <Button variant="contained" onClick={() => push('/task/create')}>New Task</Button>
                </Grid>
            </Grid>
        
        
        )
      }

      //if exits tasks

return(
    <TableContainer component={Paper}>
    <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
      <TableBody>
        {(rowsPerPage > 0
          ? data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
          : data
        ).map((task) => (
          <TableRow key={task._id}>
            <TableCell component="th" scope="row">
              {task.title}
            </TableCell>
            <TableCell style={{ width: 80 }} align="right">
             <Button onClick={()=> push(`/task/${task._id}`)}> <EditIcon /></Button>
            </TableCell>
            <TableCell style={{ width: 80 }} align="right">
             <Button 
            //  onClick={()=>handleDelete(task._id)}
            onClick={handleClickOpen}
             > 
             <ClearIcon/> 
             </Button>
             <ButtonDelete open={open} handleClose={handleClose} id={task._id}/>
            </TableCell>
          </TableRow>
        ))}

        {emptyRows > 0 && (
          <TableRow style={{ height: 53 * emptyRows }}>
            <TableCell colSpan={6} />
          </TableRow>
        )}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
            colSpan={3}
            count={data.length}
            rowsPerPage={rowsPerPage}
            page={page}
            SelectProps={{
              inputProps: {
                'aria-label': 'rows per page',
              },
              native: true,
            }}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            ActionsComponent={TablePaginationAction}
          />
        </TableRow>
      </TableFooter>
    </Table>
  </TableContainer>
)
    
}