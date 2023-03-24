import { Card, CardHeader, CardContent, CardActions } from "@mui/material"
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";

const TodoCard = ({data, handleDeleteTodo}) => {
    return <Card sx = {{m: 2 }}>
        <CardHeader>
        </CardHeader>
        <CardContent>
            <p>{data.description}</p>
            
        </CardContent>
        <CardActions>
        Priority: {data.priority}
        <IconButton
          sx = {{ml: "auto"}}
          aria-label="delete"
          onClick={() => handleDeleteTodo(data.id)}
        >
          <DeleteIcon />
        </IconButton>
        </CardActions>
    </Card>
}

export default TodoCard;