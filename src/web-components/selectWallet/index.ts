import { css, html, LitElement } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { SelectWalletStyles } from './styles';

declare global {
    interface Window {
        cardano: any;
    }
}

@customElement('select-wallet')
export class SelectWallet extends LitElement {
    @state() wallets: { key: string; name: string; icon: string }[] = [];
    @state() selectedWallet: string = '';
    @state() walletApi: any = null;
    @property({ type: Boolean }) walletKeyChosen: boolean = false;
    @property({ type: String }) route = '';
    @property({ type: String }) help: string;
    @property({ type: String }) slottedButtonsStyling: string;
    @property({ type: Function }) addFunction = () => { };
    @property({ type: Function }) infiniteScroll = () => { };

    static styles = SelectWalletStyles;

    firstUpdated() {
        this.wallets = this.getUserWallets();
        this.addFunction();
        this.helpLogger();

    }

    helpLogger() {
        if (this.help === 'help') {
            console.info(`
                To use this component, you can pass in the following:
                
                1. **Slotted elements**:
                    - Use a \`div\` with \`slot="slottedButtons"\` for any action buttons related to wallet selection.
                
                2. **Handle data**:
                    - This component automatically detects wallets available through the \`window.cardano\` API.
                    - The selected wallet is stored in cookies using the key \`selectedWalletKey\`.
                    - You can retrieve the selected wallet using \`localStorage.getItem('selectedWalletKey')\`.
                    
                3. **Properties**:
                    - \`route\`: The URL route to navigate to when a wallet is selected.
                    - \`walletKeyChosen\`: A boolean that indicates whether a wallet has been chosen.
                    - \`addFunction\`: A function/property called in firstUpdate.
                    - \`slottedButtonsStyling\`: A string to style the slotted buttons.
                
                Example usage:
                    <select-wallet 
                    .route=\${route}
                    .slottedButtonsStyling=\${'display: flex;'}>
                    </select-wallet>
            `);
        }
    }

    getUserWallets(): { key: string; name: string; icon: string }[] {
        const cardano = window.cardano ?? {};
        const wallets = Object.keys(cardano).reduce((wallets: { key: string; name: string; icon: string }[], walletKey) => {
            const wallet = cardano[walletKey];
            if (wallet?.name && wallet?.icon && typeof wallet?.enable === 'function') {
                wallets.push({ key: walletKey, name: wallet.name, icon: wallet.icon });
            }
            return wallets;
        }, []);

        return wallets;
    }

    async onSelectWallet(walletKey: { key: string; name: string; icon: string }) {
        this.walletKeyChosen = true;
        this.selectedWallet = walletKey.name;
        if (!walletKey) {
            return;
        }

        try {
            localStorage.setItem('selectedWalletKey', walletKey.key);
        } catch (error) {
            console.error('Error setting cookie:', error);
        }

        this.requestUpdate();
    }
    routeTo(route: string) {
        if (this.route) {
            window.location.href = route;
        } else { }
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
                            <div style="width:100%; height:100%; pointer-events:none; position: absolute; z-index: 10; background-image: linear-gradient(to top, rgb(10, 14, 59), rgba(0, 0, 0, 0) 10%, rgba(0, 0, 0, 0) 90%, rgb(10, 14, 59) 100%);"></div>
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
                : html`<div class="text-center mb-6">
                                        <p class="text-gray-500">No supported wallet extensions found.</p>
                                    </div>`
            }
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
