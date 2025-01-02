import { Dialog,Stack,Typography,Box,Button, TextField } from "@mui/material"
import ModalHeader from "../../components/layout/ModalHeader"
import { colors } from "../../theme"
import { useState } from "react"
import useApp from "../../hooks/useApp"
import useStore from "../../store"

const CreateBoardModal = ({closeModal}) => {
  const [name,setName]=useState("");
  const [color,setColor]=useState(0);
  const [loading,setLoading]=useState(false);
  const {createBoard}=useApp();
  const {setToastr}=useStore();

  const handleCreate=async()=>{
    const tname=name.trim();
    if(!tname){
      return setToastr('The Board name cannot be empty');
    }
    if(!/^[a-zA-Z0-9\s]{1,20}$/.test(tname)){
      return setToastr('The board name cannot contain special characters and should not be more than 20 chars');
    }
    try {
      setLoading(true);
      await createBoard({name:tname,color});
      closeModal();
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  }
  return ( 
    <Dialog onClose={closeModal} open fullWidth maxWidth="xs">
        <Stack p={2}>
          <ModalHeader onClose={closeModal} title={"Create Board"} />
          <Stack my={5} spacing={3}>
            <TextField value={name} onChange={(e)=>setName(e.target.value)} label="Board Name"/>
            <Stack spacing={1.5} direction={"row"}>
               <Typography>Color:</Typography>
                  {colors.map((clr,index)=>(<Box sx={{cursor:"pointer",border:color===index?"3px solid #383838":"none",outline:`2px solid ${clr}`}} key={clr} onClick={()=>setColor(index)} borderRadius={"50%"} height={25} width={25} backgroundColor={clr} />))}
            </Stack>
          </Stack>
          <Button disabled={loading} onClick={handleCreate} variant="contained" size="large">Create</Button>
        </Stack>
    </Dialog>
  )
}

export default CreateBoardModal
