import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { ChatSearchStyles } from './styles';
import { handleData, WalletHandle } from '../../../helpers';
import '../FriendlyHandles/index.js'

@customElement('chat-search')
export class ChatSearch extends LitElement {
    @property({ type: String }) inputValue: string | undefined;
    searchWalletHandles: any
    searchHandleData: any
    static styles = ChatSearchStyles

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

    searchHandles(value: string) {
        handleData
        if (value.includes('$')) {
            console.log('searching exact match ')
        } else {

        }
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