import { css } from 'lit'

export const FriendlyHandlesStyles = css`
    .logout-and-handles {
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .handles-select-dropdown {
        height: 100%
    }
    .searched-handles{
        height: 100%
    }
    .wallet-handles-content {
        height: 100%
    }

    .current-handle-text .handles-select-dropdown li p {
        overflow: hidden;
        text-overflow: ellipsis;
        font-family: Ubuntu Mono, monospace;
        display: flex;
        text-decoration: none;
    }

    .handles-select-dropdown li {
        overflow: hidden;
        text-overflow: ellipsis;
        display: flex;
        flex-direction: row;
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

    .wallet-handles-content {
        width: 100%;
        margin-top: 0.5rem;
    }

    .select-wrapper {
        display: flex;
        flex-direction: column;
        align-content: center;
        justify-content: center;
        align-items: center;
    }

    .handles-select-wrapper {
        display: flex;
        align-items: center;
        justify-content: space-between;
        transition-property: all;
        transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
        transition-duration: 0.15s;
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

    .current-handle {
        overflow: hidden;
        text-overflow: ellipsis;
        border: 1px solid rgba(74, 222, 128, 1);
        border-radius: 0.5rem;
        display: flex;
        padding: 0.7em 0.5em;
        margin: 0.1em 0;
        text-decoration: none;
        flex-direction: row;
        align-items: center;
        width: -webkit-fill-available;
        margin-top: 5px;
        background-color: hsla(0, 0%, 100%, 0.05);
        border-radius: 0.5em;
    }

    .current-handle-text {
        margin: 0.5rem;
        display: flex;
        flex-direction: row;
        font-family: Ubuntu Mono, monospace;
        align-items: center;
    }

    .handle-img {
        display: flex;
        width: 2rem;
        height: 2rem;
        margin-right: 10px;
    }

    .handle-sign {
        display: flex;
        align-items: center;
        font-family: Ubuntu Mono, monospace;
        fill: rgba(74, 222, 128, 1);
        margin-right: 1px;
    }

    .active-handle.active {
        border: 1px solid rgba(74, 222, 128, 1);
        border-radius: 0.5rem;
    }

    .dollar-sign {
        font-family: Ubuntu Mono, monospace;
        color: rgba(74, 222, 128, 1);
    }

    .line-brake {
        border-color: rgba(58, 80, 107, 1);
        margin: 1rem 0;
        height: 0;
        color: inherit;
        border-top-width: 1px;
    }

    .handles-container {
        display: flex;
        gap: 2px;
        width: 100%;
        position: relative;
        flex-direction: column;
    }

    .active-handle p {
        margin: 0.5rem;
    }

    .handle-wrapper {
        display: flex;
        flex-direction: row;
    }

    .loader {
        height: 5rem;
    }

    .handle-text {
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-family: Ubuntu Mono, monospace;
        color: white;
    }
    .scroll-wrapper-outer {
        margin: 0rem 0.5rem;
        height: 100%;
        overflow: unset;
        --scrollbar-track: rgba(255, 255, 255, 0.1);
        --scrollbar-thumb: rgba(112, 184, 255, 1);
        --scrollbar-thumb-radius: 0.25rem;
        overflow-y: scroll;
        margin-bottom: 1rem;
    }

    .scroll-wrapper-outer::-webkit-scrollbar {
        width: 5px;
    }

    .scroll-wrapper-outer::-webkit-scrollbar-track {
        background: transparent;
    }

    .scroll-wrapper-outer::-webkit-scrollbar-thumb {
        background: var(--scrollbar-thumb);
        border-radius: var(--scrollbar-thumb-radius);
    }

    .scroll-wrapper-outer::-webkit-scrollbar-thumb:hover {
        background: #555;
    }
    .scroll-wrapper {
        margin: 0rem 0.5rem;
    }
    @media screen and (max-width: 350px) {
        .handles-select-dropdown {
            padding-left: 0.25rem;
            padding-right: 0.25rem;
        }

        .route-btn {
            margin-left: 0.25rem;
            margin-right: 0.25rem;
        }

        .search-icon-wrapper {
            left: 20px;
        }

        .clear-search-wrapper {
            right: 20px;
        }
    }

`