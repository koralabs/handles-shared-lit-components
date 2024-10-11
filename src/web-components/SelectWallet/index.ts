import { LitElement, html, css } from 'lit';
import { customElement, state, property } from 'lit/decorators.js';
import { SelectWalletStyles } from './styles';

/**
 * `select-wallet` is a custom LitElement component for selecting a cryptocurrency wallet.
 * 
 * ### Slots:
 * - **slottedButtons**: Slot for action buttons (e.g., confirm or cancel buttons).
 * 
 * ### State:
 * - `selectedWallet` (string): Tracks the selected wallet key.(set to currently selected wallet for active state)
 * 
 * ### Properties:
 * - `walletKeyChosen` (boolean): Tracks whether a wallet key has been chosen.
 * - `route` (string): Holds the current route, which can be used for navigation.
 * - `help` (string): A string for help text or tooltips.
 * - `slottedButtonsStyling` (string): Styles the slotted buttons container.
 * - `addFunction` (Function): Function that runs when the component is first updated (`firstUpdated()`).
 * - `infiniteScroll` (Function): Function to handle infinite scrolling within the wallet list.
 * - `selectWallet` (Function): Function to handle wallet selection. Receives the wallet object.
 * - `wallets` (Array): An array of wallet objects, each with `key`, `name`, and `icon` properties.
 * 
 * ### Methods:
 * - `renderSelectIcon(walletKey: string)`: Renders a selection icon for the wallet.
 * 
 * ### Example usage:
 * 
 * ```html
 * <select-wallet
 *   .wallets="${wallets}"
 *   .selectWallet="${onSelectWallet}">
 * </select-wallet>
 * ```
 * 
 * ```javascript
 * const wallets = [
 *   { key: 'lace', name: 'Lace', icon: 'path/to/lace-icon.svg' },
 *   { key: 'nami', name: 'Nami', icon: 'path/to/nami-icon.svg' },
 * ];
 * 
 * function onSelectWallet(wallet) {
 *   console.log('Selected wallet:', wallet);
 * }
 * ```
 */

@customElement('select-wallet')
export class SelectWallet extends LitElement {
    @state() selectedWallet: string = '';
    @state() walletApi: any = null;

    @property({ type: Boolean }) walletKeyChosen: boolean = false;
    @property({ type: String }) route = '';
    @property({ type: String }) help = 'help';
    @property({ type: String }) slottedButtonsStyling = '';
    @property({ type: Function }) addFunction = () => { };
    @property({ type: Function }) infiniteScroll = () => { };
    @property({ type: Function }) selectWallet = (wallet: { key: string; name: string; icon: string }) => { };
    @property({ type: Array }) wallets: { key: string; name: string; icon: string }[] = [];

    static styles = SelectWalletStyles;

    firstUpdated() {
        this.addFunction();
    }

    renderSelectIcon(walletKey: string) {
        const isSelected = this.selectedWallet === walletKey;
        return html`
            <div class="${isSelected ? 'selected-div' : 'unselected-div'}">
                <div class="${isSelected ? 'inner-selected-div' : 'inner-unselected-div'}"></div>
            </div>
        `;
    }

    render() {
        const userHasWallets = this.wallets.length > 0;

        return html`
            <div class="login-container">
                <div class="login-body">
                    <div class="login-content">
                        <div class="login-header">
                            <p class="header-text">Choose your wallet</p>
                        </div>
                        <div class="w-full relative">
                            <div class="wallets-container" @scroll="${this.infiniteScroll}">
                                ${userHasWallets
                ? this.wallets.map(wallet => html`
                                        <div class="wallet-item ${this.selectedWallet === wallet.key ? 'selected' : ''}" 
                                            @click="${() => this.selectWallet(wallet)}">
                                            <div class="relative">
                                                <div class="wallets-active-border ${this.selectedWallet === wallet.key ? 'active' : 'inactive'}">
                                                    <div class="wallet-name-wrapper">
                                                        <div class="icon-wrapper">
                                                            <img style="width:100%; height:100%;" src="${wallet.icon}" alt="${wallet.name}" />
                                                        </div>
                                                        <p class="wallet-name ${this.selectedWallet === wallet.key ? 'selected' : ''}">${wallet.name}</p>
                                                    </div>
                                                    <div class="circle-checkbox">${this.renderSelectIcon(wallet.key)}</div>
                                                </div>
                                            </div>
                                        </div>
                                    `)
                : html`
                                    <div class="text-center mb-6">
                                        <p class="text-gray-500">No supported wallet extensions found.</p>
                                    </div>
                                `}
                            </div>
                        </div>
                        <div style="${this.slottedButtonsStyling}">
                            <slot name="slottedButtons"></slot>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
}
