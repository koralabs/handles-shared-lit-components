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
    }
    .checkbox.small {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 16px;
        height: 16px;
        border: 1px solid rgba(157, 159, 177, 1);
        background-color: rgba(255, 255, 255, 0.05);
        border-radius: 2px;
    }

    .checkbox:hover {
        background-color: rgba(255, 255, 255, 0.15);
        border: 1px solid rgba(206, 207, 216, 1);
    }

    .checkbox.checked {
        background-color: rgba(13, 221, 96, 1);
        border: 1px solid rgba(13, 221, 96, 1);
    }

    .check {
        fill: rgba(255, 255, 255, 1);
        width: 10px;
        height: 10px;
    }

`;