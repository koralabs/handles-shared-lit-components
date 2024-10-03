import { css, html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { IPFS_GATEWAY, IPFS_GATEWAY_RESIZE_QUERY } from '../../helpers/KoraLabsHelpers';

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

@customElement('select-handle')
export class SelectHandle extends LitElement {
    @property({ type: Array }) handleData: any[] = [];
    @property({ type: Object }) handle: any = {};
    @property({ type: Boolean }) dropdownOpen = false;
    @property({ type: Boolean }) loadingImg = false;
    @property({ type: Boolean }) isLoading = false;
    @property({ type: String }) route = '';

    firstUpdated() {
        this.handle = this.getCookie('selectedHandle');
    }

    async selectHandle(handle) {
        this.loadingImg = true;
        this.handle = handle;

        // Save the selected handle in cookies
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
                            <div class="scroll-wrapper-outer">
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
                    </div>
                </div>
            </div>
        `;
    }

    static styles = css`
        * {
            color: rgba(255, 255, 255, 1);
        }
        .logout-and-handles {
            display: flex;
            justify-content: center;
            align-items: center;
        }
        .current-handle-text .handles-select-dropdown li p {
            overflow: hidden;
            text-overflow: ellipsis;
            font-family: Ubuntu Mono, monospace;
            display: flex;
            text-decoration: none;
        }
        .handles-select-dropdown {
            background: rgb(8, 11, 47);
            list-style: none;
            display: flex;
            align-items: center;
            justify-content: center;
            align-content: center;
            flex-wrap: nowrap;
            flex-direction: column;
            margin-top: 5px;
            padding-top: 1.5rem;
            padding-bottom: 1.5rem;
            padding-left: 1.5rem;
            padding-right: 1.5rem;
            border-color: hsla(0, 0%, 100%, 0.05);
            border-width: 1px;
            border-radius: 0.75rem;
            max-width: 250px;
            width: 100%;
            z-index: 10;
            transition: all 0.3s ease;
        }
        .handles-select-dropdown li {
            overflow: hidden;
            text-overflow: ellipsis;
            display: flex;
            flex-direction: row;
            align-items: center;
            width: -webkit-fill-available;
            padding-top: 0.75rem;
            padding-bottom: 0.75rem;
            padding-left: 1rem;
            padding-right: 1rem;
            margin-top: 5px;
            background-color: hsla(0, 0%, 100%, 0.05);
            border-radius: 0.5em;
        }
        .handles-select-dropdown li:hover {
            opacity: 0.7;
        }
        .wallet-handles-content {
            width: 100%;
            margin-top: 0.5rem;
        }
        .select-wrapper {
            display: flex;
            flex-direction: column;
            align-content: center;
            justify-content: center;
            align-items: center;
        }
        .handles-select-wrapper {
            display: flex;
            align-items: center;
            justify-content: space-between;
            transition-property: all;
            transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
            transition-duration: 0.15s;
            color: rgba(107, 114, 128, 1);
            font-weight: 700;
            text-align: center;
            padding-left: 1rem;
            padding-top: 0.5rem;
            padding-bottom: 0.5rem;
            padding-right: 1.5rem;
            background-color: hsla(0, 0%, 100%, 0.05);
            border-radius: 1.5rem;
            cursor: pointer;
            width: 100%;
            margin: 0;
            position: relative;
        }
        .current-handle {
            overflow: hidden;
            text-overflow: ellipsis;
            border: 1px solid rgba(74, 222, 128, 1);
            border-radius: 0.5rem;
            display: flex;
            padding: 0.7em 0.5em;
            margin: 0.1em 0;
            text-decoration: none;
            flex-direction: row;
            align-items: center;
            width: -webkit-fill-available;
            margin-top: 5px;
            background-color: hsla(0, 0%, 100%, 0.05);
            border-radius: 0.5em;
        }
        .current-handle-text {
            margin: 0.5rem;
            display: flex;
            flex-direction: row;
            font-family: Ubuntu Mono, monospace;
            align-items: center;
        }
        .handle-img {
            display: flex;
            width: 2rem;
            height: 2rem;
            margin-right: 10px;
        }
        .handle-sign {
            display: flex;
            align-items: center;
            font-family: Ubuntu Mono, monospace;
            fill: rgba(74, 222, 128, 1);
            margin-right: 1px;
        }
        .handle-text {
            font-family: Ubuntu Mono, monospace;
        }
        .active-handle.active {
            border: 1px solid rgba(74, 222, 128, 1);
            border-radius: 0.5rem;
        }
        .dollar-sign {
            font-family: Ubuntu Mono, monospace;
            color: rgba(74, 222, 128, 1);
        }
        .line-brake {
            border-color: rgba(58, 80, 107, 1);
            margin-top: 1rem;
            margin-bottom: 1rem;
            height: 0;
            color: inherit;
            border-top-width: 1px;
        }
        .scroll-wrapper {
            height: auto;
            overflow: unset;
        }
        .scroll-wrapper-outer {
            max-height: 24rem;
            width: 100%;
            --scrollbar-track: hsla(0, 0%, 100%, 0.1);
            --scrollbar-thumb: #70b8ff;
            --scrollbar-thumb-radius: 0.25rem;
            --scrollbar-width: 0.25rem;
            scrollbar-width: auto;
            scrollbar-color: initial initial;
            scrollbar-color: var(--scrollbar-thumb, initial) var(--scrollbar-track, initial);
            overflow-y: scroll;
        }
        .handles-container {
            display: flex;
            gap: 2px;
            width: 100%;
            position: relative;
            flex-direction: column;
        }
        .active-handle p {
            margin: 0.5rem;
        }
        .handle-wrapper {
            display: flex;
            flex-direction: row;
        }
        .loader {
            height: 5rem;
        }
        .handle-text {
            display: flex;
            align-items: center;
            justify-content: space-between;
        }
        @media screen and (max-width: 350px) {
            .handles-select-dropdown {
                padding-left: 0.25rem;
                padding-right: 0.25rem;
            }
            .route-btn {
                margin-left: 0.25rem;
                margin-right: 0.25rem;
            }
            .search-icon-wrapper {
                left: 20px;
            }
            .clear-search-wrapper {
                right: 20px;
            }
        }
    `;
}
