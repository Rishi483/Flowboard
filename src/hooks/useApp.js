import {collection,deleteDoc,updateDoc,addDoc,getDocs,serverTimestamp,query,orderBy,doc,getDoc} from "firebase/firestore"
import {db} from "../firebase"
import {getAuth} from "firebase/auth"
import useStore from "../store";
import { useNavigate } from "react-router-dom";

const useApp = () => {
    const {currentUser:{uid}}=getAuth();
    const boardsColRef=collection(db,`users/${uid}/boards`);
    const {setBoards,boards,addBoard,setToastr}=useStore();
    const navigate=useNavigate();

    const deleteBoard=async(boardId)=>{
        try {
            const docRef=doc(db,`users/${uid}/boards/${boardId}`);
            await deleteDoc(docRef);
            const tBoards=boards.filter(board=>board.id!==boardId);
            setBoards(tBoards);
            navigate('/boards');
        } catch (err) {
            setToastr('Error deleting the board');
            throw err;
        }
    }

    const updateBoardData=async(boardId,tabs)=>{
        const docRef=doc(db,`users/${uid}/boardsData/${boardId}`);
        try {
            await updateDoc(docRef,{tabs,lastUpdated:new Date().toLocaleString('en-US')});
        } catch (err) {
            setToastr('Error updating board');
            throw err;
        }
    }

    const fetchBoard=async(boardId)=>{
        const docRef=doc(db,`users/${uid}/boardsData/${boardId}`);
        try {
            const doc = await getDoc(docRef);
            if(doc.exists){
                return doc.data(); 
            }
            else return null;
        } catch (err) {
            setToastr("Error fetching board");
            throw err;
        }
    }

    const createBoard=async({name,color})=>{
        try {
            const doc=await addDoc(boardsColRef,{
                name,
                color,
                createdAt:new Date().toLocaleString('en-US'),
            });
            addBoard({color,name,createdAt:new Date().toLocaleString('en-US'),id:doc.id});
        } catch (err) {
            setToastr("Error creating board");
            throw err;
        }
    };
    
    const fetchBoards=async(setLoading)=>{
        try {
            const q=query(boardsColRef,orderBy("createdAt","desc"))
            const querySnapShot=await getDocs(q);
            const boards=querySnapShot.docs.map(doc=>({...doc.data(),id:doc.id}));
            setBoards(boards);
              
        } catch (err) {
            setToastr("Error fetching boards");
        }
        finally{
            if(setLoading) setLoading(false); 
        }
    }

    const updateBoardName=async(name,boardId)=>{
        const docRef=doc(db,`users/${uid}/boards/${boardId}`);
        try {
            await updateDoc(docRef,{name});
            setToastr('Board name updated successfully');
        } catch (err) {
            setToastr('Error updating board name');
            throw err;
        }
    }
    return {createBoard,deleteBoard,updateBoardData,fetchBoards,fetchBoard,updateBoardName};
}

export default useApp
