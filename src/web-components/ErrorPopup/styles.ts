import { css } from "lit";

export const ErrorPopupStyles = css`
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

        .modal.show {
            display: block;
        }

        .modal-content {
            padding: 0rem 2rem;
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            justify-content: center;
        }

        .modal-header {
            display: flex;
            justify-content: flex-end;
            width: 100%;
            margin-top: 5px;
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
            flex-direction: column;
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
        .clear-error {
            opacity: 1;
            color: rgba(209, 213, 219, 1);
            width: 1.5rem;
            height: auto;
            margin-right: 5px;
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
        .modal-title {
            font-size: 20px;
            color: #fff;
            font-weight: 700;
            margin: 0rem 0rem 1rem 0rem;
        }
        ::slotted([slot="customError"]) {
            font-size: 16px;
            color: #fff;
        }
    `;