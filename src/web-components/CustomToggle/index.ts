import { LitElement, html, css } from "lit";
import { customElement, property, state } from 'lit/decorators.js';

@customElement('custom-toggle')
export class CustomToggle extends LitElement {
    @state() isActive = Boolean;
    @property({ type: String }) help = '';

    firstUpdated() {
        this.helpLogger();
    }

    helpLogger() {
        if (this.help === 'help') {
            console.info(`
                can pass the isActive property to the component to toggle the active state.

                Example usage:
                    <custom-select isActive=\${'true'}></custom-select>
        `);
        }
    }

    render() {
        const fillColor = this.isActive ? 'rgba(77, 166, 255, 0.15)' : 'rgba(255, 255, 255, 0.1)';
        const pathData = this.isActive
            ? 'M9 15h60a10 10 0 0 1 10 10v10a10 10 0 0 1-10 10H9a10 10 0 0 1-10-10V25a10 10 0 0 1 10-10z'
            : 'M9 15h60a10 10 0 0 1 10 10v10a10 10 0 0 1-10 10H9a10 10 0 0 1-10-10V25a10 10 0 0 1 10-10z';
        const circleCX = this.isActive ? '60' : '35';

        return html`
            <svg style="width:5.5rem; height: 2.5rem; display: flex; align-items: center;" viewBox="0 0 100 50" xmlns="http://www.w3.org/2000/svg">
                <rect x="30" y="17" width="2.25rem" height=".75rem" rx="5" ry="10" fill="${fillColor}" />
                <circle cx="${circleCX}" cy="23" r=".75rem" fill="white"/>
            </svg>
        `;
    }
}