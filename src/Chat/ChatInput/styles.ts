import { css } from 'lit'

export const ChatInputStyles = css`
    .chat-container {
        display: flex;
        border-bottom-left-radius: 20px;
        border-bottom-right-radius: 20px;
        border-top-left-radius: 20px;
        border-top-right-radius: 20px;
        padding: 5px 0px 5px 16px;
        border: 1px solid rgba(86, 119, 159, 1);
        background-color: hsla(0, 0%, 100%, .05);
        align-items: flex-end;
    }

    .chat-container:focus {
        outline: none; 
        padding:7px 16px;
        border-width: 2px;
        border-color: #2462E9;
    }

     .chat-input {
        
        max-height: 5rem;
        overflow-y: auto;
        width: -webkit-fill-available;
        color: rgba(255, 255, 255, 1);
        font-size: 1rem;
        line-height: 1.5rem;
        appearance: none;
        -webkit-appearance: none;
        -moz-appearance: none;
        --tw-shadow: 0 0 transparent;
    }

    .chat-input::-webkit-scrollbar {
        width: 5px;
    }

    .chat-input::-webkit-scrollbar-track {
        background: transparent;
    }

    .chat-input::-webkit-scrollbar-thumb {
        background: var(--scrollbar-thumb);
        border-radius: var(--scrollbar-thumb-radius);
    }

    .chat-input::-webkit-scrollbar-thumb:hover {
        background: transparent;
    }
    .chat-input:focus {
        outline: none; 
    }
    
     .chat-input-wrapper{
        position: relative;
        height: auto;
        width:100%;
    }

    .svg-wrapper {
        display: flex;
        border-radius: 153px;
        padding: 2px;
        cursor: pointer;
        align-items: center;
        justify-content: center;
        width: fit-content;
    }

    .svg-wrapper:hover {
        background-color:rgba(83, 86, 118, 1);
    }
    
    .send-svg {
        width: 25px;
        height:25px;
        fill:rgba(13, 221, 96, 1);
    }

`;