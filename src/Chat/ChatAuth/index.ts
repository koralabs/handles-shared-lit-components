import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { ChatAuthStyles } from './styles';
import '../../web-components/Button/index.js'

@customElement('chat-auth')
export class ChatAuth extends LitElement {
    static styles = ChatAuthStyles;

    @property({ type: Boolean }) open = false
    @property({ type: String }) message = ''
    @property({ type: String }) secondMessage = ''
    @property({ type: String }) confirmButtonLabel = ''
    @property({ type: String }) cancelButtonLabel = ''
    @property({ type: Object }) senderHandle: any

    firstUpdated() {
        const requestHandle = JSON.parse(localStorage.getItem('activeHandle') || '')
        this.senderHandle = requestHandle.name
        this.requestUpdate()
    }

    closePopup() {
        this.open = false;
    }

    private handleConfirm() {
        this.dispatchEvent(new CustomEvent('authorize-chat-request', {
            detail: {},
            bubbles: true,
            composed: true
        }));
        this.closePopup();
    }

    private handleCancel() {
        this.dispatchEvent(new CustomEvent('cancel-chat-request', {
            detail: {},
            bubbles: true,
            composed: true
        }));
        this.closePopup();
    }

    render() {
        return html`
            <div class="modal ${this.open ? 'show' : ''}">
                <div class="popup-overlay">
                    <div class="popup-content">
                        <div class="popup-text-wrapper">
                            <div class="popup-text">Chat request from ${this.senderHandle}</div>
                            <div class="popup-text">Authorize ${this.senderHandle} to send chats to this handle</div>
                        </div>
                        <div class="popup-actions">
                            <shared-button-small .buttonColor=${'rgba(157, 159, 177, 1)'} @click=${this.handleCancel} class="lit-button">
                                <div slot="button-text">Deny</div>
                            </shared-button-small>
                            <shared-button-small .buttonColor=${'rgba(13, 221, 96, 1)'} @click=${this.handleConfirm} class="lit-button" >
                                <div slot="button-text">Authorize</div>
                            </shared-button-small>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

}




