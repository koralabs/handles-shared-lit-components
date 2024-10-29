import { css } from 'lit'

export const ChatWindowStyles = css`
    .chat-window.open {
        display:flex;
        flex-direction: column;
        height:24rem;
        width: 18rem;
        background-color:rgba(34, 38, 79, 1);
        border-radius: 15px;
        padding:5px;
    }

    .chat-window.closed {
        display:none;
    }

    .chat-header {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: 3rem;
        width:100%;
        border-bottom: 1px solid rgba(83, 86, 118, 1);
    }

    .chats-wrapper {
        margin: 0rem 0.5rem;
    }

    .chat-body {
        height: 100%;
        overflow: unset;
        --scrollbar-track: rgba(255, 255, 255, 0.1);
        --scrollbar-thumb: rgba(112, 184, 255, 1);
        --scrollbar-thumb-radius: 0.25rem;
        overflow-y: scroll;
        margin-bottom: 1rem;
    }

    .chat-body::-webkit-scrollbar {
        width: 5px;
    }

    .chat-body::-webkit-scrollbar-track {
        background: transparent;
    }

    .chat-body::-webkit-scrollbar-thumb {
        background: var(--scrollbar-thumb);
        border-radius: var(--scrollbar-thumb-radius);
    }

    .chat-body::-webkit-scrollbar-thumb:hover {
        background: #555;
    }

    .close-svg {
        position: absolute;
        top: 12px;
        right: 0px;
        opacity: 1;
        color: rgba(209, 213, 219, 1);
        width: 1.5rem;
        height: auto;
        z-index: 20;
        fill: currentColor;
        stroke: currentColor;
        stroke-width: 0;
        cursor: pointer;
    }

    .search-svg {
        opacity: 1;
        color: rgba(209, 213, 219, 1);
        width: 1rem;
        height: 1rem;
        z-index: 20;
        fill: currentColor;
        stroke: currentColor;
        stroke-width: 0;
    }
    
    .chat-input-wrapper {
        background-color:#22264f;
        margin: 0rem;
        position: absolute;
        bottom: 3px;
        width: inherit;
    }
`