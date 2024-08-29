import { LitElement, css, html } from 'lit';

export class StateExample extends LitElement {
    declare name: string;
    declare clickNum: number;

    static properties = {
        name: { type: String },
        clickNum: {
            type: Number,
            state: true
        }
    };

    static styles = css`
        :host {
            color: blue;
        }
    `;

    constructor() {
        super();
        this.name = '';
        this.clickNum = 0;
    }

    handleClick() {
        this.clickNum += 1;
        this.dispatchEvent(
            new CustomEvent('handleClick', {
                detail: {
                    clickNum: this.clickNum
                }
            })
        );
    }

    // Render the UI as a function of component state
    render() {
        return html` <p>${this.name} <button @click=${this.handleClick}>${this.clickNum}</button></p> `;
    }
}

customElements.define('state-example', StateExample);
