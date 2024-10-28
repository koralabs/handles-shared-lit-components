import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { ChatWindowStyles } from './styles';
import '../ChatInput/index.js'
import '../ChatBox/index.js'
import '../ChatSearch/index.js'
import '../FriendlyHandles/index.js'
import '../ChatAuth/index.js'
import '../ChatProfile/index.js'
import { collection, doc, getDoc, getDocs, Query, setDoc } from 'firebase/firestore';
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";
@customElement('chat-window')
export class ChatWindow extends LitElement {
    auth = firebase.auth();
    firestore = firebase.firestore();

    static styles = ChatWindowStyles

    @property({ type: String }) activeHandle: any
    @property({ type: String }) chatText: string = ''
    @property({ type: Boolean }) isOpen = true
    @property({ type: Boolean }) isMe = true
    @property({ type: Boolean }) authorized = true
    @property({ type: Boolean }) open = false
    @property({ type: Boolean }) sent = false
    @property({ type: Boolean }) cancel = false
    @property({ type: Boolean }) startSearch = false
    @property({ type: Boolean }) authorizedChat = false
    @property({ type: Object }) receiverHandle: any;
    @property({ type: Object }) receiverHandleObject: any;

    firstUpdated() {
        this.receiverHandle = JSON.parse(localStorage.getItem('receiverHandle') || '')
    }

    closeWindow() {
        this.isOpen = !this.isOpen
    }

    renderCloseX() {
        return html`
            <svg class="close-svg" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" @click="${this.closeWindow}">
                <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
            </svg>
        `;
    }



    cancelRequest() {
        if (this.activeHandle !== this.receiverHandle) {
            this.cancel = true
        }
    }
    async getCollectionData(query: firebase.firestore.Query<firebase.firestore.DocumentData>, idField = "id") {
        const snapshot = await getDocs(query);
        return snapshot.docs.map(doc => ({
            ...doc.data(),
            [idField]: doc.id,
            lastKey: doc.data().createdAt

        }));
    }

    async authorizeRequest() {
        this.activeHandle = JSON.parse(localStorage.getItem('activeHandle') || '')

        const docRef = doc(this.firestore, "HandleChats", this.activeHandle.name + this.activeHandle.hex + this.receiverHandleObject.name + this.receiverHandleObject.hex);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            this.authorizedChat = true

        } else {
            const docRef = doc(this.firestore, "HandleChats", this.receiverHandleObject.name + this.receiverHandleObject.hex + this.activeHandle.name + this.activeHandle.hex);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                this.authorizedChat = true
            }
            else {
                this.authorizedChat = false
            }
        }
        if (this.authorizedChat === false) {
            const generateRandomId = (length = 25): string => {
                const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
                return Array.from({ length }, () => characters.charAt(Math.floor(Math.random() * characters.length))).join('');
            }
            this.activeHandle = JSON.parse(localStorage.getItem('activeHandle') || '')
            const HandleChatRef = collection(this.firestore, "HandleChats");
            await setDoc(doc(HandleChatRef, this.activeHandle.name + this.activeHandle.hex + this.receiverHandleObject.name + this.receiverHandleObject.hex), {
                HandleChatId: generateRandomId()
            })
        }
        localStorage.setItem('receiverHandle', JSON.stringify(this.receiverHandleObject))
        this.authorized = true
    }

    messageReceived() {
        this.sent = true
        this.requestUpdate()
        this.firstUpdated()
    }

    receiverHandler() {
        this.sent = false
        this.requestUpdate()
    }



    render() {
        this.receiverHandle = JSON.parse(localStorage.getItem('receiverHandle') || '')

        return html`
            <div class="chat-window ${this.isOpen ? 'open' : 'closed'}">
                <div class="chat-header">
                <chat-profile style="width: -webkit-fill-available;"></chat-profile>
                </div>
                <div>
                    <chat-box
                        style="display: block; height: 18rem;"
                        @message-received=${this.receiverHandler} 
                        .sent=${this.sent} 
                        .authorized=${this.authorized}>
                    </chat-box>
                </div>
                <div class="chat-input-wrapper">
                  <chat-input @message-sent=${this.messageReceived} > </chat-input>
                </div>
                <chat-auth @cancel-chat-request=${this.cancelRequest} @authorize-chat-request=${this.authorizeRequest} .receiverHandle=${this.receiverHandle} .open=${this.open}></chat-auth>
            </div>
      `
    }
}
