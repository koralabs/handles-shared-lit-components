import { css } from "lit";

export const DisconnectWalletButtonStyles = css`
    .disconnect-svg {
        width: 1.75rem;
        height: 1.75rem;
    }
    .icon-wrapper {
        position: relative;
        display: flex;
        flex-direction: column;
        align-content: center;
        justify-content: center;
        align-items: center;
        width: fit-content;
    }

    .anchor-btn-disconnect {
        background-color: hsla(0, 0%, 100%, 0.05);
        border: none;
        width: 35px;
        height: 35px;
        border-radius: 50%;
        cursor: pointer;
        text-align: center;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 5px;
        background-image: var(--icon-url);
        background-size: cover;
        background-position: center;
        transition: background-image 0.3s ease, background-color 0.3s ease;
    }

    .anchor-btn-disconnect:hover {
        background-color: rgba(245, 101, 101, 1);
        background-image: var(--hover-icon-url);
    }

    .anchor-btn-disconnect:hover .tooltip-text {
        visibility: visible;
        opacity: 1;
    }

    .tooltip-text {
        z-index: 1000;
        position: absolute; /* Use absolute positioning relative to the button */
        top: 140%; /* Positioning tooltip below the button */
        visibility: hidden;
        background-color: rgba(97, 97, 97, 0.92);
        border-radius: 4px;
        color: rgb(255, 255, 255);
        font-family: Roboto, Helvetica, Arial, sans-serif;
        padding: 4px 8px;
        font-size: 0.6875rem;
        width: 91px;
        margin: 2px;
        font-weight: 500;
        opacity: 0;
        transition: opacity 0.3s;
    }

    @media (max-width: 500px) {
        .icon-wrapper {
            left: 0;
        }
    }
`;