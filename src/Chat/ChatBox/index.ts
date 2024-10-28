import { LitElement, html, css, CSSResultGroup, PropertyValues } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { ChatBoxStyles } from './styles';
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";
import { doc, getDoc, getDocs, Query } from 'firebase/firestore';
import { imageUrl } from '../../helpers/handles.js';

@customElement('chat-box')
export class ChatBox extends LitElement {
    auth = firebase.auth();
    firestore = firebase.firestore();
    static styles = ChatBoxStyles

    @property({ type: Array }) messages: any
    @property({ type: Array }) messagesActiveHandle: any
    @property({ type: Array }) messagesReceiverHandle: any
    @property({ type: Object }) activeHandle: any
    @property({ type: Object }) receiverHandle: any
    @property({ type: Boolean }) sent = false
    @property({ type: Object }) authorizedChat: any

    async firstUpdated() {
        await this.ChatRoom()
    }

    async getCollectionData(query: firebase.firestore.Query<firebase.firestore.DocumentData>, idField = "id") {
        const snapshot = await getDocs(query);
        return snapshot.docs.map(doc => ({
            ...doc.data(),
            [idField]: doc.id,
            lastKey: doc.data().createdAt

        }));
    }

    async ChatRoom() {

        this.activeHandle = JSON.parse(localStorage.getItem('activeHandle') || '')
        this.receiverHandle = JSON.parse(localStorage.getItem('receiverHandle') || '')
        const docRef = doc(this.firestore, "HandleChats", this.activeHandle.name + this.activeHandle.hex + this.receiverHandle.name + this.receiverHandle.hex);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            this.authorizedChat = docSnap.data()

        } else {
            const docRef = doc(this.firestore, "HandleChats", this.receiverHandle.name + this.receiverHandle.hex + this.activeHandle.name + this.activeHandle.hex);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                this.authorizedChat = docSnap.data()
            }
            else {
                this.authorizedChat = false
            }
        }
        if (this.authorizedChat !== false) {
            const messagesRef = this.firestore.collection(this.authorizedChat.HandleChatId);
            const queryMessages = messagesRef.orderBy("createdAt", 'desc').limit(10);
            this.messagesActiveHandle = await this.getCollectionData(queryMessages);
            this.messages = this.messagesActiveHandle.sort((a, b) => (a.createdAt < b.createdAt) ? 1 : ((b.createdAt < a.createdAt) ? -1 : 0))

            return this.messages.reverse()
        } else {
            console.error('not an authorized chat', this.authorizedChat)
        }

    }

    async infiniteScrollOld() {
        try {
            const num = this.messagesActiveHandle.length
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

    async onScroll(event: Event) {
        const mainSection = event.currentTarget as HTMLElement;
        const scrollPosition = mainSection.scrollTop + mainSection.clientHeight;
        const scrollHeight = mainSection.scrollHeight;
        if (scrollPosition >= scrollHeight - 1) {
            await this.infiniteScrollOld()
        }

    }

    render() {
        if (this.sent) {
            this.ChatRoom()
            this.sent = false
            this.requestUpdate()
            this.dispatchEvent(new CustomEvent('message-received', {
                detail: {},
                bubbles: true,
                composed: true
            }));
        }

        return html`
            <div class="chat-body" id="scrollableDiv" @scroll="${this.onScroll}" >
                <div class="chats-wrapper">
                    ${this.messages ? this.messages.reverse().map(msg => html`
                        <div class="chat-box-wrapper ${msg.uid === this.activeHandle.hex ? 'me' : ''}" >
                            <div>
                                <img class="user-icon" src="${imageUrl(msg.photoURL)}" />
                            </div>
                            <div class="chat-text-wrapper">
                                <div class="chat-text">${msg.text}</div>  
                            </div>
                        </div>`)
                : html``}
                </div>
            </div>
        `;
    }
}