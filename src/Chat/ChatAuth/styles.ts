import { css } from 'lit'

export const ChatAuthStyles = css`
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
`