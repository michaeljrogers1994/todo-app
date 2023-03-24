import { Card, CardContent, CardActions } from "@mui/material"
import IconButton from "@mui/material/IconButton";
import { useState } from "react";
import MenuItem from "@mui/material/MenuItem";
import SaveIcon from "@mui/icons-material/Save";
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import dayjs from 'dayjs';
import TextField from "@mui/material/TextField";

const CreateTodoCard = ({data, handleCreateTodo}) => {

    const initialFormData = {
        description: "",
        priority: 1
    };

    const [formData, setFormData] = useState(initialFormData);
    const [dueDate, setDueDate] = useState(dayjs('2022-04-17T15:30'));

    const handleChangeFormData = (event) =>
        setFormData((prevFormData) => ({
            ...prevFormData,
        [event.target.name]: event.target.value
    }));
    
  
    const handleSaveFormData = () => {
        handleCreateTodo({...formData, dueDate: dueDate["$d"].toString()});
        setFormData(initialFormData);
    };

    return <Card sx = {{m: 2 }}>
        <CardContent>
            <TextField
                id="description-input"
                name="description"
                multiline
                value={formData.description}
                variant="standard"
                onChange={handleChangeFormData}
                fullWidth
                placeholder="Description"
            />
            <DateTimePicker
                label="Due Date"
                name = ""
                sx ={{mt: 1}}
                value={dueDate}
                onChange={(newValue) => setDueDate(newValue)}
            />
        </CardContent>
        <CardActions>
            Priority: 
        <TextField
            id="priority-select"
            name="priority"
            select
            value={formData.priority}
            onChange={handleChangeFormData}
            sx={{ width: 100, ml: 1 }}
            variant="standard"
          >
            <MenuItem default value={1}>1</MenuItem>
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
          <IconButton sx = {{ml: "auto"}} aria-label="save" onClick={() => handleSaveFormData()}>
            <SaveIcon />
            </IconButton>
        </CardActions>
    </Card>
}

export default CreateTodoCard;