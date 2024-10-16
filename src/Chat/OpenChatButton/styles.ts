import { css } from 'lit'

export const OpenChatButtonStyles = css`

.open-chat-button-outer {
    display: flex;
    flex-direction: row-reverse;
    align-content: center;
    justify-content: flex-end;
    align-items: flex-end;
    position: absolute; 
    bottom: 5px; 
    right: 5px;
    gap: 1rem
}

.open-chat-button-inner {
    cursor: pointer;
    display: flex;
    background-color:rgba(83, 86, 118, 1);
    border-radius: 9999px;
    padding: 5px;
}

.open-chat-button-inner:hover {
    background-color:rgba(108, 110, 137, 1);
}

.svg-wrapper {
    position: relative;
    width: 2rem;
    height: 2rem;
}

.chat-svg {
    width: 2rem;
    height: 2rem;
    fill: rgba(5, 7, 30, 1);
}

.dollar-sign-svg {
    position: absolute;
    top: 7px;
    left: 8px;
    width: 1rem;
    height: 1rem;
    fill: rgba(12, 209, 91, 1);
}

.chat-window {
    height: auto;
    width: auto;
    display:flex;
}

`