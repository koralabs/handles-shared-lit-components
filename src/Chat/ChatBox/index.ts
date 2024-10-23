import { LitElement, html, css, CSSResultGroup } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { ChatBoxStyles } from './styles.js';

import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'


@customElement('chat-box')
export class ChatBox extends LitElement {

    static styles = ChatBoxStyles

    @property({ type: String }) chatText: string | ''
    @property({ type: String }) receiverHandleImg: ''
    @property({ type: String }) activeHandleImg: ''
    @property({ type: Boolean }) isMe = false
    @property({ type: Boolean }) authorized = false
    activeHandle
    activeHandleName
    receiverHandleName
    receiverHandle

    @property({ type: String }) chats: any
    @property({ type: String }) message: string | null
    @property({ type: Array }) myChats: any[]
    @property({ type: Array }) mySentChats: any[]
    @property({ type: Array }) sentFriendlyChats: any[]

    firstUpdated() {
        this.receiverHandle = JSON.parse(localStorage.getItem('receiverHandle'))
        this.activeHandle = JSON.parse(localStorage.getItem('activeHandle'))
        this.activeHandleName = this.activeHandle.name
        this.receiverHandleName = this.receiverHandle.name
        this.mySentChats = JSON.parse(localStorage.getItem(this.activeHandleName + 1)) || ['no messages']
        this.sentFriendlyChats = JSON.parse(localStorage.getItem(this.receiverHandleName + 1)) || ['no messages']

    }

    messageReceived() {

        this.mySentChats = JSON.parse(localStorage.getItem(this.activeHandleName + 1)) || ['no messages']
        this.sentFriendlyChats = JSON.parse(localStorage.getItem(this.receiverHandleName + 1)) || ['no messages']

        if (this.message) {
            console.log('firing')
            this.messageReceived
            const currentTime = Date.now();
            this.chats = JSON.parse(localStorage.getItem(this.activeHandleName + 1))

            this.chatText = this.message || 'no message'
            this.myChats = [this.chats, this.chatText, currentTime]
            localStorage.setItem(this.activeHandleName + 1, JSON.stringify(this.myChats))
            localStorage.setItem(this.activeHandleName, this.message)
            this.requestUpdate()
        }
        else { return null }
    }

    render() {
        this.messageReceived()
        this.mySentChats = JSON.parse(localStorage.getItem(this.activeHandleName + 1)) || ['no messages']
        this.sentFriendlyChats = JSON.parse(localStorage.getItem(this.receiverHandleName + 1)) || ['no messages']
        console.log((this.mySentChats).filter(n => n).toString().split(','))
        return html`
            ${(this.mySentChats).filter(n => n).toString().split(',').map(chat => html`
            <div class="chat-box-wrapper me" >
                <div>
                    <img class="user-icon" src="https://public-handles.myfilebase.com/ipfs/zdj7WiW9zC3j5S8i5YR1F9kHyf72iJ5r2AjghzksSCLhzKq1J?img-width=100" />
                </div>
                <div class="chat-text-wrapper">
                    <div class="chat-text">${chat}</div>  
                </div>
            </div>`)}
            ${(this.sentFriendlyChats).filter(n => n).toString().split(',').map(chat => html`
            <div class="chat-box-wrapper" >
                <div>
                    <img class="user-icon" src="https://public-handles.myfilebase.com/ipfs/zb2rhiv8WgRqPrRKYuHic1NsXHmgNKFyojuc81E5qFWFWLaQn?img-width=100"/>
                </div>
                <div class="chat-text-wrapper">
                    <div class="chat-text">${chat}</div>
                </div>
            </div>`)}
        `;
    }
}