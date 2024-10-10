import { LitElement, html, css } from "lit";
import { customElement, property, state } from 'lit/decorators.js';

/**
 * `custom-select` Component Usage Guide
 * 
 * This component allows you to toggle the active state by passing the `isActive` property.
 * 
 * ### Properties:
 * - **isActive**: (Boolean) A flag to toggle the active state of the component.
 * 
 * ### Example Usage:
 * 
 * ```html
 * <custom-select isActive="${true}"></custom-select>
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

    render() {

        const fillColor = this.isActive ? 'rgba(77, 166, 255, 0.15)' : 'rgba(255, 255, 255, 0.1)';
        const circleCX = this.isActive ? '60' : '35';

        return html`
            <svg style="width:5.5rem; height: 2.5rem; display: flex; align-items: center;" viewBox="0 0 100 50" xmlns="http://www.w3.org/2000/svg">
                <rect x="30" y="17" width="2.25rem" height=".75rem" rx="5" ry="10" fill="${fillColor}" cursor="pointer"/>
                <circle cx="${circleCX}" cy="23" r=".75rem" fill="white" cursor="pointer"/>
            </svg>
        `;
    }
}