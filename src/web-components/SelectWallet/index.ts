
import { LitElement, html, css } from 'lit';
import { customElement, state, property } from 'lit/decorators.js';
import { SelectWalletStyles } from './styles';
/**
 * `select-handle` is a custom LitElement component for selecting wallet handles.
 * 
 * ### Slots:
 * - **slottedSearch**: Slot for search input.
 * - **slottedButtons**: Slot for action buttons.
 * 
 * ### Properties:
 * - `route`: The URL route to navigate when a handle is clicked.
 * - `addFunction`: A function called in `firstUpdated()`.
 * - `infiniteScroll`: A function/property to handle infinite scrolling.
 * - `slottedButtonsStyling`: A string to style the slotted buttons.
 * - `slottedSearchStyling`: A string to style the slotted search input.
 * - `getUserWallets`: A function that returns an array of wallet objects.
 * 
 *   ```javascript
 *   getUserWallets(): { key: string; name: string; icon: string }[] {
 *       const cardano = window.cardano ?? {};
 *       const wallets = Object.keys(cardano).reduce((wallets: { key: string; name: string; icon: string }[], walletKey) => {
 *           const wallet = cardano[walletKey];
 *           if (wallet?.name && wallet?.icon && typeof wallet?.enable === 'function') {
 *               wallets.push({ key: walletKey, name: wallet.name, icon: wallet.icon });
 *           }
 *           return wallets;
 *       }, []);
 * 
 *       return wallets;
 *   }
 *   ```
 * 
 * ### Example usage:
 * ```html
 * <select-handle
 *   .getUserWallets=${wallets}
 *   .route=${route}>
 * </select-handle>
 * ```
 */


@customElement('select-wallet')
export class SelectWallet extends LitElement {
    @state() selectedWallet: string = '';
    @state() walletApi: any = null;
    @state() wallets: { key: string; name: string; icon: string }[] = [];

    @property({ type: Boolean }) walletKeyChosen: boolean = false;
    @property({ type: String }) route = '';
    @property({ type: String }) help = 'help';
    @property({ type: String }) slottedButtonsStyling = '';
    @property({ type: Function }) addFunction = () => { };
    @property({ type: Function }) infiniteScroll = () => { };
    @property({ type: Function }) getUserWallets: () => [];

    static styles = SelectWalletStyles;

    firstUpdated() {
        this.wallets = this.getUserWallets();
        console.log('wallets:', this.wallets);
        this.addFunction();
    }

    async onSelectWallet(wallet: { key: string; name: string; icon: string }) {
        this.walletKeyChosen = true;
        this.selectedWallet = wallet.name;

        if (!wallet) {
            return;
        }

        try {
            localStorage.setItem('selectedWalletKey', wallet.key);
        } catch (error) {
            console.error('Error setting wallet key:', error);
        }

        this.requestUpdate();
    }

    routeTo(route: string) {
        if (this.route) {
            window.location.href = route;
        }
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
                                            @click="${() => this.onSelectWallet(wallet)}">
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
                        <div style=${this.slottedButtonsStyling}>
                            <slot name="slottedButtons"></slot>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
}
