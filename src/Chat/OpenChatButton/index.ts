import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { OpenChatButtonStyles } from './styles';
import '../SelectChat/index.js'
import '../ChatWindow/index.js'

@customElement('open-chat')
export class OpenChatButton extends LitElement {

    static styles = OpenChatButtonStyles

    @property({ type: Boolean }) isOpen = true
    @property({ type: Boolean }) chatIsOpen = false
    @property({ type: Object }) handle: any
    @property({ type: Array }) handles: any

    openChat() {
        this.isOpen = !this.isOpen
    }
    closed() {
        this.chatIsOpen = false
    }
    openNewChat = (event: CustomEvent<{ handle: any }>) => {
        this.handle = event.detail.handle
        localStorage.setItem('receiverHandle', JSON.stringify(this.handle))
        this.chatIsOpen = true
        this.requestUpdate()
    }

    renderChatOpenButton() {
        return html`
            <div class="open-chat-button-outer">
                <div class="open-chat-button-inner" @click=${this.openChat}>
                    <div class="svg-wrapper">
                        <svg class="chat-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                            <path d="M512 240c0 114.9-114.6 208-256 208c-37.1 0-72.3-6.4-104.1-17.9c-11.9 8.7-31.3 20.6-54.3 30.6C73.6 471.1 44.7 480 16 480c-6.5 0-12.3-3.9-14.8-9.9c-2.5-6-1.1-12.8 3.4-17.4c0 0 0 0 0 0s0 0 0 0s0 0 0 0c0 0 0 0 0 0l.3-.3c.3-.3 .7-.7 1.3-1.4c1.1-1.2 2.8-3.1 4.9-5.7c4.1-5 9.6-12.4 15.2-21.6c10-16.6 19.5-38.4 21.4-62.9C17.7 326.8 0 285.1 0 240C0 125.1 114.6 32 256 32s256 93.1 256 208z"/>
                        </svg>
                        <svg class="dollar-sign-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
                            <path d="M160 0c17.7 0 32 14.3 32 32l0 35.7c1.6 .2 3.1 .4 4.7 .7c.4 .1 .7 .1 1.1 .2l48 8.8c17.4 3.2 28.9 19.9 25.7 37.2s-19.9 28.9-37.2 25.7l-47.5-8.7c-31.3-4.6-58.9-1.5-78.3 6.2s-27.2 18.3-29 28.1c-2 10.7-.5 16.7 1.2 20.4c1.8 3.9 5.5 8.3 12.8 13.2c16.3 10.7 41.3 17.7 73.7 26.3l2.9 .8c28.6 7.6 63.6 16.8 89.6 33.8c14.2 9.3 27.6 21.9 35.9 39.5c8.5 17.9 10.3 37.9 6.4 59.2c-6.9 38-33.1 63.4-65.6 76.7c-13.7 5.6-28.6 9.2-44.4 11l0 33.4c0 17.7-14.3 32-32 32s-32-14.3-32-32l0-34.9c-.4-.1-.9-.1-1.3-.2l-.2 0s0 0 0 0c-24.4-3.8-64.5-14.3-91.5-26.3c-16.1-7.2-23.4-26.1-16.2-42.2s26.1-23.4 42.2-16.2c20.9 9.3 55.3 18.5 75.2 21.6c31.9 4.7 58.2 2 76-5.3c16.9-6.9 24.6-16.9 26.8-28.9c1.9-10.6 .4-16.7-1.3-20.4c-1.9-4-5.6-8.4-13-13.3c-16.4-10.7-41.5-17.7-74-26.3l-2.8-.7s0 0 0 0C119.4 279.3 84.4 270 58.4 253c-14.2-9.3-27.5-22-35.8-39.6c-8.4-17.9-10.1-37.9-6.1-59.2C23.7 116 52.3 91.2 84.8 78.3c13.3-5.3 27.9-8.9 43.2-11L128 32c0-17.7 14.3-32 32-32z"/>
                        </svg>
                    </div>
                </div>
                <div class="chat-window">
                    <select-chat .isOpen=${this.isOpen} @open-new-chat-window=${this.openNewChat}></select-chat>
                </div>
                <div class="chat-window">
                    <chat-window .isOpen=${this.chatIsOpen} @closed=${this.closed} .handle=${this.handle}></chat-window>
                </div>
            </div>
        `;
    }



    render() {
        return html`
            ${this.renderChatOpenButton()}
        `;
    }
}