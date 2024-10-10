import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { ConfirmPopupStyles } from './styles';
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
@customElement('confirm-popup')
export class ConfirmPopup extends LitElement {
    static styles = ConfirmPopupStyles;
    @property({ type: Boolean }) open = false;
    @property({ type: String }) message = '';
    @property({ type: String }) secondMessage = '';
    @property({ type: String }) buttonConfirm = '';
    @property({ type: String }) buttonCancel = '';
    @property({ type: Function }) confirmCallback: (() => void) | null = null;
    @property({ type: Function }) confirmCancel: (() => void) | null = null;


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
    private handleConfirm() {
        if (this.confirmCallback) {
            this.confirmCallback();
        }
        this.closePopup();
    }
    private handleCancel() {
        if (this.confirmCallback) {
            this.confirmCancel();
        }
        this.closePopup();
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
                            <shared-button-small .buttonColor=${'rgba(157, 159, 177, 1)'} @click=${this.handleCancel} class="lit-button">
                                <div slot="button">${this.buttonCancel}</div>
                            </shared-button-small>
                            <shared-button-small .buttonColor=${'rgba(13, 221, 96, 1)'} @click=${this.handleConfirm} class="lit-button" >
                                <div slot="button">${this.buttonConfirm}</div>
                            </shared-button-small>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

}




