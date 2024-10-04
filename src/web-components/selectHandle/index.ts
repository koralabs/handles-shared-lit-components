import { css, html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { IPFS_GATEWAY, IPFS_GATEWAY_RESIZE_QUERY } from '../../helpers/KoraLabsHelpers';
import { SelectHandleStyles } from './styles';

interface WalletHandle extends Asset {
    active: any;
    default: boolean;
    image?: string;
    imageUrl?: string;
}

interface Asset extends BasicAsset {
    name: string;
    count?: number;
    utxo?: string;
    image?: string;
    src?: string;
    price?: number;
    cost?: number;
    validUntilDate?: number;
}

interface BasicAsset {
    policyId: string;
    hex: string;
}

export function getCookie(name: string): object | null {
    const cookieArr = document.cookie.split(';');
    for (let i = 0; i < cookieArr.length; i++) {
        const cookiePair = cookieArr[i].trim().split('=');
        if (cookiePair[0] === encodeURIComponent(name)) {
            return JSON.parse(decodeURIComponent(cookiePair[1]));
        }
    }
    return null;
}

@customElement('select-handle')
export class SelectHandle extends LitElement {
    @property({ type: Array }) handleData: any[] = [];
    @property({ type: Object }) handle: any = {};
    @property({ type: Boolean }) dropdownOpen = false;
    @property({ type: Boolean }) loadingImg = false;
    @property({ type: Boolean }) isLoading = false;
    @property({ type: String }) route = '';
    @property({ type: Function }) addFunction = () => { };
    @property({ type: Function }) infiniteScroll = () => { };
    @property({ type: Object })
    litElement!: LitElement;
    help: string;

    static styles = SelectHandleStyles

    firstUpdated() {
        this.handle = getCookie('selectedHandle');
        this.helpLogger();
        this.addFunction();
    }

    helpLogger() {
        if (this.help === 'help') {
            console.info(`
                To use this component, you can pass in the following:
                
                1. **Slotted elements**:
                    - Use a \`div\` with \`slot="slottedSearch"\` for the search input.
                    - Use a \`div\` with \`slot="slottedButtons"\` for the action buttons.
                
                2. **Handle data**:
                    - You can pass in \`handleData\` formatted as \`GetHandleResponse\` (as per Kora Labs API).
                    - You can pass a \`handle\` object, where **name** and **image** properties are expected.
                    - Access the selected handle from cookies using \`getCookie('selectedHandle')\`.

                3. **Properties**:
                    - \`handleData\`: The data for the handle (expected in \`GetHandleResponse\` format).
                    - \`route\`: The URL route to navigate when a handle is clicked.
                    - \`addFunction\`: A function/property called in firstUpdate.
                    - \`infiniteScroll\`: A function/property for infinite scrolling passed to the scroll-wrapper-outer.
                
                Example usage:
                    <my-component 
                    .handleData=\${handleData}
                    .route=\${route}>
                    </my-component>
            `);

        }
    }

    async selectHandle(handle) {
        this.loadingImg = true;
        this.handle = handle;
        this.setCookie('selectedHandle', handle, { path: '/', maxAge: 60 * 60 * 24 * 30 }); // Expires in 30 days
        this.loadingImg = false;
        this.routeTo(this.route);
        this.requestUpdate();
    }

    setCookie(name: string, value: object, options: { path: string; maxAge?: number }) {
        const stringValue = JSON.stringify(value);
        let cookieString = `${encodeURIComponent(name)}=${encodeURIComponent(stringValue)}`;

        if (options.path) {
            cookieString += `; path=${options.path}`;
        }

        if (options.maxAge) {
            cookieString += `; max-age=${options.maxAge}`;
        }

        document.cookie = cookieString;
    }

    routeTo(route: string) {
        window.location.href = route;
    }

    imageUrl = (img: string): string => {
        const image = img.replace('ipfs://', '') || '';
        if (!image) {
            return '';
        }
        return `${IPFS_GATEWAY}/ipfs/${image}${IPFS_GATEWAY_RESIZE_QUERY}`;
    }

    render() {
        const handles = this.handleData;

        return html`
            <div>
                <div class="logout-and-handles">
                    <div class="handles-select-dropdown ${this.dropdownOpen ? 'open' : ''}">
                        <div class="wallet-handles-content">
                            <div class="select-wrapper">                        
                                <slot name="slottedSearch"></slot>
                                ${this.handle?.name
                ? html`
                                          <div class="current-handle">
                                              ${this.loadingImg
                        ? html`<custom-loader class="handle-img"></custom-loader>`
                        : html`
                                                        <div class="handle-img">
                                                            <img src="${this.imageUrl(this.handle?.image ?? '')}" />
                                                        </div>
                                                    `}
                                              <div>
                                                  <p class="current-handle-text">
                                                      <span class="handle-sign">
                                                          <span class="dollar-sign">$</span>
                                                      </span>
                                                      <span class="handle-text">${this.handle?.name}</span>
                                                  </p>
                                              </div>
                                          </div>
                                      `
                : ''}
                            </div>
                            <hr class="line-brake" />
                            <div class="scroll-wrapper-outer" @scroll="${this.infiniteScroll}">
                                <div class="scroll-wrapper">
                                    <div class="handles-container">
                                        ${(handles ?? []).map(
                    handle => html`
                                                <li
                                                    @click="${() =>
                            this.selectHandle({
                                ...handle,
                                active: true,
                                default: handle.default || false,
                            })}"
                                                    class="active-handle ${this.handle?.name === handle.name
                            ? 'active'
                            : ''}"
                                                >
                                                    ${this.handle?.name === handle.name && this.loadingImg
                            ? html`<custom-loader class="handle-img"></custom-loader>`
                            : this.handle?.name === handle.name
                                ? html`
                                                              <div class="handle-img">
                                                                  <img src="${this.imageUrl(handle.image)}" />
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
                                        ${this.isLoading ? html`<custom-loader class="loader"></custom-loader>` : ''}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <slot name="slottedButtons"></slot>
                    </div>
                </div>
            </div>
            <infinite-scroll></infinite-scroll>
        `;
    }
}
