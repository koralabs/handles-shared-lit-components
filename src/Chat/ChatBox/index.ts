import { LitElement, html, css, CSSResultGroup } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { ChatBoxStyles } from './styles';

@customElement('chat-box')
export class ChatBox extends LitElement {

    static styles = ChatBoxStyles

    @property({ type: String }) chatText: string | ''
    @property({ type: String }) imageUrl: string
    @property({ type: Boolean }) isMe = false



    render() {
        return html`
            <div class="chat-box-wrapper ${this.isMe ? 'me' : ''}" style="display: ${this.chatText === '' || this.chatText === undefined ? 'none' : 'flex'}">
                <div>
                    <img class="user-icon" src="${this.imageUrl}"/>
                </div>
                <div class="chat-text-wrapper">
                    <div class="chat-text">${this.chatText}</div>
                </div>
            </div>
        `;
    }
}