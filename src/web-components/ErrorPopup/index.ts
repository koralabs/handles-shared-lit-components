import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';


@customElement('error-popup')
export class ErrorPopup extends LitElement {
    static styles = css`
        .modal {
            display: none;
            position: fixed;
            top: 30px;
            z-index: 100;
            max-width: auto;
            border: 1px solid #ccc;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            opacity: 1;
            left: 50%;
            transform: translateX(-50%);
            background-color: rgb(10, 14, 59);
            border: 1px solid #e23f5c;
            border-radius: 12px;
            --nth: 1;
            --len: 1;
        }

        .modal-wrapper {
            padding: 20px 20px 0px 20px;
        }

        .modal.show {
            display: block;
        }

        .modal-content {
            padding: 0rem 1rem;
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            justify-content: center;
        }

        .modal-header {
            display: flex;
            justify-content: flex-end;
            width: 100%;
        }

        .modal-body {
            font-size: 16px;
            color: #fff;
            max-width: 350px;
        }

        .modal-footer {
            text-align: center;
        }

        .close-btn {
            background-color: hsla(0, 0%, 100%, .05);
            color: white;
            border: none;
            padding: 5px 10px;
            cursor: pointer;
            border-radius: 15px;
            font-size: medium;
        }

        .popup-svg-wrapper {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 2rem;
            height: 2rem;
            background: rgba(255, 255, 255, 0.07);
            box-shadow: rgba(77, 166, 255, 0.17) 0px 10px 25px, red 0px 19.0421px 95.2103px;
            backdrop-filter: blur(9.52103px);
            border-radius: 9999px;
            margin-right: .75rem;
        }

        .alert-svg {
            stroke: currentColor;
            fill: currentColor;
            stroke-width: 0;
            color: rgba(245, 101, 101, 1);
            width: 1rem;
            height: 1rem;
            display: block;
            vertical-align: middle;
        }

        .text-wrapper {
            display: flex; 
            flex-direction: row;
        }

        .slider-container {
            width: 100%;
            height: 7px;
            background: transparent;
            border-radius: 5px;
            border-top-left-radius: 0px; 
            border-top-right-radius: 0px; 
            border-bottom-left-radius: 10px;  
            border-bottom-right-radius: 10px; 
            position: relative;
            margin-top: 10px;
            overflow: hidden; 
        }

        .slider-track {
            width: 100%;
            height: 100%;
            position: absolute;
            top: 0;
            left: 0;
        }

        .slider-fill {
            height: 100%;
            background: #e74c3c;
            position: absolute;
            top: 0;
            left: 0;
            transition: width 1s linear;
        }
        .clear-search {
            opacity: 1;
            color: rgba(209, 213, 219, 1);
            width: 1.5rem;
            height: auto;
            margin-top: 1px;
            z-index: 20;
            fill: currentColor;
            stroke: currentColor;
            stroke-width: 0;
            cursor: pointer;
        }
        
        .content-wrapper {
            display: flex;
            flex-direction: row;
            justify-content: center;
        }

        .alert-icon {
            display: flex;
        }
    `;
    @property({ type: Boolean }) open = false;
    @property({ type: String }) message = '';
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

    closePopup() {
        this.open = false;
        this.countdown = this.maxCountdown;
        if (this.countdownInterval) {
            clearInterval(this.countdownInterval);
            this.countdownInterval = null;
        }
    }

    openPopup(message: string) {
        this.message = message;
        this.open = true;
        this.startCountdown();
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
                    <div class="modal-content">   
                        <div class="modal-header">                   
                            <svg class="clear-search" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" @click="${this.closePopup}">
                                <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                            </svg>
                        </div>
                        <div class="content-wrapper">
                            <div class="alert-icon">
                                <div class="popup-svg-wrapper">
                                    <svg class="alert-svg" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M464 720a48 48 0 1 0 96 0 48 48 0 1 0-96 0zm16-304v184c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8V416c0-4.4-3.6-8-8-8h-48c-4.4 0-8 3.6-8 8zm475.7 440l-416-720c-6.2-10.7-16.9-16-27.7-16s-21.6 5.3-27.7 16l-416 720C56 877.4 71.4 904 96 904h832c24.6 0 40-26.6 27.7-48zm-783.5-27.9L512 239.9l339.8 588.2H172.2z"></path>
                                    </svg>
                                </div>
                            </div>
                            <div class="text-wrapper">
                                <div class="modal-body">
                                    ${this.message}<br>
                                </div>
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