import { LitElement, html, css, CSSResultGroup } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { CurrentChatStyles } from './styles';
@customElement('current-chats')
export class SelectChat extends LitElement {

    static styles = CurrentChatStyles

    @property({ type: String }) activeHandle: any
    @property({ type: String }) receiverHandle: any

    async firstUpdated() {
        this.activeHandle = JSON.parse(localStorage.getItem('activeHandle') || '')
        this.receiverHandle = JSON.parse(localStorage.getItem('receiverHandle') || '')

    }

    async render() {
        await this.firstUpdated()
        return html`
            <div class="current-chat-wrapper">
                <div class="current-chats">

                

                </div>
            </div>
        `;
    }
}
