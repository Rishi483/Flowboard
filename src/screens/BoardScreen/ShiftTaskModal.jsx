import {Dialog,Typography,Stack,Chip, Button} from "@mui/material"
import ModalHeader from "../../components/layout/ModalHeader"
import { statusMap } from "./BoardInterface"
import { useState } from "react"

const ShiftTaskModal = ({shiftTask,task,onClose}) => {
    const [taskStatus,setTaskStatus]=useState(task.status);
  return (
    <Dialog open fullWidth maxWidth="xs">
      <Stack p={2}>
        <ModalHeader title="Shift task" onClose={onClose}/>
        <Stack mt={3} my={3} spacing={2}>
            <Typography>Task:</Typography>
            <Typography p={1.5} bgcolor={"#45474E"}>{task.text}</Typography>
            <Typography>Status:</Typography>
            <Stack direction={"row"} spacing={1}>
                {Object.entries(statusMap).map(([status,label])=><Chip onClick={()=>setTaskStatus(status)} variant={taskStatus===status?"filled":"outlined"} key={status} label={label}/>)}
            </Stack>
        </Stack>
        <Button onClick={()=>shiftTask(taskStatus)} variant="contained">Shift Task</Button>
      </Stack>
    </Dialog>
  )
}

export default ShiftTaskModal
