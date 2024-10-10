import { html, css, LitElement } from 'lit';
import { property } from 'lit/decorators.js';

export class LitButtonBase extends LitElement {
    @property({ type: String }) buttonColor: string | '#3d85cc' | undefined;
    @property({ type: String }) textColor: string | '#3d85cc' | undefined;

    static commonStyles = css`
        .lit-button {
            font-family: 'Nunito Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
            font-weight: 700;
            border: 0;
            border-radius: 3em;
            cursor: pointer;
            display: inline-block;
            line-height: 1;
            text-align: center;
        }
    `;
    buttonClass: unknown;

    render() {
        console.log(this.buttonColor);
        console.log(this.textColor);
        return html`
            <button class="lit-button ${this.buttonClass}" style="background-color: ${this.buttonColor}; color:${this.textColor};">
                <slot></slot>
            </button>
        `;
    }
}

export class LitButtonSmall extends LitButtonBase {
    static renderTag = () => html`<lit-button-small></lit-button-small>`;

    static styles = [
        LitButtonBase.commonStyles,
        css`
            .lit-button {
                font-size: 12px;
                padding: 10px 16px;
            }
        `
    ];
}

export class LitButtonMedium extends LitButtonBase {
    static renderTag = () => html`<lit-button-medium></lit-button-medium>`;

    static styles = [
        LitButtonBase.commonStyles,
        css`
            .lit-button {
                font-size: 14px;
                padding: 11px 20px;
            }
        `
    ];
}

export class LitButtonLarge extends LitButtonBase {
    static renderTag = () => html`<lit-button-large></lit-button-large>`;

    static styles = [
        LitButtonBase.commonStyles,
        css`
            .lit-button {
                font-size: 16px;
                padding: 12px 24px;
            }
        `
    ];
}

customElements.define('lit-button-small', LitButtonSmall);
customElements.define('lit-button-medium', LitButtonMedium);
customElements.define('lit-button-large', LitButtonLarge);
