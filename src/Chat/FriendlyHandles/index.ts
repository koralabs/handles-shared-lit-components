import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { FriendlyHandlesStyles } from './styles';
@customElement('friendly-handles')
export class FriendlyHandles extends LitElement {

    static styles = FriendlyHandlesStyles

    @property({ type: Boolean }) searching = false
    @property({ type: Boolean }) loadingImg = false
    @property({ type: String }) inputValue = ''
    @property({ type: String }) searchValue = ''
    @property({ type: String }) activeHandle: any
    @property({ type: String }) imageUrl: any
    @property({ type: Array }) list = []
    @property({ type: Array }) searchWalletHandles: any[] = []

    firstUpdated() {
        this.search()
        this.activeHandle = localStorage.getItem('activeHandle')
    }

    onSelectHandle(handle: any) {
        this.dispatchEvent(new CustomEvent('receiver-handle', {
            detail: { handle },
            bubbles: true,
            composed: true
        }));
        this.requestUpdate()
    }

    onScroll() { }

    async search() {
        const inputValue = this.inputValue
        // this.list = await walletHandles() || [];
        // if (inputValue.startsWith('$')) {
        //     this.searchValue = inputValue.toLowerCase();
        //     const matchedItems = this.list.filter(item =>
        //         item.name.toLowerCase().startsWith((this.searchValue ?? '').replace(/^\$/, ''))
        //     );
        //     matchedItems.forEach(item => { });
        //     this.searchWalletHandles = matchedItems as WalletHandle[];
        //     this.requestUpdate()
        // } else {
        //     this.searchValue = inputValue.toLowerCase();
        //     const matchedItems = this.list.filter(item =>
        //         item.name.toLowerCase().includes(this.searchValue || '')
        //     );
        //     matchedItems.forEach(item => { });
        //     this.searchWalletHandles = matchedItems as WalletHandle[];
        // }
        // this.requestUpdate()
    }

    friendlyHandles() {
        this.search()
        return html`
            <div class="searched-handles">
                <div class="handles-select-dropdown">
                            <div class="wallet-handles-content">
                                <div class="scroll-wrapper-outer">
                                    <div class="scroll-wrapper">
                                        <div class="handles-container">
                                            ${(this.searchWalletHandles ?? []).map(
            (handle: any) => html`
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

    render() {
        return html`
        ${this.friendlyHandles()}`
    }
}