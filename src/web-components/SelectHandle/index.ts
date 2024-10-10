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

/**
 * `select-handle` is a custom LitElement component for selecting wallet handles.
 * 
 * ### Slots:
 * - **slottedSearch**: Slot for search input.
 * - **slottedButtons**: Slot for action buttons.
 * 
 * ### Properties:
 * - `handleData`: The data for the handle, expected to be in `GetHandleResponse` format.
 * - `route`: The URL route to navigate when a handle is clicked.
 * - `addFunction`: A function called in `firstUpdated()`.
 * - `infiniteScroll`: A function/property to handle infinite scrolling.
 * - `slottedButtonsStyling`: A string to style the slotted buttons.
 * - `slottedSearchStyling`: A string to style the slotted search input.
 * 
 * ### Example usage:
 * ```html
 * <select-handle
 *   .handleData=${handleData}
 *   .route=${route}
 *   .slottedButtonsStyling=${'display: flex;'}></select-handle>
 * ```
 */

@customElement('select-handle')
export class SelectHandle extends LitElement {
    @property({ type: Array }) handleData: any[] = [];
    @property({ type: Object }) handle: any = {};
    @property({ type: Boolean }) dropdownOpen = false;
    @property({ type: Boolean }) loadingImg = false;
    @property({ type: Boolean }) isLoading = false;
    @property({ type: String }) route = '';
    @property({ type: String }) slottedButtonsStyling: string;
    @property({ type: String }) slottedSearchStyling: string;
    @property({ type: Function }) addFunction = () => { };
    @property({ type: Function }) infiniteScroll = () => { };
    @property({ type: Object })
    litElement!: LitElement;
    help: string;

    static styles = SelectHandleStyles

    firstUpdated() {
        const handle = localStorage.getItem('selectedHandle');
        this.handle = JSON.parse(handle ?? '{}');
        this.addFunction();
    }

    async selectHandle(handle) {
        this.loadingImg = true;
        this.handle = handle;
        localStorage.setItem('selectedHandle', JSON.stringify(handle));
        this.loadingImg = false;
        this.routeTo(this.route);
        this.requestUpdate();
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
                                <div style=${this.slottedSearchStyling}  >                   
                                    <slot name="slottedSearch" ></slot>
                                </div>
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
                        <div style=${this.slottedButtonsStyling}>
                            <slot name="slottedButtons"></slot>
                        </div>
                    </div>
                </div>
            </div>
            <infinite-scroll></infinite-scroll>
        `;
    }
}