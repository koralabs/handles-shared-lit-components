import { css, html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { SelectHandleStyles } from './styles.js';

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
 *   The data for the handles expected in the format [
 *      { name: 'Handle 1', image: 'ipfs://exampleImage1' },
 *      { name: 'Handle 2', image: 'ipfs://exampleImage2' },
 *   ].
 * 
 * - **`onFirstUpdated`**:  
 *   A function called during the `firstUpdated()` lifecycle method.
 * 
 * - **`onScroll`**:  
 *   A function attached to the scroller that detects when the user has scrolled.
 * 
 * - **`slottedButtonsStyling`**:  
 *   A string used to apply custom CSS styling to the slotted buttons.
 * 
 * - **`slottedSearchStyling`**:  
 *   A string used to style the slotted search input.
 * 
 * - **`onSelectHandle`**:  
 *   A function that processes the selected handle. It receives the handle object and sends it back to the parent component.
 * 
 * - **`loadingImg`**:  
 *   A boolean flag indicating whether to display a loading spinner on the selected handle. The loading spinner content must be provided through the `slottedLoader` slot.
 * 
 * - **`imageUrl`**:
 *   The URL of the image to display for the selected handle.
 * 
 * - **`activeHandle`**:
 *   The currently active handle object. expected in the format { name: 'Handle 1', image: 'ipfs://exampleImage1' }.
 * 
 * 
 * ### Example Method:
 * ```js
 * function onSelectHandle(handle) {
 *   this.loadingImg = true;
 *   console.log('Selected handle:', handle);
 *   this.loadingImg = false;
 *   this.handle = handle;
 * }
 * 
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
 * 
 * ```
 * 
 * ### Example Usage:
 * ```html
 * <select-handle
 *   .handleData=${handleData}
 *   .loadingImg=${loadingImg}
 *   .imageUrl=${imageUrl}
 *   .activeHandle=${activeHandle}
 *   .onFirstUpdated=${onFirstUpdated}
 *   .onScroll=${onScroll}
 *   .onSelectHandle=${onSelectHandle}
 *   .slottedButtonsStyling=${'display: flex;'}>
 *      <div slot="slottedSearch">${search}</div>
 *      <div slot="slottedButtons">${buttons}</div>
 * </select-handle>
 * ```
 */

@customElement('select-handle')
export class SelectHandle extends LitElement {
    @property({ type: Array }) handleData: any[] = [];
    @property({ type: Boolean }) loadingImg = false;
    @property({ type: String }) slottedButtonsStyling: string;
    @property({ type: String }) slottedSearchStyling: string;
    @property({ type: String }) imageUrl: string = '';
    @property({ type: Object }) activeHandle: any = {};
    @property({ type: Function }) onFirstUpdated = () => { };
    @property({ type: Function }) onScroll = () => { };
    @property({ type: Function }) onSelectHandle = (handle) => { };

    static styles = SelectHandleStyles

    firstUpdated() {
        this.onFirstUpdated();
    }

    render() {
        const handles = this.handleData;
        return html`
            <div>
                <div class="logout-and-handles">
                    <div class="handles-select-dropdown">
                        <div class="wallet-handles-content">
                            <div class="select-wrapper">
                                <div style=${this.slottedSearchStyling}>
                                    <slot name="slottedSearch"></slot>
                                </div>
                                ${this.activeHandle?.name ? html`
                                    <div class="current-handle">
                                        ${this.loadingImg ? html`<slot name="slottedLoader"></slot>` : html`
                                            <div class="handle-img">
                                                <img src="${this.imageUrl}" />
                                            </div>
                                        `}
                                        <div>
                                            <p class="current-handle-text">
                                                <span class="handle-sign">
                                                    <span class="dollar-sign">$</span>
                                                </span>
                                                <span class="handle-text">${this.activeHandle?.name}</span>
                                            </p>
                                        </div>
                                    </div>
                                ` : ''}
                            </div>
                            <hr class="line-brake" />
                            <div class="scroll-wrapper-outer" @scroll="${this.onScroll}">
                                <div class="scroll-wrapper">
                                    <div class="handles-container">
                                        ${(handles ?? []).map(handle => html`
                                                <li
                                                    @click="${() => this.onSelectHandle({ ...handle })}"
                                                    class="active-handle ${this.activeHandle?.name === handle.name ? 'active' : ''}"
                                                >
                                                    ${this.activeHandle?.name === handle.name && this.loadingImg ? html`
                                                    `: this.activeHandle?.name === handle.name ? html`
                                                            <div class="handle-img">
                                                                <img src="${this.imageUrl}" />
                                                            </div>
                                                        `: ''}
                                                    <div>
                                                        <p class="handle-wrapper">
                                                            <span class="handle-sign">
                                                                <span class="dollar-sign">$</span>
                                                            </span>
                                                            <span class="handle-text">${handle.name}</span>
                                                        </p>
                                                    </div>
                                                </li>
                                            `)}
                                        ${this.loadingImg ? html`<slot name="slottedLoader"></slot>` : ''}
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
