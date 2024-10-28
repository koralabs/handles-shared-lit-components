import { css } from 'lit'

export const ChatBoxStyles = css`

    .chat-box-wrapper {
        display:flex;
        transform: rotate(180deg);
        flex-direction: row-reverse;
        align-items:flex-end;
        gap: 5px;
        margin: 1rem 0rem;
    }

    .chat-box-wrapper.me {
        flex-direction: row;
    }

    .user-icon {
        width: 2rem;
        height: 2rem;
        border-radius: 9999px;
    }

    .chat-text-wrapper {
        border-radius: 15px;
        padding: 10px;
        background-color:rgba(59, 62, 98, 1);
        color: white;
        max-width: 10.75rem;
    }

    .chat-text {
        overflow-wrap: break-word;
    }

    .chat-body {
        direction: rtl;
       transform: rotate(180deg);
        margin: 0rem 0.5rem;
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
    .chats-wrapper {
        margin: 0rem 0.5rem;
    }

`;