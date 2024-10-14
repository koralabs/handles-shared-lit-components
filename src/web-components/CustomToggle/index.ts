import { LitElement, html, css } from "lit";
import { customElement, property } from 'lit/decorators.js';
import { CustomToggleStyles } from "./styles";

/**
 * `custom-toggle` Component Usage Guide
 * 
 * This component allows you to toggle the active state by passing the `isActive` property.
 * 
 * ### Properties:
 * - **isActive**: (Boolean) A flag to toggle the active state of the component.
 * 
 * ### Example Usage:
 * 
 * ```html
 * <custom-toggle isActive="${true}"></custom-toggle>
 * ```
 * ```html
 * const handleEvent = (event: Event) => {
 *  const toggleElement = event.currentTarget as CustomToggle;
 *  isActive = !isActive;
 *  toggleElement.isActive = isActive; // Set the reactive property on the custom element
 * };
 * ```
 * 
 */

@customElement('custom-toggle')
export class CustomToggle extends LitElement {
    @property({ type: Boolean }) isActive = false;
    @property({ type: Boolean }) smallToggle = false;
    static styles = CustomToggleStyles;

    render() {
        const fillColor = this.isActive ? 'rgba(77, 166, 255, 0.15)' : 'rgba(255, 255, 255, 0.1)';
        const circleCX = this.isActive ? '60' : '35';

        return html`
            <div class="line ${this.isActive ? 'toggled' : ''} ${this.smallToggle ? 'small' : ''}">
                <div class="circle ${this.isActive ? 'toggled' : ''} ${this.smallToggle ? 'small' : ''}"></div>
            </div>
        `;
    }
}
