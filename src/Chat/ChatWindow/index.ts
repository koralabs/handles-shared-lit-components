import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { ChatWindowStyles } from './styles';
import '../ChatBox/index.js'
import '../ChatInput/index.js'
import '../ChatSearch/index.js'
import '../FriendlyHandles/index.js'
@customElement('chat-window')
export class ChatWindow extends LitElement {
    static styles = ChatWindowStyles

    @property({ type: String }) handle = 'grim-reaper'
    @property({ type: String }) chatText: string | ''
    @property({ type: String }) chats: any
    @property({ type: Array }) allChats: any[]
    @property({ type: Array }) dumb: any[]
    @property({ type: String }) imageUrl = 'grim-reaper'
    @property({ type: String }) inputValue: string | ''
    @property({ type: Boolean }) isOpen = true
    @property({ type: Boolean }) isMe = true
    @property({ type: Boolean }) searching = false
    @property({ type: Boolean }) startSearch = false
    searchComponent: any;

    firsUpdated() {

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

    handleInputChange = (event: CustomEvent<{ inputValue: string, searching: boolean }>) => {
        this.inputValue = event.detail.inputValue;
        this.searching = event.detail.searching
        if (!this.inputValue) {
            this.searching = false
        }
        this.requestUpdate()
    };

    search() {
        this.startSearch = true
        this.searching = true
    }

    endSearch() {

        this.startSearch = false
        this.searching = false
    }

    messageReceived(event: CustomEvent<{ message: string, handle: object }>) {
        console.log(' fired')
        this.chats = localStorage.getItem('chat') || 'dumb'

        this.chats = JSON.parse(localStorage.getItem('allchats'))
        this.chatText = event.detail.message
        this.allChats = [this.chats, this.chatText]

        localStorage.setItem('allchats', JSON.stringify(this.allChats))


        localStorage.setItem('chat', event.detail.message)
        this.requestUpdate

    }

    headerAction() {
        return html`
            ${this.startSearch ?
                html`
                <svg class="search-svg" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" @click="${this.endSearch}" >
                    <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path>
                </svg>
            `
                : html`
                    <svg class="search-svg" viewBox = "0 0 24 24" xmlns = "http://www.w3.org/2000/svg" @click="${this.search}" >
                        <path d="M10 18a7.952 7.952 0 0 0 4.897-1.688l4.396 4.396 1.414-1.414-4.396-4.396A7.952 7.952 0 0 0 18 10c0-4.411-3.589-8-8-8s-8 3.589-8 8 3.589 8 8 8zm0-14c3.309 0 6 2.691 6 6s-2.691 6-6 6-6-2.691-6-6 2.691-6 6-6z" />
                    </svg>`
            }
        `
    }
    render() {
        const chats = this.allChats || JSON.parse(localStorage.getItem('allchats'))
        return html`
            <div class="chat-window ${this.isOpen ? 'open' : 'closed'}">
                <div class="chat-header">
                    ${this.headerAction()}
                    ${this.startSearch ?
                html` <chat-search  @input-change="${this.handleInputChange}"></chat-search>`
                : html`<div>i am a handle</div>`}
                   
                    ${this.renderCloseX()}
                </div>
                <div class="chat-body">
                    <div class="chats-wrapper">
                        ${this.searching ? html`<friendly-handles .inputValue="${this.inputValue}"></friendly-handles>`
                : html`
                ${(chats ?? []).toString().split(',').map(chat => html`
                    <chat-box .isMe=${this.isMe} .chatText=${chat} .imageUrl=${this.imageUrl}></chat-box>`
                )}
                      
                    `}</div>
                </div>
                <div class="chat-input-wrapper">
                  <chat-input @chat-sent=${this.messageReceived}> </chat-input>
                </div>
            </div>
      `
    }
}
