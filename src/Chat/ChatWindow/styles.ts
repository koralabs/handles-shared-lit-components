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
        display: flex;
        align-items: center;
        justify-content: flex-end;
        height: 3rem;
        width:100%;
        border-bottom: 1px solid rgba(83, 86, 118, 1);
    }

    .chats-wrapper {
        margin: 0rem 0.5rem;
        height: 50rem;
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

    .chat-input-wrapper{
        position: relative;
        height: auto;
        width:100%;
    }
    .close-svg {
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

    .chat-input {
        overflow-y: auto;
        padding: 8px 16px;
        width: -webkit-fill-available;
        border: 1px solid rgba(86, 119, 159, 1);
        border-radius: 9999px;
        background-color: hsla(0, 0%, 100%, .05);
        color: rgba(255, 255, 255, 1);
        font-size: 1rem;
        line-height: 1.5rem;
        -webkit-appearance: none;
        -moz-appearance: none;
        appearance: none;
        --tw-shadow: 0 0 transparent;
    }

    .chat-input:focus {
        outline: none; 
        padding:7px 16px;
        border-width: 2px;
        border-color: #2462E9;
    }
    
    .svg-wrapper {
            display: flex;
        position: absolute;
        top: 7px;
        right: 10px;
        border-radius: 153px;
        padding: 2px;
        cursor: pointer;
        align-items: center;
        justify-content: center;
    }

    .svg-wrapper:hover {
        background-color:rgba(83, 86, 118, 1);
    }

    .send-svg {
        width: 25px;
        height:25px;
        fill:rgba(13, 221, 96, 1);
    }
    
`