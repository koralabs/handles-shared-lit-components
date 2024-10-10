import { css } from "lit";

export const SelectHandleStyles = css`
        * {
            color: rgba(255, 255, 255, 1);
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
        }
        .logout-and-handles {
            display: flex;
            justify-content: center;
            align-items: center;
        }
        .current-handle-text .handles-select-dropdown li p {
            overflow: hidden;
            text-overflow: ellipsis;
            font-family: Ubuntu Mono, monospace;
            display: flex;
            text-decoration: none;
        }
        .handles-select-dropdown {
            background: rgb(8, 11, 47);
            list-style: none;
            display: flex;
            align-items: center;
            justify-content: center;
            align-content: center;
            flex-wrap: nowrap;
            flex-direction: column;
            margin-top: 5px;
            padding-top: 1.5rem;
            padding-bottom: 1.5rem;
            padding-left: 1.5rem;
            padding-right: 1.5rem;
            border-color: hsla(0, 0%, 100%, 0.05);
            border-width: 1px;
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
            flex-direction: row;
            align-items: center;
            width: -webkit-fill-available;
            padding-top: 0.75rem;
            padding-bottom: 0.75rem;
            padding-left: 1rem;
            padding-right: 1rem;
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
            padding-left: 1rem;
            padding-top: 0.5rem;
            padding-bottom: 0.5rem;
            padding-right: 1.5rem;
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
        .handle-text {
            font-family: Ubuntu Mono, monospace;
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
            margin-top: 1rem;
            margin-bottom: 1rem;
            height: 0;
            color: inherit;
            border-top-width: 1px;
        }
        .scroll-wrapper {
            height: auto;
            overflow: unset;
        }
        .scroll-wrapper-outer {
            max-height: 24rem;
            width: 100%;
            --scrollbar-track: hsla(0, 0%, 100%, 0.1);
            --scrollbar-thumb: #70b8ff;
            --scrollbar-thumb-radius: 0.25rem;
            --scrollbar-width: 0.25rem;
            scrollbar-width: auto;
            scrollbar-color: initial initial;
            scrollbar-color: var(--scrollbar-thumb, initial) var(--scrollbar-track, initial);
            overflow-y: scroll;
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
    `;