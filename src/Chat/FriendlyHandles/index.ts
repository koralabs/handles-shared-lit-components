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
        this.list = handleData
        if (inputValue.startsWith('$')) {
            this.searchValue = inputValue.toLowerCase();
            const matchedItems = this.list.filter(item =>
                item.name.toLowerCase().startsWith((this.searchValue ?? '').replace(/^\$/, ''))
            );
            matchedItems.forEach(item => { });
            this.searchWalletHandles = matchedItems
            this.requestUpdate()
        } else {
            this.searchValue = inputValue.toLowerCase();
            const matchedItems = this.list.filter(item =>
                item.name.toLowerCase().includes(this.searchValue || '')
            );
            matchedItems.forEach(item => { });
            this.searchWalletHandles = matchedItems
        }
        this.requestUpdate()
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
export const handleData = [
    {
        "default": false,
        "hex": "000de14064696c656d6d61",
        "count": 1,
        "name": "dilemma",
        "policyId": "f0ff48bbb7bbe9d59a40f1ce90e9e9d0ff5002ec48f232b49ca0fb9a"
    },
    {
        "default": false,
        "hex": "000de1406772696d2d726561706572",
        "count": 1,
        "name": "grim-reaper",
        "policyId": "f0ff48bbb7bbe9d59a40f1ce90e9e9d0ff5002ec48f232b49ca0fb9a"
    },
    {
        "default": false,
        "hex": "000de140736f726365726572",
        "count": 1,
        "name": "sorcerer",
        "policyId": "f0ff48bbb7bbe9d59a40f1ce90e9e9d0ff5002ec48f232b49ca0fb9a"
    },
    {
        "default": false,
        "hex": "000de1407468656f6e6572696e67",
        "count": 1,
        "name": "theonering",
        "policyId": "f0ff48bbb7bbe9d59a40f1ce90e9e9d0ff5002ec48f232b49ca0fb9a"
    },
    {
        "default": false,
        "hex": "000de1407473745f6d69675f30303730",
        "count": 1,
        "name": "tst_mig_0070",
        "policyId": "f0ff48bbb7bbe9d59a40f1ce90e9e9d0ff5002ec48f232b49ca0fb9a"
    },
    {
        "default": false,
        "hex": "7473745f6d69675f30333030",
        "count": 1,
        "name": "tst_mig_0300",
        "policyId": "f0ff48bbb7bbe9d59a40f1ce90e9e9d0ff5002ec48f232b49ca0fb9a"
    },
    {
        "default": false,
        "hex": "7473745f6d69675f30333031",
        "count": 1,
        "name": "tst_mig_0301",
        "policyId": "f0ff48bbb7bbe9d59a40f1ce90e9e9d0ff5002ec48f232b49ca0fb9a"
    },
    {
        "default": false,
        "hex": "7473745f6d69675f30333032",
        "count": 1,
        "name": "tst_mig_0302",
        "policyId": "f0ff48bbb7bbe9d59a40f1ce90e9e9d0ff5002ec48f232b49ca0fb9a"
    },
    {
        "default": false,
        "hex": "7473745f6d69675f30333033",
        "count": 1,
        "name": "tst_mig_0303",
        "policyId": "f0ff48bbb7bbe9d59a40f1ce90e9e9d0ff5002ec48f232b49ca0fb9a"
    },
    {
        "default": false,
        "hex": "7473745f6d69675f30333034",
        "count": 1,
        "name": "tst_mig_0304",
        "policyId": "f0ff48bbb7bbe9d59a40f1ce90e9e9d0ff5002ec48f232b49ca0fb9a"
    },
    {
        "default": false,
        "hex": "7473745f6d69675f30333035",
        "count": 1,
        "name": "tst_mig_0305",
        "policyId": "f0ff48bbb7bbe9d59a40f1ce90e9e9d0ff5002ec48f232b49ca0fb9a"
    },
    {
        "default": false,
        "hex": "7473745f6d69675f30333036",
        "count": 1,
        "name": "tst_mig_0306",
        "policyId": "f0ff48bbb7bbe9d59a40f1ce90e9e9d0ff5002ec48f232b49ca0fb9a"
    },
    {
        "default": false,
        "hex": "7473745f6d69675f30333037",
        "count": 1,
        "name": "tst_mig_0307",
        "policyId": "f0ff48bbb7bbe9d59a40f1ce90e9e9d0ff5002ec48f232b49ca0fb9a"
    },
    {
        "default": false,
        "hex": "7473745f6d69675f30333038",
        "count": 1,
        "name": "tst_mig_0308",
        "policyId": "f0ff48bbb7bbe9d59a40f1ce90e9e9d0ff5002ec48f232b49ca0fb9a"
    },
    {
        "default": false,
        "hex": "7473745f6d69675f30333039",
        "count": 1,
        "name": "tst_mig_0309",
        "policyId": "f0ff48bbb7bbe9d59a40f1ce90e9e9d0ff5002ec48f232b49ca0fb9a"
    },
    {
        "default": false,
        "hex": "7473745f6d69675f30333130",
        "count": 1,
        "name": "tst_mig_0310",
        "policyId": "f0ff48bbb7bbe9d59a40f1ce90e9e9d0ff5002ec48f232b49ca0fb9a"
    },
    {
        "default": false,
        "hex": "7473745f6d69675f30333131",
        "count": 1,
        "name": "tst_mig_0311",
        "policyId": "f0ff48bbb7bbe9d59a40f1ce90e9e9d0ff5002ec48f232b49ca0fb9a"
    },
    {
        "default": false,
        "hex": "7473745f6d69675f30333132",
        "count": 1,
        "name": "tst_mig_0312",
        "policyId": "f0ff48bbb7bbe9d59a40f1ce90e9e9d0ff5002ec48f232b49ca0fb9a"
    },
    {
        "default": false,
        "hex": "7473745f6d69675f30333133",
        "count": 1,
        "name": "tst_mig_0313",
        "policyId": "f0ff48bbb7bbe9d59a40f1ce90e9e9d0ff5002ec48f232b49ca0fb9a"
    },
    {
        "default": false,
        "hex": "7473745f6d69675f30333134",
        "count": 1,
        "name": "tst_mig_0314",
        "policyId": "f0ff48bbb7bbe9d59a40f1ce90e9e9d0ff5002ec48f232b49ca0fb9a"
    },
    {
        "default": false,
        "hex": "7473745f6d69675f30333135",
        "count": 1,
        "name": "tst_mig_0315",
        "policyId": "f0ff48bbb7bbe9d59a40f1ce90e9e9d0ff5002ec48f232b49ca0fb9a"
    },
    {
        "default": false,
        "hex": "7473745f6d69675f30333136",
        "count": 1,
        "name": "tst_mig_0316",
        "policyId": "f0ff48bbb7bbe9d59a40f1ce90e9e9d0ff5002ec48f232b49ca0fb9a"
    },
    {
        "default": false,
        "hex": "7473745f6d69675f30333137",
        "count": 1,
        "name": "tst_mig_0317",
        "policyId": "f0ff48bbb7bbe9d59a40f1ce90e9e9d0ff5002ec48f232b49ca0fb9a"
    },
    {
        "default": false,
        "hex": "7473745f6d69675f30333138",
        "count": 1,
        "name": "tst_mig_0318",
        "policyId": "f0ff48bbb7bbe9d59a40f1ce90e9e9d0ff5002ec48f232b49ca0fb9a"
    },
    {
        "default": false,
        "hex": "7473745f6d69675f30333139",
        "count": 1,
        "name": "tst_mig_0319",
        "policyId": "f0ff48bbb7bbe9d59a40f1ce90e9e9d0ff5002ec48f232b49ca0fb9a"
    },
    {
        "default": false,
        "hex": "7473745f6d69675f30333230",
        "count": 1,
        "name": "tst_mig_0320",
        "policyId": "f0ff48bbb7bbe9d59a40f1ce90e9e9d0ff5002ec48f232b49ca0fb9a"
    },
    {
        "default": false,
        "hex": "7473745f6d69675f30333231",
        "count": 1,
        "name": "tst_mig_0321",
        "policyId": "f0ff48bbb7bbe9d59a40f1ce90e9e9d0ff5002ec48f232b49ca0fb9a"
    }
]