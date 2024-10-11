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
 * - **onConfirm**: (Function|null) A callback function to be called when the confirm button is clicked.
 * - **onCancel**: (Function|null) A callback function to be called when the cancel button is clicked.
 * 
 * ### Example:
 * ```html
 * <main-popup 
 *     .open="true" 
 *     .message="Are you sure?" 
 *     .secondMessage="This action cannot be undone."
 *     .buttonConfirm="Confirm" 
 *     .buttonCancel="Cancel" 
 *     .onConfirm=${() => console.log('Confirmed!')}>
 *     .onCancel=${() => console.log('canceled!')}
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
    @property({ type: Function }) onConfirm: (() => void) | null = null;
    @property({ type: Function }) onCancel: (() => void) | null = null;

    closePopup() {
        this.open = false;
    }

    private handleConfirm() {
        if (this.onConfirm) {
            this.onConfirm();
        }
        this.closePopup();
    }

    private handleCancel() {
        if (this.onCancel) {
            this.onCancel();
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




