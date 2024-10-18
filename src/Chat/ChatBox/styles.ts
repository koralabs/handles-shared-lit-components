import { css } from 'lit'

export const ChatBoxStyles = css`

    .chat-box-wrapper {
        display:flex;
        flex-direction: row;
        align-items:flex-end;
        gap: 5px;
        margin: 1rem 0rem;
    }

    .chat-box-wrapper.me {
        flex-direction: row-reverse;
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
        word-break: break-all;
        overflow-wrap: break-word;
    }

`;