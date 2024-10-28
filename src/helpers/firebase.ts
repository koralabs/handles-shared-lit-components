import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";
import { collection, doc, getDoc, getDocs, Query, setDoc } from 'firebase/firestore';
firebase.initializeApp({
    apiKey: "AIzaSyD1rI1ppXMfZqrKWiS76nLPh2s_TH8umLM",
    authDomain: "handlechat-53252.firebaseapp.com",
    projectId: "handlechat-53252",
    storageBucket: "handlechat-53252.appspot.com",
    messagingSenderId: "626034429209",
    appId: "1:626034429209:web:225ae42c434c50f087c988",
    measurementId: "G-50J3SEZHBD",
});
export const auth = firebase.auth();
export const firestore = firebase.firestore();
export const activeHandle = JSON.parse(localStorage.getItem('activeHandle') || '')
export const receiverHandle = JSON.parse(localStorage.getItem('receiverHandle') || '')
export async function getCollectionData(query: firebase.firestore.Query<firebase.firestore.DocumentData>, idField = "id") {
    const snapshot = await getDocs(query);
    return snapshot.docs.map(doc => ({
        ...doc.data(),
        [idField]: doc.id,
        lastKey: doc.data().createdAt

    }));
}


export async function authorizeRequest() {
    let authorizedChat = false
    const docRef = doc(firestore, "HandleChats", activeHandle.name + activeHandle.hex + receiverHandle.name + receiverHandle.hex);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        authorizedChat = true

    } else {

        const docRef = doc(firestore, "HandleChats", receiverHandle.name + receiverHandle.hex + activeHandle.name + activeHandle.hex);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            authorizedChat = true
        }
        else {
            authorizedChat = false
        }
    }
    if (authorizedChat === false) {
        const generateRandomId = (length = 25): string => {
            const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            return Array.from({ length }, () => characters.charAt(Math.floor(Math.random() * characters.length))).join('');
        }
        const HandleChatRef = collection(firestore, "HandleChats");
        await setDoc(doc(HandleChatRef, activeHandle.name + activeHandle.hex + receiverHandle.name + receiverHandle.hex), {
            HandleChatId: generateRandomId()
        })
    }
}
export async function ChatRoom() {

    const docRef = doc(firestore, "HandleChats", activeHandle.name + activeHandle.hex + receiverHandle.name + receiverHandle.hex);
    const docSnap = await getDoc(docRef);
    let authorizedChat = null
    if (docSnap.exists()) {
        authorizedChat = docSnap.data()

    } else {
        const docRef = doc(firestore, "HandleChats", receiverHandle.name + receiverHandle.hex + activeHandle.name + activeHandle.hex);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            authorizedChat = docSnap.data()
        }
        else {
            authorizedChat = false
        }
    }
    if (authorizedChat !== false) {
        const messagesRef = firestore.collection(authorizedChat.HandleChatId);
        const queryMessages = messagesRef.orderBy("createdAt", 'desc').limit(10);
        const messagesActiveHandle = await getCollectionData(queryMessages);
        const messages = messagesActiveHandle.sort((a, b) => (a.createdAt < b.createdAt) ? 1 : ((b.createdAt < a.createdAt) ? -1 : 0))

        return messages.reverse()
    } else {
        console.error('not an authorized chat', authorizedChat)
    }

}

export async function infiniteScrollOld(prevMsg) {
    try {
        const num = ChatRoom.length
        const messagesRefActiveHandle = this.firestore.collection(this.authorizedChat.HandleChatId);
        const last_index_value_active = this.messagesActiveHandle.reverse()[this.messagesActiveHandle.length - num].createdAt;
        const queryPrevActiveHandle = messagesRefActiveHandle.orderBy("createdAt", 'desc').startAfter(last_index_value_active).limit(5);
        const PrevActiveHandleMsg = await this.getCollectionData(queryPrevActiveHandle)
        this.messagesActiveHandle = this.messagesActiveHandle.concat(PrevActiveHandleMsg)

        this.messages = this.messagesActiveHandle.sort((a, b) => (a.createdAt > b.createdAt) ? 1 : ((b.createdAt > a.createdAt) ? -1 : 0))
        return this.messages

    } catch {
        console.error(Error)
    }
}
