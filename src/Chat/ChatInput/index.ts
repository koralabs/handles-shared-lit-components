import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { ChatInputStyles } from './styles';

@customElement('chat-input')
export class ChatInput extends LitElement {

    static styles = ChatInputStyles

    @property({ type: String }) handle = 'grim-reaper'
    @property({ type: String }) chatText: string | ''
    @property({ type: String }) imageUrl = 'grim-reaper'
    @property({ type: String }) inputValue = ''
    @property({ type: String }) activeHandle: string | 'No handle'
    @property({ type: Boolean }) isMe = true

    firstUpdated() {
        const textarea = this.shadowRoot.querySelector("#autoresizing");
        textarea.addEventListener('input', autoResize, false);

        function autoResize() {
            this.style.height = '25px';
            this.style.height = this.scrollHeight + 'px';
        }
    }
    handleInput(event: { target: { value: string; }; }) {
        const inputValue = event.target?.value?.trim();
        this.chatText = inputValue
        this.dispatchEvent(new CustomEvent('chat-change', {
            detail: { inputValue },
            bubbles: true,
            composed: true
        }));
        this.requestUpdate();
    }

    sendChat() {
        this.activeHandle = localStorage.getItem('activeHandle')
        const handle = JSON.parse(this.activeHandle)
        const message = this.chatText
        this.dispatchEvent(new CustomEvent('chat-sent', {
            detail: { message, handle },
            bubbles: true,
            composed: true
        }));
        this.inputValue = ''
        this.chatText = ''
        this.requestUpdate();
    }

    render() {
        return html`
            <div class="chat-container" >
                <textarea 
                    id="autoresizing" 
                    class="chat-input"
                    .value="${this.chatText || ''}"
                    @input="${this.handleInput}">
                </textarea>
                <div class="svg-wrapper" @click=${this.sendChat}>
                    <svg class="send-svg" xmlns = "http://www.w3.org/2000/svg" viewBox = "0 0 512 512" >
                        <path d="M249.9 33.5v26.1C236.3 80.2 226 168.1 225.4 274.9c11.7-15.6 19.1-33.3 19.1-48.2v-16.9c0-5.3 .8-10.5 2.2-15.7 .7-2.1 1.4-4.1 2.6-5.8 1.2-1.8 3.4-3.8 6.7-3.8 3.2 0 5.5 2.1 6.7 3.8 1.2 1.8 2 3.7 2.6 5.8 1.4 5.1 2.2 10.3 2.2 15.7v16.9c0 14.9 7.4 32.6 19.1 48.2-.6-106.8-10.9-194.7-24.5-215.4V33.5h-12.3zm-26.3 147.8c-9.5 2.2-18.7 5.2-27.5 9.1 8.9 16.1 9.8 32.6 1.7 37.3-8 4.6-21.9-4.2-31.4-19.8-11.6 8.8-21.9 19.3-30.6 31.1 14.7 9.6 22.9 22.9 18.3 30.7-4.5 7.7-20 7.1-35.5-1-5.8 13.3-9.8 27.5-11.7 42.4 9.7 .2 18.7 2.4 26.2 6 17.8-.3 32.8-2 40.5-4.2 5.6-26.4 23-48.2 46.3-59.5 .7-25.6 1.9-49.7 3.5-72.1zm65 0c1.6 22.4 2.8 46.5 3.5 72.1 23.3 11.3 40.8 33.2 46.3 59.5 7.7 2.3 22.7 3.9 40.5 4.2 7.5-3.7 16.5-5.9 26.2-6-1.9-14.9-5.9-29.2-11.7-42.4-15.4 8.1-30.9 8.7-35.5 1-4.6-7.7 3.6-21.1 18.3-30.7-8.7-11.8-19-22.3-30.6-31.1-9.5 15.6-23.4 24.4-31.4 19.8-8.1-4.7-7.2-21.2 1.7-37.3a147.5 147.5 0 0 0 -27.5-9.1zm-32.5 8.6c-3.2 0-5.9 8.8-6.1 19.9h-.1v16.9c0 41.4-49 95-93.5 95-52 0-122.8-1.5-156.4 29.2v2.5c9.4 17.1 20.6 33.2 33.2 48C45.7 380.3 84.8 360.4 141.2 360c45.7 1 79 20.3 90.8 40.9 0 0 0 0 0 .1 7.7 2.1 15.9 3.2 24 3.2 8.2 0 16.4-1.1 24-3.2 0 0 0 0 0-.1 11.7-20.5 45.1-39.9 90.8-40.9 56.4 .4 95.5 20.3 108 41.4 12.6-14.8 23.8-30.9 33.2-48v-2.5c-33.6-30.6-104.4-29.2-156.4-29.2-44.5 0-93.5-53.6-93.5-95v-16.9h-.1c-.2-11.1-2.9-19.9-6.1-19.9zm0 96.6c22.4 0 40.6 18.2 40.6 40.6s-18.2 40.7-40.6 40.7-40.6-18.2-40.6-40.7c0-22.4 18.2-40.6 40.6-40.6zm0 7.6c-18.2 0-33 14.8-33 33S237.8 360 256 360s33-14.8 33-33-14.8-33-33-33zm0 6.1c14.8 0 26.8 12 26.8 26.8s-12 26.8-26.8 26.8-26.8-12-26.8-26.8 12-26.8 26.8-26.8zm-114.8 66.7c-10.2 .1-21.6 .4-30.5 1.7 .4 4.4 1.5 18.6 7.1 29.8 9.1-2.6 18.4-3.9 27.6-3.9 41.3 .9 71.5 34.4 78.3 74.5l.1 4.7c10.4 1.9 21.2 2.9 32.2 2.9 11 0 21.8-1 32.2-2.9l.1-4.7c6.8-40.1 37-73.5 78.3-74.5 9.3 0 18.5 1.3 27.6 3.9 5.6-11.1 6.7-25.3 7.1-29.8-8.9-1.3-20.3-1.6-30.5-1.7-18.8 .4-35.2 4.2-48.6 9.7-12.5 16-29.2 30-49.6 33.1-.1 0-.2 0-.3 .1-.1 0-.1 0-.2 .1-5.2 1.1-10.6 1.6-16.2 1.6-5.6 0-11-.5-16.2-1.6-.1 0-.1 0-.2-.1-.1 0-.2 0-.3-.1-20.4-3-37-17-49.6-33.1-13.4-5.5-29.9-9.3-48.6-9.7z" />
                    </svg>
                </div>
            </div>
        `;
    }
}










