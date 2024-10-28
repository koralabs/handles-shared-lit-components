import { LitElement, html, css, CSSResultGroup, PropertyValues } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { ChatBoxStyles } from './styles';
import { imageUrl } from '../../helpers/handles';
import { ChatRoom, infiniteScrollOld } from '../../helpers/firebase';
@customElement('chat-box')
export class ChatBox extends LitElement {
    static styles = ChatBoxStyles

    @property({ type: Array }) messages: any
    @property({ type: Array }) messagesActiveHandle: any
    @property({ type: Array }) messagesReceiverHandle: any
    @property({ type: Object }) activeHandle: any
    @property({ type: Object }) receiverHandle: any
    @property({ type: Boolean }) sent = false
    @property({ type: Object }) authorizedChat: any

    async firstUpdated() {
        this.messages = await ChatRoom()

    }

    async onScroll(event: Event) {
        const mainSection = event.currentTarget as HTMLElement;
        const scrollPosition = mainSection.scrollTop + mainSection.clientHeight;
        const scrollHeight = mainSection.scrollHeight;
        if (scrollPosition >= scrollHeight - 1) {
            await infiniteScrollOld(this.messages)
        }

    }

    render() {
        if (this.sent) {
            ChatRoom()
            this.sent = false
            this.requestUpdate()
            this.dispatchEvent(new CustomEvent('message-received', {
                detail: {},
                bubbles: true,
                composed: true
            }));
        }

        this.activeHandle = JSON.parse(localStorage.getItem('activeHandle') || '')
        this.receiverHandle = JSON.parse(localStorage.getItem('receiverHandle') || '')
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