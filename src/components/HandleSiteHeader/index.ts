import { LitElement, css, html } from 'lit';
import { global as globalThis } from '@storybook/global';

export class HandleSiteHeader extends LitElement {
    declare name: string;

    static properties = {
        name: { type: String }
    };

    static styles = css`
        :host {
            color: blue;
        }
    `;

    constructor() {
        super();
        this.name = 'World';
    }

    // Render the UI as a function of component state
    render() {
        return html`<p>Hello, ${this.name}</p>`;
    }
}

customElements.define('handle-site-header', HandleSiteHeader);
