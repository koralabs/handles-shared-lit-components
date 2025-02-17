import { LitElement, html } from 'lit-element';
import { customElement, property, state } from 'lit/decorators.js';
import { DropdownButtonStyles } from './styles.js';

/**
 * `DropdownButton` is a custom LitElement component that provides a dropdown.
 * 
 * ### Usage
 * 
 * You can customize the dropdown behavior and appearance using the following properties:
 * 
 * 1. **Slotted elements**:
 *    - Slot the dropdown content using:
 *      ```html
 *      <div slot="slottedDropdown"></div>
 *      ```
 * 
 * 2. **Properties**:
 *    - `dropdownPositioning`: A string to set the CSS positioning for the dropdown (e.g., `'display: flex; position: relative;'`).
 *    - `dropdownHandle`: The handle selected, which is passed to the component for display.
 * 
 * 3. **Methods**:
 *  - `onClick`: A function to execute on button click.
 * 
 * ### Example usage:
 * ```html
 * <dropdown-button 
 *   .dropdownPositioning=${'display: flex; position: relative;'} 
 *   .dropdownHandle=${this.handle}>
 *   <div slot="slottedDropdown"></div>
 * </dropdown-button>
 * ```
 */

@customElement('dropdown-button')
export class DropdownButton extends LitElement {
    @state() dropdownOpen = false;

    @property({ type: String }) dropdownHandle: string = '';
    @property({ type: String }) dropdownPositioning: string = '';

    static styles = DropdownButtonStyles;

    toggleDropdown() {
        this.dropdownOpen = !this.dropdownOpen;
    }

    render() {
        return html`
            <button class="handles-select-btn">
                <div class="handles-select-wrapper" @click="${this.toggleDropdown}">
                    <svg class="svg-styling" xmlns="http://www.w3.org/2000/svg" width="75" height="75" viewBox="0 0 22 49">
                        <path id="logo_S" data-name="logo S" d="M6.847,2.28q0-.819,1.269-1.531A6.543,6.543,0,0,1,11.458,0q1.6,0,2.071.713a1.691,1.691,0,0,1,.333.926V2.707a11.626,11.626,0,0,1,5.245,1.5c.4.284.6.558.6.818a10.97,10.97,0,0,1-.835,3.988q-.8,2.137-1.568,2.138a4.05,4.05,0,0,1-.869-.321A9.124,9.124,0,0,0,12.76,9.793a4.669,4.669,0,0,0-1.97.284.954.954,0,0,0-.5.891c0,.38.246.678.735.891a10.607,10.607,0,0,0,1.8.569,12.063,12.063,0,0,1,2.372.749,13.116,13.116,0,0,1,2.4,1.281A5.632,5.632,0,0,1,19.442,16.7a6.6,6.6,0,0,1,.735,2.991,10.022,10.022,0,0,1-.268,2.528,7.742,7.742,0,0,1-.936,2.065A5.961,5.961,0,0,1,17,26.206a9.615,9.615,0,0,1-3.141,1.212v.569q0,.819-1.269,1.531a6.531,6.531,0,0,1-3.34.747q-1.6,0-2.071-.711a1.7,1.7,0,0,1-.335-.926V27.56a21.3,21.3,0,0,1-3.775-.676Q0,25.995,0,24.961a16.977,16.977,0,0,1,.534-4.13q.535-2.172,1.269-2.173.133,0,2.772.962a12.92,12.92,0,0,0,3.976.962,3.425,3.425,0,0,0,1.736-.284,1.077,1.077,0,0,0,.4-.891c0-.38-.246-.7-.735-.962a6.491,6.491,0,0,0-1.838-.676A15.515,15.515,0,0,1,3.34,15.74a5.472,5.472,0,0,1-1.836-2.1A6.823,6.823,0,0,1,.768,10.4q0-6.553,6.079-7.655Z" transform="translate(0 9.487)" fill="#0cd15b"></path>
                    </svg>
                    <div class="handle-and-icon">
                        <div class="handle-text">Choose Handle</div>
                        <svg class="arrow ${this.dropdownOpen ? 'open' : ''}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <polyline points="6 9 12 15 18 9"></polyline>
                        </svg>
                    </div>
                </div>
                <div style="${this.dropdownOpen ? this.dropdownPositioning : 'display: none;'}">
                    <slot name="slottedDropdown"></slot>
                </div>
            </button>
        `;
    }
}