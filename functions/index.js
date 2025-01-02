const {onDocumentCreated, onDocumentDeleted, onDocumentUpdated} = require("firebase-functions/v2/firestore");
const {initializeApp}=require("firebase-admin/app");
const {getFirestore}=require("firebase-admin/firestore");


initializeApp();

exports.createBoardData=onDocumentCreated('users/{uid}/boards/{boardId}',async event=>{
    const formattedToday = new Date().toLocaleString('en-US');
    const {uid,boardId}=event.params
    const firestore=getFirestore();
    return await firestore.doc(`users/${uid}/boardsData/${boardId}`).set({
        tabs:{
            todos:[],
            inProgress:[],
            completed:[],
        },
        lastUpdated: formattedToday
    })
});

exports.updateBoardData=onDocumentUpdated('users/{uid}/boards/{boardId}',async event=>{
    const newValue=event.data.after.data;
    const name=newValue.name;
    const firestore=getFirestore();
    return await firestore.doc(`users/${uid}/boardsData/${boardId}`).update({name});
})

exports.deleteBoardData=onDocumentDeleted('users/{uid}/boards/{boardId}',async event=>{
    const {uid,boardId}=event.params;
    const firestore=getFirestore();
    return await firestore.doc(`users/${uid}/boardsData/${boardId}`).delete();
})