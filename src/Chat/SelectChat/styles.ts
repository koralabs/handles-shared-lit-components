import { css } from 'lit'

export const SelectChatStyles = css`
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
        justify-content: space-between;
        height: 3rem;
        width:100%;
        border-bottom: 1px solid rgba(83, 86, 118, 1);
    }

    .chat-input-wrapper {
        background-color:#22264f;
        margin: 0rem;
        position: absolute;
        bottom: 3px;
        width: inherit;
    }
`;