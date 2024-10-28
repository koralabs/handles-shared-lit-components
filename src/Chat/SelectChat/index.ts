import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { SelectChatStyles } from './styles';
import '../FriendlyHandles/index.js'
import '../ChatSearch/index.js'
import '../CurrentChat/index.js'
@customElement('select-chat')
export class SelectChat extends LitElement {

    static styles = SelectChatStyles
    @property({ type: Object }) receiverHandleObject: any;
    @property({ type: Object }) receiverHandle: any;
    @property({ type: String }) inputValue = ''
    @property({ type: Boolean }) searching = false
    @property({ type: Boolean }) open = false
    @property({ type: Boolean }) isOpen = false


    handleReceiver = (event: CustomEvent<{ handle: any, open: boolean }>) => {
        this.receiverHandleObject = event.detail.handle
        this.receiverHandle = event.detail.handle.name
        this.open = true
        this.requestUpdate()

    }

    handleInputChange = (event: CustomEvent<{ inputValue: string, searching: boolean }>) => {
        this.inputValue = event.detail.inputValue;
        this.searching = event.detail.searching
        if (!this.inputValue) {
            this.searching = false
        }
        this.requestUpdate()
    }

    render() {
        return html`
            <div class="chat-window ${this.isOpen ? 'open' : 'closed'}">
                <div class="chat-header">
                    <chat-search  @input-change="${this.handleInputChange}"></chat-search>
                </div>
                <div>
                    ${this.searching ? html`
                        <friendly-handles
                            @receiver-handle="${this.handleReceiver}" 
                            .inputValue="${this.inputValue}">  
                        </friendly-handles>` :
                html`
                        <current-chats></current-chats>
                    `}
                </div>
                <div class="chat-input-wrapper">
                </div>
            </div>
        `;
    }
}
