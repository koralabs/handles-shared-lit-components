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
 * - **`slottedSearch`**: Slot for the search input.
 * - **`slottedButtons`**: Slot for action buttons.
 * - **`slottedLoader`**: Slot for a loading spinner or indicator.
 * 
 * ### Properties:
 * - **`handleData`**:  
 *   The data for the handle, expected to follow the `GetHandleResponse` format.
 * - **`addFunction`**:  
 *   A function called during the `firstUpdated()` lifecycle method.
 * - **`infiniteScroll`**:  
 *   A function or property that handles infinite scrolling behavior.
 * - **`slottedButtonsStyling`**:  
 *   A string used to apply custom CSS styling to the slotted buttons.
 * - **`slottedSearchStyling`**:  
 *   A string used to style the slotted search input.
 * - **`selectHandle`**:  
 *   A function that processes the selected handle. It receives the handle object and sends it back to the parent component.
 * - **`loadingImg`**:  
 *   A boolean flag indicating whether to display a loading spinner. The loading spinner content must be provided through the `slottedLoader` slot.
 * 
 * ### Example Method:
 * ```js
 * function selectHandle(handle) {
 *   this.loadingImg = true;
 *   console.log('Selected handle:', handle);
 *   this.loadingImg = false;
 * }
 * ```
 * 
 * ### Example Usage:
 * ```html
 * <select-handle
 *   .handleData=${handleData}
 *   .addFunction=${addFunction}
 *   .infiniteScroll=${infiniteScroll}
 *   .selectHandle=${selectHandle}
 *   .slottedButtonsStyling=${'display: flex;'}>
 * </select-handle>
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
    @property({ type: Function }) selectHandle = (handle) => { };
    @property({ type: Object })
    litElement!: LitElement;
    help: string;

    static styles = SelectHandleStyles

    firstUpdated() {
        const handle = localStorage.getItem('selectedHandle');
        this.handle = JSON.parse(handle ?? '{}');
        this.addFunction();
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
                                ...handle
                            })}"
                                                    class="active-handle ${this.handle?.name === handle.name
                            ? 'active'
                            : ''}"
                                                >
                                                    ${this.handle?.name === handle.name && this.loadingImg
                            ? html`<slot name="slottedLoader"></slot>`
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
                                        ${this.isLoading ? html`<slot name="slottedLoader"></slot>` : ''}
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