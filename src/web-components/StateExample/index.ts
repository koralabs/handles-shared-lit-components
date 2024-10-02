import { css, html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('state-example')
export class StateExample extends LitElement {
    @property({ type: Number })
    count = 0;

    @property()
    title = '';

    render() {
        return html`
            <h2>${this.title}</h2>
            <div>
                The count is 34434:
                <button @click=${() => this.count++}>${this.count}</button>
            </div>
            <slot></slot>
        `;
    }

    static styles = css`
        * {
            color: var(--my-counter-text-color, black);
        }
    `;
}
