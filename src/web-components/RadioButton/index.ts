import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { RadioButtonStyles } from './styles.js';

@customElement('radio-button')
export class RadioButton extends LitElement {
    @property({ type: Boolean }) isSelected = true;
    @property({ type: Boolean }) isSmall = true;

    static styles = RadioButtonStyles;

    render() {
        return html`
        <div class="${this.isSelected ? 'selected-div' : 'unselected-div'} ${this.isSmall ? 'small' : ''}">
                <div class="${this.isSelected ? 'inner-selected-div' : 'inner-unselected-div'} ${this.isSmall ? 'small' : ''}">
                </div>
            </div>
        `;
    }
}