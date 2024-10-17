import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import './OpenChatButton/index.js'
import '../web-components/SelectHandle/index.js'
import '../web-components/SelectWallet/index.js'
import { walletHandles } from '../../helpers/handles.js';

@customElement('handle-chat')
export class HandleChat extends LitElement {
    loadingImg: boolean
    handle: string
    selectedWallet: string
    wallets: any[]
    handles: any[]
    activeHandle: object

    async firstUpdated() {
        this.wallets = this.getUserWallets()
        this.requestUpdate()
        this.handles = await walletHandles()

        this.selectedWallet = localStorage.getItem('walletKey')
        const retrievedHandle = localStorage.getItem('activeHandle')

        this.activeHandle = JSON.parse(retrievedHandle)
        this.requestUpdate()
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

        return wallets as [];
    }


    onSelectHandle(handle) {
        this.loadingImg = true;
        this.activeHandle = handle
        this.loadingImg = false;
        this.handle = handle;
        localStorage.setItem('activeHandle', JSON.stringify(handle))
        this.requestUpdate()

    }

    onSelectWallet(wallet) {
        localStorage.setItem('walletKey', wallet.key)
        this.requestUpdate()
    }

    render() {
        return html`
        <select-wallet .wallets=${this.wallets} .onSelectWallet=${this.onSelectWallet} .selectedWallet=${this.selectedWallet}></select-wallet>
        <select-handle
            .handleData=${this.handles}
            .loadingImg=${this.loadingImg}
            .activeHandle=${this.activeHandle}
            .onSelectHandle=${this.onSelectHandle}></select-handle>
        <open-chat style=""></open-chat>
        `
    }
}