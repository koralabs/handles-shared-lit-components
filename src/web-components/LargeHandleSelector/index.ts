import { css, html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { LargeHandleSelectorStyles } from './styles.js';
import { WalletHandle } from '../../interfaces/index.js';
/**
 * `large-handle-selector` is a custom LitElement component for selecting wallet handles.
 * 
 * ### Slots:
 * - **`slottedSearch`**: Slot for the search input.
 * - **`slottedLoader`**: Slot for a loading spinner or indicator to display when no handle.image data found.
 * 
 * ### Properties:
 * - **`handleData`**:  
 *   The data for the handle, expected in the format of an array of handle objects.
 * 
 * - **`onFirstUpdated`**:  
 *   A function called during the `firstUpdated()` lifecycle method.
 * 
 * - **`onScroll`**:  
 *   A function or property that detects when the user has scrolled on the component.
 * 
 * - **`slottedSearchStyling`**:  
 *   A string used to inline style the parent div of the slotted search input (e.g., `display: flex;`).
 * 
 * - **`onSelectHandle`**:  
 *   A function that processes the selected handle. It receives the handle object and sends it back to the parent component.
 * 
 * - **`imageUrl`**:
 *  The URL of the image to display for each handle.
 * 
 * ### Example Method:
 * 
 * ```js
 * function onSelectHandle(handle) {
 *   console.log('Selected handle:', handle);
 * }
 * ```
 * ```js
 * onScroll: (event: Event) => {
 *   const mainSection = event.currentTarget as HTMLElement;
 *   const scrollPosition = mainSection.scrollTop + mainSection.clientHeight;
 *   const scrollHeight = mainSection.scrollHeight;
 * 
 *   // Check if scrolled to bottom (or near bottom)
 *   if (scrollPosition >= scrollHeight - 50) {
 *     console.log('Scrolled to bottom');
 *   }
 * },
 * ```
 * 
 * ### Example Usage:
 * ```html
 * <large-handle-selector
 *   .handleData=${handleData}
 *   .onFirstUpdated=${onFirstUpdated}
 *   .onScroll=${onScroll}
 *   .onSelectHandle=${onSelectHandle}
 *   .slottedButtonsStyling=${'display: flex;'}>
 * </large-handle-selector>
 * ```
 */

@customElement('large-handle-selector')
export class LargeHandleSelector extends LitElement {
    @property({ type: Array }) handleData: any[] = [];
    @property({ type: Array }) handleDataArray: any;
    @property({ type: Boolean }) dropdownOpen = false;
    @property({ type: Boolean }) isLoading = false;
    @property({ type: String }) imageUrl: string;
    @property({ type: String }) imgWidth: string = '';
    @property({ type: String }) imgHeight: string = '';
    @property({ type: String }) slottedSearchStyling: string = '';
    @property({ type: Function }) onFirstUpdated = () => { };
    @property({ type: Function }) onScroll = () => { };
    @property({ type: Function }) onSelectHandle = (handle) => { };

    static styles = LargeHandleSelectorStyles

    firstUpdated() {
        this.onFirstUpdated();
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
        return html`${handleDataArray.map((handleData: WalletHandle) => {
            const handle = handleData
            return html`
            <div @click="${() => handle && this.onSelectHandle(handle)}" class="handle-item ${handle?.active ? 'active' : ''}">
                <div >
                    ${handleData.image
                    ? html`<img class="handle-img" style="max-width:${this.imgWidth}; max-height:${this.imgHeight}" src="${handleData.image}" alt="handle image" />`
                    : html`<slot name="slottedLoader"></slot>`
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
                                        <div class="scroll-wrapper" @scroll="${this.onScroll}">
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