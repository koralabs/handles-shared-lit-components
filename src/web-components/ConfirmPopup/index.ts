import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { ConfirmPopupStyles } from './styles.js';
import '../Button/index.js';
/**
 * `confirmPopup` is a custom popup component for displaying messages and handling user actions.
 * 
 * ### Properties:
 * - **open**: (boolean) Indicates whether the popup is open or closed.
 * - **message**: (string) The primary message to display in the popup.
 * - **secondMessage**: (string) The secondary message to display in the popup.
 * - **confirmButtonLabel**: (string) The label for the confirm button.
 * - **cancelButtonLabel**: (string) The label for the cancel button.
 * - **onConfirm**: (Function|null) A callback function to be called when the confirm button is clicked.
 * - **onCancel**: (Function|null) A callback function to be called when the cancel button is clicked.
 * 
 * ### Example:
 * ```html
 * <confirm-popup 
 *     .open="true" 
 *     .message="Are you sure?" 
 *     .secondMessage="This action cannot be undone."
 *     .confirmButtonLabel="Confirm" 
 *     .cancelButtonLabel="Cancel" 
 *     .onConfirm=${() => console.log('Confirmed!')}>
 *     .onCancel=${() => console.log('canceled!')}
 * </confirm-popup>
 * ```
 */
@customElement('confirm-popup')
export class ConfirmPopup extends LitElement {
    static styles = ConfirmPopupStyles;
    @property({ type: Boolean }) open = false;
    @property({ type: String }) message = '';
    @property({ type: String }) secondMessage = '';
    @property({ type: String }) confirmButtonLabel = '';
    @property({ type: String }) cancelButtonLabel = '';
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
                                <div slot="shared-button">${this.cancelButtonLabel}</div>
                            </shared-button-small>
                            <shared-button-small .buttonColor=${'rgba(13, 221, 96, 1)'} @click=${this.handleConfirm} class="lit-button" >
                                <div slot="shared-button">${this.confirmButtonLabel}</div>
                            </shared-button-small>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

}




