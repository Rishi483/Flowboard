import { Grid, Stack } from "@mui/material"
import { useEffect, useState } from "react"
import BoardCard from "./BoardCard"
import CreateBoardModal from "./CreateBoardModal"
import TopBar from "./TopBar"
import useApp from "../../hooks/useApp"
import AppLoader from "../../components/layout/AppLoader"
import useStore from "../../store"
import NoBoards from "./NoBoards"

const BoardsScreen = () => {
  const [showModal,setShowModal]=useState(false);
  const {fetchBoards}=useApp();
  const [loading,setLoading]=useState(true);
  const {boards,areBoardsFetched}=useStore();

  useEffect(()=>{
    if(!areBoardsFetched) fetchBoards(setLoading);
    else setLoading(false);
  },[])

  if(loading) return <AppLoader/>;
  return (
    <>
      <TopBar openModal={()=>setShowModal(true)} />
      {showModal && <CreateBoardModal closeModal={()=>setShowModal(false)} />}
      {!boards.length ? <NoBoards/> : <Stack px={3} mt={5}>
        <Grid container spacing={{sm:4,xs:2}}>
            {boards.map(board=><BoardCard key={board.id} id={board.id} name={board.name} createdAt={board.createdAt} color={board.color} />)}
        </Grid>
      </Stack>}
    </>
  )
}

export default BoardsScreen
