import { css, html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
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
 * - **`slottedLoader`**: Slot for a loading spinner or indicator to display when no handle.image data found.
 * 
 * ### Properties:
 * - **`handleData`**:  
 *   The data for the handle, expected in the format of an array of handle objects.
 * 
 * - **`addFunction`**:  
 *   A function called during the `firstUpdated()` lifecycle method.
 * 
 * - **`infiniteScroll`**:  
 *   A function or property that detects when the user has scrolled on the component.
 * 
 * - **`slottedSearchStyling`**:  
 *   A string used to style the slotted search input (e.g., `display: flex;`).
 * 
 * - **`selectHandle`**:  
 *   A function that processes the selected handle. It receives the handle object and sends it back to the parent component.
 * 
 * - **`imageUrl`**:
 *  The URL of the image to display for each handle.
 * 
 * ### Example Method:
 * 
 * ```js
 * function selectHandle(handle) {
 *   console.log('Selected handle:', handle);
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
    @property({ type: Array }) handleDataArray: any;
    @property({ type: Object }) litElement!: LitElement;
    @property({ type: Boolean }) dropdownOpen = false;
    @property({ type: Boolean }) isLoading = false;
    @property({ type: String }) imageUrl: string;
    @property({ type: String }) imgWidth: string = '';
    @property({ type: String }) imgHeight: string = '';
    @property({ type: String }) slottedSearchStyling: string = '';
    @property({ type: Function }) addFunction = () => { };
    @property({ type: Function }) infiniteScroll = () => { };
    @property({ type: Function }) selectHandle = (handle) => { };

    static styles = SelectImagesStyles

    firstUpdated() {
        this.addFunction();
    }

    renderImages() {
        const handleDataArray = this.handleData || [];
        if (handleDataArray.length === 1) {
            this.imgHeight = '19rem';
            this.imgWidth = '19rem';
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
                    ? html`<img class="handle-img" style="max-width:${this.imgWidth}; max-height:${this.imgHeight}" src="${this.imageUrl}" @load="${() => this.handleDataArray[index].loading = false}" />`
                    : html`< slot name="slottedLoader"></slot>`
                }
                </div>
            </div>
        `;
        })}`;
    }

    render() {
        return html`
            <div class="logout-and-handles">
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
                                        <slot name="slottedSearch"></slot>
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
            </div>
        `;
    }
}