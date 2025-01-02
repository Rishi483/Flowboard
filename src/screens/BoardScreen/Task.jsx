import { Stack,Typography,IconButton, Icon } from "@mui/material"
import DeleteIcon from "@mui/icons-material/Delete"
import { Draggable } from "react-beautiful-dnd"
import DragHandleIcon from '@mui/icons-material/DragHandle';

const Task = ({id,text,removeTask,index,onClick}) => {
  return (
    <Draggable draggableId={id} index={index}>
        {(provided)=><Stack  {...provided.draggableProps} ref={provided.innerRef} direction="row" alignItems={"center"} spacing={1}>
        <IconButton {...provided.dragHandleProps}><DragHandleIcon/></IconButton>
        <Typography {...(!!onClick ? {onClick:onClick}:{})} width="100%" p={1} border="1px solid" borderColor="#777980" bgcolor="#45474E">
            {text}
        </Typography>
        <IconButton onClick={removeTask}><DeleteIcon/></IconButton>
        </Stack>}
    </Draggable> 
  )
}

export default Task
