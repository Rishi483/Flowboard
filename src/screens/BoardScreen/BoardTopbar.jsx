import { AppBar,Toolbar,Stack,Typography,IconButton, TextField } from "@mui/material";
import BackIcon from "@mui/icons-material/ArrowBack"
import DeleteIcon from "@mui/icons-material/Delete"
import { useNavigate } from "react-router-dom";
import {colors} from "../../theme"
import { memo, useState } from "react";
import useApp from "../../hooks/useApp";

const BoardTopbar = ({id,deleteBoard,name,color,lastUpdated}) => {
  const navigate=useNavigate();
  const [isEdit,setIsEdit]=useState(false);
  const [inpName,setInpName]=useState(name);
  const {updateBoardName,fetchBoards}=useApp();
  const [loading,setLoading]=useState(false);

  return (
    <AppBar sx={{
        borderBottom:'5px solid',
        borderColor:`${colors[color]}`,
        position:"static"
    }}>
      <Toolbar sx={{justifyContent:"space-between"}}>
         <Stack spacing={1} alignItems="center" direction="row">
            <IconButton onClick={()=>navigate('/boards')} ><BackIcon/></IconButton>
            {isEdit==false ? <Typography onClick={()=>setIsEdit(true)} variant="h6">{inpName}</Typography>:<TextField value={inpName} onKeyDown={(e)=>{
              if(e.code=="Enter"){
                if(inpName!=""){
                  updateBoardName(inpName,id);
                  fetchBoards(setLoading);
                }
                else setInpName(name);
                setIsEdit(false);
              }
            }}  onChange={(e)=>setInpName(e.target.value)}/>}
         </Stack>
         <Stack spacing={2} alignItems="center" direction="row">
            <Typography display={{
              xs:"none",
              sm:"block"
            }} variant="body2">Last Updated: {lastUpdated}</Typography>
            <IconButton onClick={deleteBoard}><DeleteIcon/></IconButton>
         </Stack>
      </Toolbar>
    </AppBar>
  )
}

export default memo(BoardTopbar)
