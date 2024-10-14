import { css, html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { IPFS_GATEWAY, IPFS_GATEWAY_RESIZE_QUERY } from '../../helpers/KoraLabsHelpers';
import { SelectImagesStyles } from './styles';

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
 * `select-images` is a custom LitElement component for selecting wallet handles.
 * 
 * ### Slots:
 * - **`slottedSearch`**: Slot for the search input.
 * - **`slottedLoader`**: Slot for a loading spinner or indicator.
 * 
 * ### Properties:
 * - **`handleData`**:  
 *   The data for the handle, expected to follow the `GetHandleResponse` format.
 * - **`addFunction`**:  
 *   A function called during the `firstUpdated()` lifecycle method.
 * - **`infiniteScroll`**:  
 *   A function or property that handles infinite scrolling behavior.
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
 * ```js
 * infiniteScroll: (event: Event) => {
 *   const mainSection = event.currentTarget as HTMLElement;
 *   const scrollPosition = mainSection.scrollTop + mainSection.clientHeight;
 *   const scrollHeight = mainSection.scrollHeight;
 * 
 *   // Check if scrolled to bottom (or near bottom)
 *   if (scrollPosition >= scrollHeight - 50) {
 *     const infiniteScroll = mainSection.shadowRoot?.querySelector('infinite-scroll');
 *     infiniteScroll?.dispatchEvent(new CustomEvent('scroll-bottom', { bubbles: true, composed: true }));
 *     console.log('Scrolled to bottom');
 *   }
 * },
 * ```
 * 
 * ### Example Usage:
 * ```html
 * <select-images
 *   .handleData=${handleData}
 *   .addFunction=${addFunction}
 *   .infiniteScroll=${infiniteScroll}
 *   .selectHandle=${selectHandle}
 *   .slottedButtonsStyling=${'display: flex;'}>
 * </select-images>
 * ```
 */

@customElement('select-images')
export class SelectImages extends LitElement {
    @property({ type: Array }) handleData: any[] = [];
    @property({ type: Object }) handle: any = {};
    @property({ type: Boolean }) dropdownOpen = false;
    @property({ type: Boolean }) loadingImg = false;
    @property({ type: Boolean }) isLoading = false;
    @property({ type: String }) imgWidth: string = '';
    @property({ type: String }) imgHeight: string = '';
    @property({ type: String }) route = '';
    @property({ type: String }) slottedSearchStyling: string = '';
    @property({ type: Function }) addFunction = () => { };
    @property({ type: Function }) infiniteScroll = () => { };
    @property({ type: Function }) selectHandle = (handle) => { };
    @property({ type: Object })
    litElement!: LitElement;
    help: string;
    handleDataArray: any;


    static styles = SelectImagesStyles

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

    renderImages() {
        const handleDataArray = this.handleData || [];
        if (handleDataArray.length === 1) {
            this.imgHeight = 'auto';
            this.imgWidth = 'auto';
        } else if (handleDataArray.length > 1 && handleDataArray.length <= 10) {
            this.imgHeight = '10rem';
            this.imgWidth = '10rem';
        } else {
            this.imgHeight = '5rem';
            this.imgWidth = '5rem';
        }
        return html`${handleDataArray.map((handleData: WalletHandle, index: number) => {
            const handle = this.handleData ? this.handleData[index] : undefined;
            return html`
            <div @click="${() => handle && this.selectHandle(handle)}" class="handle-item ${handle?.active ? 'active' : ''}">
                <div >
                    ${handleData.image
                    ? html`<img class="handle-img" style="max-width:${this.imgWidth}; max-height:${this.imgHeight}" src="${this.imageUrl(handleData.image)}" @load="${() => this.handleDataArray[index].loading = false}" />`
                    : html`< slot name="slottedLoader"></slot>`
                }
                </div>
            </div>
        `;
        })}`;
    }

    renderHandlesSelect() {
        return html`
            <div class="login-container">
                <div class="login-body">
                    <div class="login-content">
                        <div class="login-content-header">
                            <div class="login-content-header-title">
                            Choose your handle
                            </div>
                        </div>
                        <div class="wallet-handles-content">
                            <div class="select-wrapper">
                                <div style=${this.slottedSearchStyling}>
                                    <slot name="slottedSearch" ></slot>
                                </div>
                                <div class="scroll-wrapper-outer">                            
                                    <div style="width:100%; height:100%; pointer-events:none; position: absolute; z-index: 9; background-image: linear-gradient(to top, rgb(10, 14, 59), rgba(0, 0, 0, 0) 10%, rgba(0, 0, 0, 0) 90%, rgb(10, 14, 59) 100%);"></div>
                                    <div class="scroll-wrapper" @scroll="${this.infiniteScroll}">
                                        <div class="handles-container">
                                            ${this.renderImages()}
                                        </div>
                                    </div>            
                                </div>               
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
    render() {
        return html`
            <div class="logout-and-handles">
                ${this.renderHandlesSelect()}
            </div>
        `;
    }
}