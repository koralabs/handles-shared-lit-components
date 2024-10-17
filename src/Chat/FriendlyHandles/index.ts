import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { FriendlyHandlesStyles } from './styles';
import { handleData, WalletHandle } from '../../../helpers';

@customElement('friendly-handles')
export class FriendlyHandles extends LitElement {

    static styles = FriendlyHandlesStyles
    @property({ type: String }) inputValue: string | undefined;
    @property({ type: Boolean }) searching: boolean = false;
    searchWalletHandles: any
    searchHandleData: any
    activeHandle
    loadingImg
    imageUrl


    firstUpdated() {
        this.activeHandle = localStorage.getItem('activeHandle')
    }

    onSelectHandle(handle) {
        console.log(handle)
    }

    onScroll() { }

    render() {
        this.searchHandleData = handleData
        const list = this.searchHandleData || [];
        const inputValue = this.inputValue
        if (inputValue.startsWith('$')) {
            this.inputValue = inputValue.toLowerCase();
            const matchedItems = list.filter(item =>
                item.name.toLowerCase().startsWith((this.inputValue ?? '').replace(/^\$/, ''))
            );
            matchedItems.forEach(item => { });
            this.searchWalletHandles = matchedItems as WalletHandle[];
            this.requestUpdate()
        } else {
            this.inputValue = inputValue.toLowerCase();
            const matchedItems = list.filter(item =>
                item.name.toLowerCase().includes(this.inputValue || '')
            );
            matchedItems.forEach(item => { });
            this.searchWalletHandles = matchedItems as WalletHandle[];
        }
        this.requestUpdate()
        return html`
            <div class="searched-handles">
                <div class="handles-select-dropdown">
                            <div class="wallet-handles-content">
                                <div class="scroll-wrapper-outer" @scroll="${this.onScroll}">
                                    <div class="scroll-wrapper">
                                        <div class="handles-container">
                                            ${(this.searchWalletHandles ?? []).map(
            handle => html`
                                                    <li
                                                        @click="${() =>
                    this.onSelectHandle({
                        ...handle
                    })}"
                                                        class="active-handle ${this.activeHandle?.name === handle.name
                    ? 'active'
                    : ''}"
                                                    >
                                                        ${this.activeHandle?.name === handle.name && this.loadingImg
                    ? html``
                    : this.activeHandle?.name === handle.name
                        ? html`
                                                                <div class="handle-img">
                                                                    <img src="${this.imageUrl}" />
                                                                </div>
                                                            `
                        : ''}
                                                        <div>
                                                            <p class="handle-wrapper">
                                                                <span class="handle-sign">
                                                                    <span class="dollar-sign">$</span>
                                                                </span>
                                                                <span class="handle-text">${handle.name}</span>
                                                            </p>
                                                        </div>
                                                    </li>
                                                `
        )}
                                            ${this.loadingImg ? html`<slot name="slottedLoader"></slot>` : ''}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
            </div>
        `
    }
}