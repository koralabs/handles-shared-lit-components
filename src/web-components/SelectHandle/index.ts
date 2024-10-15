import { css, html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { SelectHandleStyles } from './styles';

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
 * - **`imageUrl`**:
 *  The URL of the image to display for the selected handle.
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
    @property({ type: String }) slottedButtonsStyling: string;
    @property({ type: String }) slottedSearchStyling: string;
    @property({ type: String }) imageUrl: string;

    @property({ type: Function }) addFunction = () => { };
    @property({ type: Function }) infiniteScroll = () => { };
    @property({ type: Function }) selectHandle = (handle) => { };
    @property({ type: Object })
    litElement!: LitElement;

    static styles = SelectHandleStyles

    firstUpdated() {
        const handle = localStorage.getItem('selectedHandle');
        this.handle = JSON.parse(handle ?? '{}');
        this.addFunction();
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
                        ? html`<slot name="slottedLoader"></slot>`
                        : html`
                                                        <div class="handle-img">
                                                            <img src="${this.imageUrl}" />
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
                            ? html``
                            : this.handle?.name === handle.name
                                ? html`
                                                              <div class="handle-img">
                                                                  <img src="${this.imageUrl}" />
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
        `;
    }
}