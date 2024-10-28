import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { ChatProfileStyles } from './styles';

@customElement('chat-profile')
export class ChatProfile extends LitElement {

    static styles = ChatProfileStyles

    receiverHandle: any;


    @property({ type: Boolean }) isOnline = false

    renderChatProfile() {
        this.receiverHandle = JSON.parse(localStorage.getItem('receiverHandle') || '')

        if (this.receiverHandle) {
            this.isOnline = true
        }

        return html`
            <div class="chat-profile-wrapper ${this.isOnline ? 'isOnline' : 'isOffline'}">
                <div class="current-handle ${this.isOnline ? 'isOnline' : 'isOffline'}">
                    <div class="handle-wrapper" >
                        <span class="handle-sign" >
                            <span class="dollar-sign ${this.isOnline ? 'isOnline' : 'isOffline'}" > $ </span>
                        </span>
                        <span class="handle-text" > ${this.receiverHandle.name} </span>
                    </div>
                </div>
                <span class="tooltip-text">${this.receiverHandle.name}, is isOffline</span>
            </div>
        `;
    }

    render() {
        return html`
        ${this.renderChatProfile()}`
    }
}











