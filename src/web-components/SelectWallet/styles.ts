import { css } from "lit";

export const SelectWalletStyles = css`
    * {
        font-family:
        Syne,
        Noto Sans,
        ui-sans-serif,
        system-ui,
        -apple-system,
        Segoe UI,
        Roboto,
        Ubuntu,
        Cantarell,
        sans-serif,
        BlinkMacSystemFont,
        Helvetica Neue,
        Arial;
        color: rgba(255, 255, 255, 1);
    }

    .login-container {
        max-width: 42rem;
        margin: auto;
        padding: 1rem;
    }

    .login-body {
        padding: 1rem;
        margin-left: 2rem;
        margin-right: 2rem;
        margin-top: 1rem;
        border-radius: 1.5rem;
        background-color: hsla(0, 0%, 100%, 0.1);
    }

    .login-content {
        padding: 1rem;
        background-color: rgba(10, 14, 59, 1);
        border-radius: 0.75rem;
    }

    .login-header {
        text-align: center;
        margin-bottom: 1rem;
    }

    .header-text {
        margin-top: 0rem;
        font-size: 1.875rem;
        line-height: 2.25rem;
        margin-bottom: 0;
    }

    .wallets-container {
        padding-top: 0.25rem;
        padding-bottom: 1rem;
        padding-left: 1rem;
        padding-right: 1rem;
        overflow-y: scroll;
        max-height: 18rem;
        position: relative;
    }

    .wallets-container::-webkit-scrollbar {
        width: 0.25rem;
    }

    .wallets-container::-webkit-scrollbar-track {
        background: hsla(0, 0%, 100%, 0.1);
    }

    .wallets-container::-webkit-scrollbar-thumb {
        background: #70b8ff;
        border-radius: 0.25rem;
    }

    .wallets-container {
        scrollbar-width: auto;
        scrollbar-color: #70b8ff hsla(0, 0%, 100%, 0.1);
    }

    .wallet-item:hover {
        opacity: 1;
    }

    .wallet-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-radius: 8px;
        cursor: pointer;
        opacity: 0.8;
        transition: all 0.2s;
    }

    .relative {
        padding-top: 0.75rem;
        width: 100%;
        position: relative;
    }

    .wallets-active-border {
        transition: 0.2s;
        box-shadow: none;
        opacity: 1;
        padding: 1.25rem;
        background-color: hsla(0, 0%, 100%, 0.05);
        border-radius: 0.75rem;
        justify-content: space-between;
        align-items: center;
        flex-direction: row;
        cursor: pointer;
        display: flex;
        position: relative;
    }

    .wallets-active-border.active {
        transition-property: all;
        transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
        transition-duration: 0.15s;
        opacity: 1;
        border: 1px solid rgba(74, 222, 128, 1);
        border-width: 1px;
        border-radius: 0.75rem;
        box-shadow: green 0px 0px 12px;
    }

    .wallets-active-border.inactive {
        box-shadow: none;
    }

    .wallet-name-wrapper {
        display: flex;
        flex-direction: row;
        align-items: center;
    }

    .icon-wrapper {
        padding: 0.25rem;
        background-color: rgba(255, 255, 255, 1);
        border-radius: 0.25rem;
        width: 1.75rem;
        height: 1.75rem;
    }

    .wallet-name {
        transition-property: color, background-color, border-color, text-decoration-color, fill, stroke;
        transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
        transition-duration: 0.15s;
        color: rgba(255, 255, 255, 1);
        margin-left: 0.5rem;
        margin-bottom: 0;
        margin-bottom: 1rem;
        margin: 0;
    }

    .wallet-name {
        margin-left: 8px;
        color: var(--text-gray-400);
    }

    .wallet-name.selected {
        color: white;
    }

    .selected-div {
        display: flex;
        background-color: rgba(34, 197, 94, 1);
        justify-content: center;
        align-items: center;
        border-radius: 9999px;
        box-shadow: green 0px 0px 8px;
        border: 1px solid rgba(156, 163, 175, 1);
        fill: rgba(34, 197, 94, 1);
        width: 1.25rem;
        height: 1.25rem;
    }

    .inner-selected-div {
        border-radius: 9999px;
        box-shadow: green 0px 0px 8px;
        background: white;
        width: 0.75rem;
        height: 0.75rem;
    }

    .unselected-div {
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 9999px;
        border: 1px solid rgba(156, 163, 175, 1);
        width: 1.25rem;
        height: 1.25rem;
    }

    .inner-unselected-div {
        border-radius: 9999px;
        width: 0.5rem;
        height: 0.5rem;
    }

    @media (min-width: 400px) {
        .login-body {
            padding: 2rem;
        }

        .login-content {
            padding: 4rem;
        }
    }

    @media (max-width: 580px) {
        .login-container {
            padding: 0rem;
        }

        .login-body {
            padding: 0.5rem;
            margin-left: 0.5rem;
            margin-right: 0.5rem;
            margin-top: 0.5rem;
        }

        .login-content {
            padding: 0.5rem;
        }
    }

    @media (max-width: 300px) {
        .icon-wrapper {
            height: 1rem;
            width: 1rem;
            padding: 0.1rem;
            display: flex;
        }
    }
`;