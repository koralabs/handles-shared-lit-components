import { css, html, LitElement } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

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

    firstUpdated() {
        this.wallets = this.getUserWallets();
        console.log(this.getCookie('selectedWallet'));
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
    setCookie(name: string, value: string, options: { path: string; maxAge?: number }) {
        console.log('setting cookie', name, value,)
        const stringValue = JSON.stringify(value);
        let cookieString = `${encodeURIComponent(name)}=${encodeURIComponent(stringValue)}`;

        if (options.path) {
            cookieString += `; path=${options.path}`;
        }

        if (options.maxAge) {
            cookieString += `; max-age=${options.maxAge}`;
        }
        console.log('cookieString', cookieString)

        document.cookie = cookieString;
        console.log('Current cookies:', document.cookie);

    }

    getCookie(name: string): object | null {
        const cookieArr = document.cookie.split(';');
        for (let i = 0; i < cookieArr.length; i++) {
            const cookiePair = cookieArr[i].trim().split('=');
            if (cookiePair[0] === encodeURIComponent(name)) {
                // Decode and parse the JSON string back into an object
                return JSON.parse(decodeURIComponent(cookiePair[1]));
            }
        }
        return null;
    }
    async onSelectWallet(walletKey: { key: string; name: string; icon: string }) {
        this.walletKeyChosen = true;
        this.selectedWallet = walletKey.name;
        if (!walletKey) {
            return;
        }

        try {
            console.log('selected wallet', walletKey);
            this.setCookie('selectedWalletKey', walletKey.name, { path: '/', maxAge: 60 * 60 * 24 * 30 }); // Expires in 30 days
        } catch (error) {
            // Handle error
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
                            <div class="wallets-container">
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
                        <slot name="slottedButtons"></slot>
                    </div>
                </div>
            </div>
        `;
    }

    static styles = css`
        * {
            color: rgba(255, 255, 255, 1);
        }

        .login-container {
            max-width: 42rem;
            margin: auto;
            padding: 1rem;
        }

        .login-body {
            padding: 1rem;
            margin-left: 2rem;
            margin-right: 2rem;
            margin-top: 1rem;
            border-radius: 1.5rem;
            background-color: hsla(0, 0%, 100%, 0.1);
        }

        .login-content {
            padding: 1rem;
            background-color: rgba(10, 14, 59, 1);
            border-radius: 0.75rem;
        }

        .login-header {
            text-align: center;
            margin-bottom: 1rem;
        }

        .header-text {
            margin-top: 0rem;
            font-size: 1.875rem;
            line-height: 2.25rem;
            margin-bottom: 0;
        }

        .wallets-container {
            padding-top: 0.25rem;
            padding-bottom: 1rem;
            padding-left: 1rem;
            padding-right: 1rem;
            overflow-y: scroll;
            max-height: 18rem;
            position: relative;
        }

        .wallets-container::-webkit-scrollbar {
            width: 0.25rem;
        }

        .wallets-container::-webkit-scrollbar-track {
            background: hsla(0, 0%, 100%, 0.1);
        }

        .wallets-container::-webkit-scrollbar-thumb {
            background: #70b8ff;
            border-radius: 0.25rem;
        }

        .wallets-container {
            scrollbar-width: auto;
            scrollbar-color: #70b8ff hsla(0, 0%, 100%, 0.1);
        }

        .wallet-item:hover {
            opacity: 1;
        }

        .wallet-item {
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-radius: 8px;
            cursor: pointer;
            opacity: 0.8;
            transition: all 0.2s;
        }

        .relative {
            padding-top: 0.75rem;
            width: 100%;
            position: relative;
        }

        .wallets-active-border {
            transition: 0.2s;
            box-shadow: none;  
            opacity: 1;
            padding: 1.25rem;
            background-color: hsla(0, 0%, 100%, 0.05);
            border-radius: 0.75rem;
            justify-content: space-between;
            align-items: center;
            flex-direction: row;
            cursor: pointer;
            display: flex;
            position: relative;
        }

        .wallets-active-border.active {
            transition-property: all;
            transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
            transition-duration: 0.15s;
            opacity: 1;
            border: 1px solid rgba(74, 222, 128, 1);
            border-width: 1px;
            border-radius: 0.75rem;
            box-shadow: green 0px 0px 12px; 
        }

        .wallets-active-border.inactive {
            box-shadow: none; 
        }

        .wallet-name-wrapper {
            display: flex;
            flex-direction: row;
            align-items: center;
        }

        .icon-wrapper {
            padding: 0.25rem;
            background-color: rgba(255, 255, 255, 1);
            border-radius: 0.25rem;
            width: 1.75rem;
            height: 1.75rem;
        }

        .wallet-name {
            transition-property: color, background-color, border-color, text-decoration-color, fill, stroke;
            transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
            transition-duration: 0.15s;
            color: rgba(255, 255, 255, 1);
            margin-left: 0.5rem;
            margin-bottom: 0;
            margin-bottom: 1rem;
            margin: 0;
        }

        .wallet-name {
            margin-left: 8px;
            color: var(--text-gray-400);
        }

        .wallet-name.selected {
            color: white;
        }

        .selected-div {
            display: flex;
            background-color: rgba(34, 197, 94, 1);
            justify-content: center;
            align-items: center;
            border-radius: 9999px;
            box-shadow: green 0px 0px 8px;
            border: 1px solid rgba(156, 163, 175, 1);
            fill: rgba(34, 197, 94, 1);
            width: 1.25rem;
            height: 1.25rem;
        }

        .inner-selected-div {
            border-radius: 9999px;
            box-shadow: green 0px 0px 8px;
            background: white;
            width: 0.75rem;
            height: 0.75rem;
        }

        .unselected-div {
            display: flex;
            justify-content: center;
            align-items: center;
            border-radius: 9999px;
            border: 1px solid rgba(156, 163, 175, 1);
            width: 1.25rem;
            height: 1.25rem;
        }

        .inner-unselected-div {
            border-radius: 9999px;
            width: 0.5rem;
            height: 0.5rem;
        }

        @media (min-width: 400px) {
            .login-body {
                padding: 2rem;
            }

            .login-content {
                padding: 4rem;
            }
        }

        @media (max-width: 580px) {
            .login-container {
                padding: 0rem;
            }

            .login-body {
                padding: 0.5rem;
                margin-left: 0.5rem;
                margin-right: 0.5rem;
                margin-top: 0.5rem;
            }

            .login-content {
                padding: 0.5rem;
            }
        }

        @media (max-width: 300px) {
            .icon-wrapper {
                height: 1rem;
                width: 1rem;
                padding: 0.1rem;
                display: flex;
            }
        }
    `;
    helpLogger() {
        if (this.help === 'help') {
            console.info(`
            To use this component, you can pass in the following:
            
            1. **Slotted elements**:
                - Use a \`div\` with \`slot="slottedButtons"\` for any action buttons related to wallet selection.
            
            2. **Handle data**:
                - This component automatically detects wallets available through the \`window.cardano\` API.
                - The selected wallet is stored in cookies using the key \`selectedWalletKey\`.
                - You can retrieve the selected wallet using \`getCookie('selectedWalletKey')\`.
                
            3. **Properties**:
                - \`route\`: The URL route to navigate to when a wallet is selected.
                - \`walletKeyChosen\`: A boolean that indicates whether a wallet has been chosen.
            
            Example usage:
                <select-wallet 
                .route=\${route}>
                </select-wallet>
        `);
        }
    }

}
