import { LitElement, html, css, CSSResultGroup } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { CurrentChatStyles } from './styles';
import { FriendlyHandles } from '../FriendlyHandles/index';
@customElement('current-chats')
export class SelectChat extends LitElement {

    static styles = CurrentChatStyles

    @property({ type: String }) activeHandle: any
    @property({ type: String }) receiverHandle: any
    @property({ type: Array }) FriendlyChats: any
    @property({ type: Boolean }) loadingImg = false
    @property({ type: String }) imageUrl: any


    onSelectHandle(handle: any) {
        this.dispatchEvent(new CustomEvent('chat-handle', {
            detail: { handle },
            bubbles: true,
            composed: true
        }));
        this.requestUpdate()
    }

    render() {
        return html`
           <div class="searched-handles">
                <div class="handles-select-dropdown">
                    <div class="wallet-handles-content">
                        <div class="scroll-wrapper-outer">
                            <div class="scroll-wrapper">
                                <div class="handles-container">
                                    ${(handleData ?? []).map(
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
    }
]