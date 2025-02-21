import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { ErrorPopupStyles } from './styles.js';

@customElement('error-popup')
export class ErrorPopup extends LitElement {
    static styles = ErrorPopupStyles
    @property({ type: Boolean }) open = true;
    @property({ type: String }) message = '';
    @property({ type: String }) messageTitle = '';
    @property({ type: Number }) countdown = 5;
    private countdownInterval: number | null = null;
    private maxCountdown: number = 5;
    private isPaused: boolean = false;

    connectedCallback() {
        super.connectedCallback();
        this.addEventListener('mouseenter', this.onMouseEnter);
        this.addEventListener('mouseleave', this.onMouseLeave);
    }

    disconnectedCallback() {
        super.disconnectedCallback();
        this.removeEventListener('mouseenter', this.onMouseEnter);
        this.removeEventListener('mouseleave', this.onMouseLeave);
    }

    firstUpdated() {
        this.startCountdown();
    }

    closePopup() {
        window.dispatchEvent(new CustomEvent('error-popup-closed'));
        this.countdown = this.maxCountdown;
        if (this.countdownInterval) {
            clearInterval(this.countdownInterval);
            this.countdownInterval = null;
        }
    }

    startCountdown() {
        this.countdown = this.maxCountdown;

        if (this.countdownInterval) {
            clearInterval(this.countdownInterval);
        }

        this.countdownInterval = window.setInterval(() => {
            if (!this.isPaused) {
                if (this.countdown > 0) {
                    this.countdown -= 1;
                    this.requestUpdate();
                } else {
                    this.closePopup();
                }
            }
        }, 1000);
    }

    onMouseEnter() {
        this.isPaused = true;
    }

    onMouseLeave() {
        this.isPaused = false;
    }

    render() {
        const fillWidth = ((this.countdown / this.maxCountdown) * 100) + '%';

        return html`
            <div class="modal ${this.open ? 'show' : ''}">
                <div class="modal-wrapper">   
                        <div class="modal-header">                   
                            <svg class="clear-error" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" @click="${this.closePopup}">
                                <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                            </svg>
                        </div>
                    <div class="modal-content">
                        <div class="content-wrapper">
                            <div class="alert-icon">
                                <div class="popup-svg-wrapper">
                                    <svg class="alert-svg" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M464 720a48 48 0 1 0 96 0 48 48 0 1 0-96 0zm16-304v184c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8V416c0-4.4-3.6-8-8-8h-48c-4.4 0-8 3.6-8 8zm475.7 440l-416-720c-6.2-10.7-16.9-16-27.7-16s-21.6 5.3-27.7 16l-416 720C56 877.4 71.4 904 96 904h832c24.6 0 40-26.6 27.7-48zm-783.5-27.9L512 239.9l339.8 588.2H172.2z"></path>
                                    </svg>
                                </div>
                            </div>
                            <div class="text-wrapper">
                                <div class="modal-title">
                                    ${this.messageTitle}
                                </div>
                                <div class="modal-body">
                                    ${this.message}<br>
                                </div>
                            <slot class="model-body" name="customError" ></slot>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="slider-container">
                    <div class="slider-track">
                        <div class="slider-fill" style="width: ${fillWidth}"></div>
                    </div>
                </div>
            </div>
        `;
    }
}