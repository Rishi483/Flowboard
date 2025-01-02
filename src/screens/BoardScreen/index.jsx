import { useNavigate, useParams } from "react-router-dom";
import BoardInterface from "./BoardInterface";
import BoardTopbar from "./BoardTopbar";
import useStore from "../../store";
import { useCallback, useEffect, useMemo, useState } from "react";
import useApp from "../../hooks/useApp";
import AppLoader from "../../components/layout/AppLoader";
import BoardNotReady from "./BoardNotReady";

const BoardScreen = () => {
    const {boards,areBoardsFetched}=useStore();
    const {boardId}=useParams();
    const board=useMemo(()=>boards.find(b=>b.id===boardId),[]);
    const navigate=useNavigate();
    const {fetchBoard,deleteBoard}=useApp();
    const [loading,setLoading]=useState(true);
    const [data,setData]=useState(null);
    const [lastUpdated,setLastUpdated]=useState(null);
    const boardData=useMemo(()=>data,[data]);

    const handleUpdateLastUpdated=useCallback(()=>setLastUpdated(new Date().toLocaleString('en-US')));
    const handleDeleteBoard=async()=>{
        if(!window.confirm('Do you want to delete this board?')) return;
        try {
            setLoading(true);
            await deleteBoard(boardId);
        } catch (err) {
            console.log(err);
            setLoading(false);
        }
    }
    const handleFetchBoard=async()=>{
        try {
            const boardData=await fetchBoard(boardId);
            if(boardData){
                const {lastUpdated,tabs}=boardData;
                setData(tabs);
                setLastUpdated(lastUpdated);
            }
            setLoading(false);
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(()=>{
        if(!areBoardsFetched || !board){
            navigate('/boards')
        }
        else{
            handleFetchBoard();
        }
    },[])
    
  if(!board) return null;
  if(loading) return <AppLoader/>;
  if(!data) return <BoardNotReady/>;
  
  return (
    <>
      <BoardTopbar deleteBoard={handleDeleteBoard} id={board.id} name={board.name} lastUpdated={lastUpdated} color={board.color}/> 
      <BoardInterface updateLastUpdated={handleUpdateLastUpdated} boardData={boardData} boardId={boardId}/>
    </>
  )
}

export default BoardScreen;
