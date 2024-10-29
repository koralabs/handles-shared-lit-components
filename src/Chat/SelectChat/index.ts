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
    @property({ type: Object }) chatHandleObject: any;
    @property({ type: Object }) chatHandle: any;
    @property({ type: String }) inputValue = ''
    @property({ type: Boolean }) searching = false
    @property({ type: Boolean }) startSearch = false
    @property({ type: Boolean }) open = false
    @property({ type: Boolean }) isOpen = false


    handleReceiver = (event: CustomEvent<{ handle: any, open: boolean }>) => {
        this.receiverHandleObject = event.detail.handle
        this.receiverHandle = event.detail.handle.name
        this.open = true
        this.requestUpdate()

    }

    prevChatHandle = (event: CustomEvent<{ handle: any, open: boolean }>) => {
        const handle = event.detail.handle
        this.dispatchEvent(new CustomEvent('open-new-chat-window', {
            detail: { handle },
            bubbles: true,
            composed: true
        }));
        this.requestUpdate()
    }

    handleInputChange = (event: CustomEvent<{ inputValue: string, searching: boolean }>) => {
        this.inputValue = event.detail.inputValue;
        this.searching = event.detail.searching
        this.requestUpdate()
    }

    searchToChat() {
        this.startSearch = true
        this.searching = true

    }
    cancelSearch() {
        this.startSearch = false
        this.searching = false
    }

    renderSearch() {

        return html`
        ${this.startSearch ? html`
                <div class="cancel-search" @click="${this.cancelSearch}">
                    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" >
                        <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                    </svg>
                    <span class="tooltip-text">Cancel Search</span>
                </div>
           ` : html` 
                <div class="search-icon" @click="${this.searchToChat}">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" >
                        <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"/>
                    </svg>
                    <span class="tooltip-text">Click to Search</span>
                </div>
            `}
        `
    }

    render() {
        return html`
            <div class="chat-window ${this.isOpen ? 'open' : 'closed'}">
                <div class="chat-header">
                    ${this.startSearch ?
                html`<chat-search  @input-change="${this.handleInputChange}"></chat-search>
                        ` : html`
                            <div class="select-chat-header"> 
                                <div class="header-text">Current Handle chats </div>
                            </div>
                        `
            }                                
                ${this.renderSearch()}

                </div>
                <div class="select-chat-wrapper">
                    ${this.searching ? html`
                        <friendly-handles
                            @receiver-handle="${this.handleReceiver}" 
                            .inputValue="${this.inputValue}">  
                        </friendly-handles>` :
                html`
                        <current-chats 
                            @chat-handle="${this.prevChatHandle}">
                        </current-chats>
                    `}
                </div>
                <div class="chat-input-wrapper">
                </div>
            </div>
        `;
    }
}
