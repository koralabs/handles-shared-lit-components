import { css } from "lit";

export const SelectImagesStyles = css`
    .login-container {
        max-width: 45rem;
        width: 100%;
        margin: auto;
        padding: 1rem;
    }

    .login-body {
        padding: 1rem;
        margin: 1rem 2rem 0;
        border-radius: 1.5rem;
        background-color: hsla(0, 0%, 100%, 0.1);
    }

    .login-content {
        padding: 1rem;
        background-color: rgba(10, 14, 59, 1);
        border: 1px solid rgba(46, 100, 153, 1);
        border-radius: 0.75rem;
    }

    .login-content-header {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-bottom: 1rem;
    }

    .login-content-header-title {
        margin-top: 2rem;
        font-size: 1.5rem;
        color: white;
    }

    * {
        font-family: Syne, Noto Sans, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Ubuntu, Cantarell, sans-serif, BlinkMacSystemFont, Helvetica Neue, Arial;
    }

    .handles-select-btn {
        border: none;
        fill: rgb(12, 209, 91);
        background: none;
        color: rgb(255, 255, 255);
        border-radius: 0.25rem;
        padding: 0.5rem 0 0.5rem 1rem;
        cursor: pointer;
        text-align: center;
        text-decoration: none;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1rem;
    }

    .handles-select-dropdown {
        background: rgb(8, 11, 47);
        list-style: none;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        margin-top: 5px;
        padding: 1.5rem;
        border: 1px solid hsla(0, 0%, 100%, 0.05);
        border-radius: 0.75rem;
        max-width: 250px;
        width: 100%;
        z-index: 10;
        transition: all 0.3s ease;
    }

    .handles-select-dropdown li {
        overflow: hidden;
        text-overflow: ellipsis;
        display: flex;
        align-items: center;
        width: -webkit-fill-available;
        padding: 0.75rem 1rem;
        margin-top: 5px;
        background-color: hsla(0, 0%, 100%, 0.05);
        border-radius: 0.5em;
    }

    .handles-select-dropdown li:hover {
        opacity: 0.7;
    }

    .active-handle p {
        margin: 0.5rem;
    }

    .active-handle.active {
        border: 1px solid rgba(74, 222, 128, 1);
        border-radius: 0.5rem;
    }

    .handle-sign {
        display: flex;
        align-items: center;
        font-family: Ubuntu Mono, monospace;
        fill: rgba(74, 222, 128, 1);
        margin-right: 1px;
    }

    .svg-styling {
        height: 25px;
        width: 25px;
    }

    .app-icon {
        border-radius: 50%;
        background: gray;
        height: 30px;
        width: 30px;
        fill: rgb(12, 209, 91);
        cursor: pointer;
    }

    .button-content {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 10px;
    }

    .handle-img {
        display: flex;
        width: 100%;
        height: 100%;
    }

    .appIcon {
        cursor: pointer;
    }

    .logout-and-handles {
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .handles-select-wrapper {
        display: flex;
        align-items: center;
        justify-content: space-between;
        transition: all 0.15s cubic-bezier(0.4, 0, 0.2, 1);
        color: rgba(107, 114, 128, 1);
        font-weight: 700;
        text-align: center;
        padding: 0.5rem 1.5rem 0.5rem 1rem;
        background-color: hsla(0, 0%, 100%, 0.05);
        border-radius: 1.5rem;
        cursor: pointer;
        width: 100%;
        margin: 0;
        position: relative;
    }

    .handle-and-icon {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .wallet-handles-content {
        width: 100%;
        margin-top: 0.5rem;
    }

    .scroll-wrapper {
        height: 23rem;
        overflow: unset;
        --scrollbar-track: rgba(255, 255, 255, 0.1);
        --scrollbar-thumb: rgba(112, 184, 255, 1);
        --scrollbar-thumb-radius: 0.25rem;
        overflow-y: scroll;
    }

    .scroll-wrapper-outer {
        position: relative;
        width: 100%;
    }

    .scroll-wrapper::-webkit-scrollbar {
        width: 5px;
    }

    .scroll-wrapper::-webkit-scrollbar-track {
        background: transparent;
    }

    .scroll-wrapper::-webkit-scrollbar-thumb {
        background: var(--scrollbar-thumb);
        border-radius: var(--scrollbar-thumb-radius);
    }

    .scroll-wrapper::-webkit-scrollbar-thumb:hover {
        background: #555;
    }

    .handles-container {
        margin: 1.25rem 0;
        display: flex;
        gap: 16px;
        width: 100%;
        position: relative;
        flex-wrap: wrap;
        justify-content: center;
    }

    .handle-item {
        padding: 12px;
        border-radius: 12px;
        background-color: rgba(255, 255, 255, 0.05);
        cursor: pointer;
    }

    .handle-item.active {
        background: rgba(8, 11, 47, 1);
        border: 1px solid rgba(13, 221, 96, 1);
        backdrop-filter: blur(19.04205322265625px);
    }

    .handle-item:hover {
        box-shadow: 0px 19.04px 95.21px 0px rgba(22, 7, 47, 0.5), 0px 0px 30px 0px rgba(13, 229, 100, 0.35);
        border: 1px solid rgba(13, 221, 96, 1);
        padding: 11px;
    }

    .route-btns-container {
        padding: 1rem 0.5rem 0;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .route-btn {
        padding: 0.5rem 0.25rem;
        margin: 0 1rem;
        background-color: hsla(0, 0%, 100%, 0.05);
        border: 1px solid rgba(28, 37, 65, 1);
        border-radius: 0.75rem;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1);
        color: inherit;
        text-decoration: inherit;
        font-size: 1rem;
        text-align: center;
        transition: all 0.3s ease;
    }

    .route-btn.disabled {
        color: #a9a9a9;
        pointer-events: none;
    }

    .route-btn.active {
        background-color: rgba(13, 221, 96, 1);
        cursor: pointer;
    }

    .line-brake {
        border-color: rgba(58, 80, 107, 1);
        margin: 1rem 0;
        height: 0;
        border-top-width: 1px;
    }

    .scope-icon {
        display: flex;
        align-items: center;
    }

    .scope-text {
        margin-bottom: 4px;
    }

    .scope-field-input {
        max-height: 300px;
        overflow-y: auto;
        padding: 5px;
        border-radius: 7px;
        display: flex;
        flex-direction: column;
    }

    .field-label {
        margin: 0.5rem 0 0.25rem;
    }

    .current-handle {
        overflow: hidden;
        text-overflow: ellipsis;
        border: 1px solid rgba(74, 222, 128, 1);
        border-radius: 0.5rem;
        display: flex;
        padding: 0.7em 0.5em;
        margin: 0.1em 0 5px;
        text-decoration: none;
        align-items: center;
        width: -webkit-fill-available;
        background-color: hsla(0, 0%, 100%, 0.05);
        border-radius: 0.5em;
    }

    .select-wrapper {
        display: flex;
        flex-direction: column;
        align-content: center;
        justify-content: center;
        align-items: center;
    }

    .handle-wrapper {
        display: flex;
        flex-direction: row;
    }

    .dollar-sign {
        font-family: Ubuntu Mono, monospace;
        color: rgba(74, 222, 128, 1);
    }

    .loading-text {
        font-size: 1rem;
        color: currentColor;
        width: 5rem;
        height: 5rem;
    }

    .loader {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 5rem;
        height: 5rem;
    }

    @media screen and (max-width: 350px) {
        .handles-select-dropdown {
            padding: 0 0.25rem;
        }

        .route-btn {
            margin: 0 0.25rem;
        }
    }

    @media (max-width: 580px) {
        .login-container {
            padding: 0;
        }

        .login-body {
            padding: 0.5rem;
            margin: 0.5rem 0.5rem 0;
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