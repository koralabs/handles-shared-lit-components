import { html, css, LitElement } from 'lit';

export class SharedButtonBase extends LitElement {
    static renderTag = () => html`<shared-button></shared-button>`;
    static commonStyles = css`
        .shared-button {
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
        return html`
            <button class="shared-button ${this.buttonClass}">
                <slot></slot>
            </button>
        `;
    }
}

export class SharedButtonSmall extends SharedButtonBase {
    static renderTag = () => html`<shared-button-small></shared-button-small>`;

    static styles = [
        SharedButtonBase.commonStyles,
        css`
            .shared-button {
                font-size: 12px;
                padding: 10px 16px;
            }
        `
    ];
}

export class SharedButtonMedium extends SharedButtonBase {
    static renderTag = () => html`<shared-button-medium></shared-button-medium>`;

    static styles = [
        SharedButtonBase.commonStyles,
        css`
            .shared-button {
                font-size: 14px;
                padding: 11px 20px;
            }
        `
    ];
}

export class SharedButtonLarge extends SharedButtonBase {
    static renderTag = () => html`<shared-button-large></shared-button-large>`;

    static styles = [
        SharedButtonBase.commonStyles,
        css`
            .shared-button {
                font-size: 16px;
                padding: 12px 24px;
            }
        `
    ];
}

customElements.define('shared-button-small', SharedButtonSmall);
customElements.define('shared-button-medium', SharedButtonMedium);
customElements.define('shared-button-large', SharedButtonLarge);
