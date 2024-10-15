import { css, html, LitElement } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { DisconnectWalletButtonStyles } from './styles';

/**
 * `disconnect-wallet-button` is a custom component for disconnecting a specified wallet.
 * 
 * ### Help: How to Use the `<disconnect-wallet-button>` Component
 * 
 * 1. **wallet Icon (optional)**:
 *    - Pass the wallet's icon URL to display the icon.
 *    - **Example**:
 *      ```html
 *      <disconnect-wallet-button .walletIconUrl="${walletIconUrl}"></disconnect-wallet-button>
 *      ```
 * 
 * 2. **onClick (optional)**:
 *    - Pass a function that will execute when the button is clicked. This can be used to handle disconnection logic.
 *    - **Example**:
 *      ```html
 *      <disconnect-wallet-button 
        .walletIconUrl="${walletIconUrl}" 
        .onClick =${onClick}>
 *      </disconnect-wallet-button>
 *      ```
 * 
 * **Note**: The `WalletData icon` needs to come from the `window.cardano` interface for proper rendering.
 */
@customElement('disconnect-wallet-button')
export class DisconnectWalletButton extends LitElement {
    @property({ type: String }) walletIconUrl!: string;
    @property({ type: Boolean }) showHoverIcon: boolean = false;
    @property({ type: Function }) onClick = () => { };

    static styles = DisconnectWalletButtonStyles;

    renderDisconnectWalletIcon() {
        return html`
            <svg class="disconnect-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" class="cc-fill w-full h-full -ml-1" fill="#fff">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M13.617 3.844a2.87 2.87 0 0 0-.451-.868l1.354-1.36L13.904 1l-1.36 1.354a2.877 2.877 0 0 0-.868-.452 3.073 3.073 0 0 0-2.14.075 3.03 3.03 0 0 0-.991.664L7 4.192l4.327 4.328 1.552-1.545c.287-.287.508-.618.663-.992a3.074 3.074 0 0 0 .075-2.14zm-.889 1.804a2.15 2.15 0 0 1-.471.705l-.93.93-3.09-3.09.93-.93a2.15 2.15 0 0 1 .704-.472 2.134 2.134 0 0 1 1.689.007c.264.114.494.271.69.472.2.195.358.426.472.69a2.134 2.134 0 0 1 .007 1.688zm-4.824 4.994l1.484-1.545-.616-.622-1.49 1.551-1.86-1.859 1.491-1.552L6.291 6 4.808 7.545l-.616-.615-1.551 1.545a3 3 0 0 0-.663.998 3.023 3.023 0 0 0-.233 1.169c0 .332.05.656.15.97.105.31.258.597.459.862L1 13.834l.615.615 1.36-1.353c.265.2.552.353.862.458.314.1.638.15.97.15.406 0 .796-.077 1.17-.232.378-.155.71-.376.998-.663l1.545-1.552-.616-.615zm-2.262 2.023a2.16 2.16 0 0 1-.834.164c-.301 0-.586-.057-.855-.17a2.278 2.278 0 0 1-.697-.466 2.28 2.28 0 0 1-.465-.697 2.167 2.167 0 0 1-.17-.854 2.16 2.16 0 0 1 .642-1.545l.93-.93 3.09 3.09-.93.93a2.22 2.22 0 0 1-.711.478z"></path>            
            </svg> 
          `;
    }

    renderConnectWalletIcon() {
        return html`
            ${this.walletIconUrl
                ? html`<img 
                    width="35px" 
                    height="35px" 
                    src="${this.walletIconUrl}" 
                    alt="Wallet Icon" 
                />`
                : html`
                    <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        viewBox="0 0 512 512" 
                        width="25px" 
                        height="25px"
                        fill="#0ddd60">
                        <path
                            d="M64 32C28.7 32 0 60.7 0 96L0 416c0 35.3 28.7 64 64 64l384 0c35.3 0 64-28.7 64-64l0-224c0-35.3-28.7-64-64-64L80 128c-8.8 0-16-7.2-16-16s7.2-16 16-16l368 0c17.7 0 32-14.3 32-32s-14.3-32-32-32L64 32zM416 272a32 32 0 1 1 0 64 32 32 0 1 1 0-64z" 
                        />
                    </svg>
                `}
        `;
    }

    renderDisconnectWalletButton() {
        return html`
        <div class="icon-wrapper">
            <div 
                class="anchor-btn-disconnect"
                @click="${this.onClick}"
                @mouseenter="${() => this.showHoverIcon = true}"
                @mouseleave="${() => this.showHoverIcon = false}">
                ${this.showHoverIcon
                ? this.renderDisconnectWalletIcon()
                : this.renderConnectWalletIcon()
            }
            <span class="tooltip-text">Disconnect Wallet</span>
            </div>
        </div>
    `;
    }
    render() {
        return this.renderDisconnectWalletButton();
    }
}