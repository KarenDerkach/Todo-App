import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import swal from "sweetalert";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TablePagination,
  TableRow,
  Paper,
  Button,
  Grid,
} from "@mui/material";

//icons
import EditIcon from "@mui/icons-material/Edit";
import ClearIcon from "@mui/icons-material/Clear";

export default function TaskList({ data }) {
  //console.log("props de taskList",data)

  const { push } = useRouter();

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - data.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  //BUTTON DELETE
  const handleDelete = async (id) => {
    // console.log("id",id)
    try {
      swal("Are you sure?", {
        dangerMode: true,
        buttons: [true, "Delete"],
      }).then(async (willDelete) => {
        if (willDelete) {
          await fetch(`${process.env.NEXT_URL}/api/tasks/${id}`, {
            method: "DELETE",
          });
          push("/task/home");
        } else {
          swal("Task salved!");
        }
      });
    } catch (err) {
      console.log(err);
    }
  };

  //if not exits tasks
  if (data.length === 0) {
    return (
      <Grid columns={1} style={{ height: "80vh" }}>
        <Grid item style={{ textAlign: "center" }}>
          <div
            style={{ fontWeight: "bold", color: "orange", fontSize: "20px" }}
          >
            There are no tasks yet
          </div>
          <img
            src="https://i1.wp.com/themeui.net/wp-content/uploads/2021/01/thumb_people_working_free_illustrations.jpg?fit=800%2C600&ssl=1"
            alt="img not found"
            style={{ width: "40vw", display: "flex", alignContent: "center" }}
          />
          <Button variant="contained" onClick={() => push("/task/create")}>
            New Task
          </Button>
        </Grid>
      </Grid>
    );
  }

  //if exits tasks

  return (
    <>
      <Grid style={{ display: "grid", alignContent: "center" }} container>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
            <TableBody>
              {(rowsPerPage > 0
                ? data?.slice(
                    page * rowsPerPage,
                    page * rowsPerPage + rowsPerPage
                  )
                : data
              ).map((task) => (
                <TableRow key={task._id}>
                  <TableCell
                    component="th"
                    scope="row"
                    style={{ backgroundColor: task.color }}
                  >
                    {task.title} ({task.status})
                  </TableCell>
                  <TableCell style={{ width: 80 }} align="right">
                    <Button onClick={() => push(`/task/${task._id}`)}>
                      {" "}
                      <EditIcon />
                    </Button>
                  </TableCell>
                  <TableCell style={{ width: 80 }} align="right">
                    <Button
                      color="error"
                      onClick={() => handleDelete(task._id)}
                    >
                      <ClearIcon />
                    </Button>
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
                  rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
                  colSpan={3}
                  count={data.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  SelectProps={{
                    inputProps: {
                      "aria-label": "rows per page",
                    },
                    native: true,
                  }}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                />
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>
        <section>
          <Link href="/task/create">
            <a>
              <Button fullWidth variant="contained" sx={{ mt: 5, mb: 2 }}>
                New Task
              </Button>
            </a>
          </Link>
        </section>
      </Grid>
    </>
  );
}
