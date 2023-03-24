import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import CssBaseline from '@mui/material/CssBaseline';
import TodoCard from "./TodoCard";
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { useEffect , useState} from 'react';
import Grid from '@mui/material/Grid';
import CreateTodoCard from './CreateTodoCard';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { TextField, MenuItem } from '@mui/material';

const App = () => {
  const initialFormData = {
      description: "",
      priority: "all"
  };

  const [todoList, setTodoList] = useState([]);
  const [filterData, setFilterData] = useState(initialFormData);

  const handleChangeFilterData = (event) =>
      setFilterData((prevFormData) => ({
          ...prevFormData,
      [event.target.name]: event.target.value
  }));

  useEffect(() => {
    fetch('http://localhost:5000/api/todo/list')
       .then((res) => res.json())
       .then((data) => {
          setTodoList(data?.todos || []);
       })
       .catch((err) => {
          console.log(err.message);
       });
 }, []);

 useEffect(() => {
  const params = {}
  if (filterData.priority !== "all") {
    params.priority = filterData.priority;
  }

  params.description = filterData.description;

  fetch('http://localhost:5000/api/todo/list?'+new URLSearchParams(params))
    .then((res) => res.json())
    .then((data) => {
      setTodoList(data?.todos || []);
    })
    .catch((err) => {
      console.log(err.message);
    });
 }, [filterData])

 const handleDeleteTodo = (id) =>{
    fetch('http://localhost:5000/api/todo/delete/'+id)
      .then((res) => res.json())
      .then((data) => {
        setTodoList((prevTodoList) =>
          prevTodoList.filter((todo) => todo.id !== id)
        );
      })
      .catch((err) => {
        console.log(err.message);
      });
  }

  const handleCreateTodo = (data) => {
    fetch('http://localhost:5000/api/todo/create', {
      method: "POST",  
      mode: 'cors', // this cannot be 'no-cors'
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data), // body data type must match "Content-Type" header})
    })
      .then((res) => res.json())
      .then((data) => {
        if (!data?.error) {
          setTodoList((prevTodoList) => [
            data?.todo,
            ...prevTodoList
          ]);
        }
      })    
  };

  return <CssBaseline>
     <LocalizationProvider dateAdapter={AdapterDayjs}>
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <TaskAltIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            ToDo Task List
          </Typography>
        </Toolbar>
      </Container>
    </AppBar>
    <Box sx={{mt: 1, ml:1, mr: 1, display: "flex", flexDirection: "row"}}>
        <Paper sx = {{minWidth: "100%"}}>
        <TextField
            id="description-input"
            name="description"
            multiline
            value={filterData.description}
            variant="standard"
            onChange={handleChangeFilterData}
            fullWidth
            placeholder="Search by Description"
        />
        Select Priority:
        <TextField
            id="priority-select"
            name="priority"
            select
            value={filterData.priority}
            onChange={handleChangeFilterData}
            sx={{ width: 100, ml: 1 }}
            variant="standard"
          >
            <MenuItem default value={"all"}>All</MenuItem>
            <MenuItem value={1}>1</MenuItem>
            <MenuItem value={2}>2</MenuItem>
            <MenuItem value={3}>3</MenuItem>
            <MenuItem value={4}>4</MenuItem>
            <MenuItem value={5}>5</MenuItem>
            <MenuItem value={6}>6</MenuItem>
            <MenuItem value={7}>7</MenuItem>
            <MenuItem value={8}>8</MenuItem>
            <MenuItem value={9}>9</MenuItem>
            <MenuItem value={10}>10</MenuItem>
          </TextField>
          <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                <Grid item xs={2} sm={4} md={4}>
                  <CreateTodoCard handleCreateTodo={handleCreateTodo} />
                </Grid>
              {todoList?.map((data, index) => (
                <Grid item xs={2} sm={4} md={4} key={index}>
                  <TodoCard data = {data} handleDeleteTodo = {handleDeleteTodo}/>
                </Grid>
                  
              ))}
          </Grid>
        </Paper>
        
    </Box>
    </LocalizationProvider>
  </CssBaseline>
}

export default App;