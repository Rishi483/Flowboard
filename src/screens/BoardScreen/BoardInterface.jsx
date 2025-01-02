import { Grid } from "@mui/material"
import BoardTab from "./BoardTab"
import AddTaskModal from "./AddTaskModal"
import { useCallback, useState } from "react"
import useApp from "../../hooks/useApp"
import useStore from "../../store"
import { DragDropContext } from "react-beautiful-dnd"
import AppLoader from "../../components/layout/AppLoader"
import ShiftTaskModal from "./ShiftTaskModal"

export const statusMap = {
    todos: 'Todos',
    inProgress: 'In Progress',
    completed: "Completed"
}

const BoardInterface = ({boardData,boardId,updateLastUpdated}) => {
    const [addTaskTo,setAddTaskTo]=useState("");
    const [tabs,setTabs]=useState(structuredClone(boardData));
    const {updateBoardData}=useApp();
    const [loading,setLoading]=useState(false);
    const {setToastr}=useStore();
    const [shiftTask,setShiftTask]=useState(null);
    
    const handleOpenAddTaskModal=useCallback((status)=>setAddTaskTo(status),[]);
    
    const handleOpenShiftTaskModal=useCallback(
        (task)=>setShiftTask(task)
        ,[]
    )
    
    const handleShiftTask=async(newStatus)=>{
        if(newStatus===shiftTask.status) return setShiftTask(null);;
        const dClone=structuredClone(tabs);
        const oldStatus=shiftTask.status;
        
        const[task]=dClone[oldStatus].splice(shiftTask.index,1);
        dClone[newStatus].unshift(task);
        try {
            await handleUpdateBoardData(dClone);
            setShiftTask(null);
        } catch (err) {
            console.log(err);
        }
        finally{
            setLoading(false);
        }
    }

    const handleUpdateBoardData=async(dClone)=>{
        setLoading(true);
        await updateBoardData(boardId,dClone);
        setTabs(dClone);
        updateLastUpdated();
        setToastr('Board Updated');
    }

    const handleRemoveTask=useCallback(async(tab,taskId)=>{
        const dClone=structuredClone(tabs);
        const taskIdx=dClone[tab].findIndex(t=>t.id===taskId);
        dClone[tab].splice(taskIdx,1);
        try {
            await handleUpdateBoardData(dClone);
        } catch (err) {
            console.log(err);
        }
        finally{
            setLoading(false);
        }
    },[tabs])

    const handleAddTask=async(text)=>{
        if(!text.trim()){
            setToastr("Task cannot be empty!");
            return;
        }
        const dClone=structuredClone(tabs);
        dClone[addTaskTo].unshift({text,id:crypto.randomUUID()});
        try {
            await handleUpdateBoardData(dClone);
            setAddTaskTo("");
        } catch (err) {
            console.log(err);
        }
        finally{
            setLoading(false);
        }
    }   

    const handleDnd=async({destination,source})=>{
        if(!destination) return;
        if(destination.droppableId===source.droppableId && source.index===destination.index) return;
        const dClone=structuredClone(tabs);
        //remove the element from tab 1
        const [draggedTask]=dClone[source.droppableId].splice(source.index,1);
        //add it to tab 2
        dClone[destination.droppableId].splice(destination.index,0,draggedTask);

        try {
            await handleUpdateBoardData(dClone);
        } catch (err) {
            console.log(err);
        }
        finally{
            setLoading(false);
        }
    }
    if(loading) return <AppLoader/>
  return (
    <>
    {!!shiftTask && <ShiftTaskModal onClose={()=>setShiftTask(null)} shiftTask={handleShiftTask} task={shiftTask}/>}
    {!!addTaskTo && <AddTaskModal loading={loading} addTask={handleAddTask} tabName={statusMap[addTaskTo]} onClose={()=>setAddTaskTo("")}/>}
      <DragDropContext onDragEnd={handleDnd}>
        <Grid container px={2} mt={5} spacing={2}>
            {Object.keys(statusMap).map(status=><BoardTab openShiftTaskModal={handleOpenShiftTaskModal} removeTask={handleRemoveTask} status={status} key={status} tasks={tabs[status]} name={statusMap[status]} openAddTaskModal={handleOpenAddTaskModal}/>)}
        </Grid>
      </DragDropContext>
    </>
  )
}

export default BoardInterface
