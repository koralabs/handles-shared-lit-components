import { css } from 'lit';

export const CustomCheckBoxStyles = css`
    .checkbox {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 20px;
        height: 20px;
        border: 1px solid rgba(157, 159, 177, 1);
        background-color: rgba(255, 255, 255, 0.05);
        border-radius: 2px;
        cursor: pointer;
    }

    .checkbox.small {
        width: 16px;
        height: 16px;
        border: 1px solid rgba(157, 159, 177, 1);
        background-color: rgba(255, 255, 255, 0.05);
        
    }

    .checkbox.small.disabled {
        border: 1px solid rgba(108, 110, 137, 1);
        background-color: rgba(206, 207, 216, 1);
        cursor: not-allowed;
    }

    .checkbox.disabled {
        border: 1px solid rgba(108, 110, 137, 1);
        background-color: rgba(206, 207, 216, 1);
        cursor: not-allowed;
    }

    .checkbox:hover {
        background-color: rgba(255, 255, 255, 0.15);
        border: 1px solid rgba(206, 207, 216, 1);
    }
    .checkbox:hover.disabled {
        border: 1px solid rgba(108, 110, 137, 1);
        background-color: rgba(206, 207, 216, 1);
        cursor: not-allowed;
    }

    .checkbox.checked {
        background-color: rgba(13, 221, 96, 1);
        border: 1px solid rgba(13, 221, 96, 1);
    }
    .checkbox.checked.disabled {
        border: 1px solid rgba(108, 110, 137, 1);
        background-color: rgba(206, 207, 216, 1);
    }

    .check {
        fill: rgba(255, 255, 255, 1);
    }

    .check.disabled {
        fill: rgba(83, 86, 118, 1);
    }

`;