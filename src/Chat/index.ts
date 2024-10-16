import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import './OpenChatButton/index.js'

@customElement('handle-chat')
export class HandleChat extends LitElement {


    render() {
        return html`
        <open-chat style=""></open-chat>
        `
    }
}