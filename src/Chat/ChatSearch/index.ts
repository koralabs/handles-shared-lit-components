import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { ChatSearchStyles } from './styles';

@customElement('chat-search')
export class ChatSearch extends LitElement {

    static styles = ChatSearchStyles

    @property({ type: String }) inputValue: string = ''
    @property({ type: Array }) searchWalletHandles: any
    @property({ type: Array }) searchHandleData: any

    handleInput(event: { target: { value: string; }; }) {
        const inputValue = event.target?.value?.trim();
        const searching = true

        this.dispatchEvent(new CustomEvent('input-change', {
            detail: { inputValue, searching },
            bubbles: true,
            composed: true
        }));
        this.requestUpdate();
    }

    renderSearch() {
        return html`
            <div class="search-field-wrapper">
                <div class="permissions-field">
                    <div class="search-icon-wrapper">
                    <span>To:</span>
                    </div>
                    <input
                        onfocus= "this.placeholder = 'Type $ for exact match'"
                        onblur= "this.placeholder = 'search handles'"
                        class="input-form "
                        placeholder= 'search handles'                    
                        autocomplete="off"
                        .value="${this.inputValue || ''}"
                        @input="${this.handleInput}"
                    />
                </div>
            </div>
        `;
    }

    render() {
        return html`
        ${this.renderSearch()}`
    }
}