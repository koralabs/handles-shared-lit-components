import { LitElement, html, css, } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { CustomCheckBoxStyles } from './styles.js';


/**
 * `CustomCheckBox` Component Usage Guide
 * 
 * This component provides a customizable checkbox element. 
 * It supports various states such as checked, small size, and disabled.
 * 
 * ### Properties:
 * - **checked**: (Boolean) Indicates whether the checkbox is checked.
 * - **smallCheckbox**: (Boolean) Determines if the checkbox should be rendered in a smaller size.
 * - **disabled**: (Boolean) Disables the checkbox, preventing user interaction.
 * 
 * ### Example Usage:
 * 
 * 1) Basic usage of the component:
 *    ```html
 *    <custom-checkbox></custom-checkbox>
 *    ```
 * 
 * 2) Using the component with properties:
 *    ```html
 *    <custom-checkbox checked=${'true'} smallCheckbox=${'false'} ></custom-checkbox>
 *    ```
 */
@customElement('custom-checkbox')

export class CustomCheckBox extends LitElement {
    @property({ type: Boolean }) checked = false;
    @property({ type: Boolean }) smallCheckbox = false;
    @property({ type: Boolean }) disabled = false;


    static styles = CustomCheckBoxStyles

    render() {
        return html`
            <div class="checkbox ${this.checked ? 'checked' : ''} ${this.smallCheckbox ? 'small' : ''} ${this.disabled ? 'disabled' : ''}">
                <svg width="13" height="11" viewBox="0 0 13 11" fill="none" display=" ${this.checked ? 'flex' : 'none'}" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10.5541 0.671121C10.9124 0.250902 11.4935 0.250902 11.8519 0.671121C12.2102 1.09134 12.2102 1.77265 11.8519 2.19287L5.42951 9.72345C5.24868 9.93548 5.01116 10.0405 4.77416 10.0386C4.53591 10.0417 4.29683 9.93664 4.11505 9.72349L1.14867 6.24524C0.790288 5.82502 0.790288 5.14371 1.14867 4.72349C1.50704 4.30327 2.08809 4.30327 2.44647 4.72349L4.77226 7.45061L10.5541 0.671121Z" class="check ${this.disabled ? 'disabled' : ''} "/>
                </svg>
            </div>
        `;
    }
}

