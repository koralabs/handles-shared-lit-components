import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
/**
 * `MainPopup` is a custom popup component for displaying messages and handling user actions.
 * 
 * ### Properties:
 * - **open**: (boolean) Indicates whether the popup is open or closed.
 * - **message**: (string) The primary message to display in the popup.
 * - **secondMessage**: (string) The secondary message to display in the popup.
 * - **buttonConfirm**: (string) The label for the confirm button.
 * - **buttonCancel**: (string) The label for the cancel button.
 * - **confirmCallback**: (Function|null) A callback function to be called when the confirm button is clicked.
 * 
 * ### Example:
 * ```html
 * <main-popup 
 *     open="true" 
 *     message="Are you sure?" 
 *     secondMessage="This action cannot be undone."
 *     buttonConfirm="Confirm" 
 *     buttonCancel="Cancel" 
 *     .confirmCallback=${() => console.log('Confirmed!')}>
 * </main-popup>
 * ```
 */
@customElement('main-popup')
export class MainPopup extends LitElement {
    static styles = css`
    .modal {
        display: none;
    }
    .modal.show {
        display: block;
    }
    .popup-overlay {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: rgba(0, 0, 0, 0.5);
        backdrop-filter: blur(10px);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 1000;
    }

    .popup-content {
        display: flex;
        flex-direction: column;
        background-color: #1c2541;        
        padding: 20px;
        border-radius: 8px;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        color: rgb(255, 255, 255);
        text-align: center;
    }
    .popup-text {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
    }
    .popup-text-wrapper{
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        font-size: 16px;
        max-width: 350px;
    }

    .popup-actions {
        display: flex;
        margin-top: 20px;
        justify-content: center;
    }
    .lit-button {
        margin: 0 10px;
    }
    .popup-actions button {
        margin: 0 10px;
        padding: 8px 16px;
        cursor: pointer;
        border: none;
        border-radius: 4px;
        background-color: #007bff;
        color: white;
    }

    .popup-actions button:hover {
        background-color: #0056b3;
    }

    .popup-actions button:nth-child(2) {
        background-color: #6c757d;
    }

    .popup-actions button:nth-child(2):hover {
        background-color: #5a6268;
    }
    `;
    @property({ type: Boolean }) open = false;
    @property({ type: String }) message = '';
    @property({ type: String }) secondMessage = '';
    @property({ type: String }) buttonConfirm = '';
    @property({ type: String }) buttonCancel = '';
    @property({ type: Function }) confirmCallback: (() => void) | null = null;

    closePopup() {
        this.open = false;
    }

    openPopup(message: string, secondMessage: string, buttonConfirm: string = 'Confirm', buttonCancel: string = 'Cancel', confirmCallback?: () => void) {
        this.message = message;
        this.secondMessage = secondMessage;
        this.buttonConfirm = buttonConfirm;
        this.buttonCancel = buttonCancel;
        this.confirmCallback = confirmCallback || null;
        this.open = true;
    }

    render() {
        return html`
            <div class="modal ${this.open ? 'show' : ''}">
                <div class="popup-overlay">
                    <div class="popup-content">
                        <div class="popup-text-wrapper">
                            <div class="popup-text">${this.message}</div>
                            <div class="popup-text">${this.secondMessage}</div>
                        </div>
                        <div class="popup-actions">
                            <lit-button-small .buttonColor=${'rgba(157, 159, 177, 1)'} @click=${this.closePopup} class="lit-button">
                                <div slot="button">${this.buttonCancel}</div>
                            </lit-button-small>
                            <lit-button-small .buttonColor=${'rgba(13, 221, 96, 1)'} @click=${this.handleConfirm} class="lit-button" >
                                <div slot="button">${this.buttonConfirm}</div>
                            </lit-button-small>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    private handleConfirm() {
        if (this.confirmCallback) {
            this.confirmCallback();
        }
        this.closePopup();
    }
}




