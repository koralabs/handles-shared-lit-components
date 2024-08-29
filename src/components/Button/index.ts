import { html, css, LitElement } from 'lit';

export class LitButtonBase extends LitElement {
  static renderTag = () => html`<lit-button></lit-button>`;
  static commonStyles = css`
    .storybook-button {
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
      <button class="storybook-button ${this.buttonClass}">
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
      .storybook-button {
        font-size: 12px;
        padding: 10px 16px;
      }
    `,
  ];
}

export class LitButtonMedium extends LitButtonBase {
  static renderTag = () => html`<lit-button-medium></lit-button>`;

  static styles = [
    LitButtonBase.commonStyles,
    css`
      .storybook-button {
        font-size: 14px;
        padding: 11px 20px;
      }
    `,
  ];
}

export class LitButtonLarge extends LitButtonBase {
  static renderTag = () => html`<lit-button-large></lit-button-large>`;

  static styles = [
    LitButtonBase.commonStyles,
    css`
      .storybook-button {
        font-size: 16px;
        padding: 12px 24px;
      }
    `,
  ];
}

customElements.define('lit-button-small', LitButtonSmall);
customElements.define('lit-button-medium', LitButtonMedium);
customElements.define('lit-button-large', LitButtonLarge);
