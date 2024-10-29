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
    .select-chat-header {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .header-text {
        font-size: 20px;
        color: white
    }

    .chat-header {
        position:relative;
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

    .select-chat-wrapper{
        height: 20.5rem;
    }

    .search-icon {
        width: 1rem;
        height: 1rem;
        fill: white;
        cursor: pointer;
        position: absolute;
        top: 15px;
        right: 0px;
    }
    
    .search-icon:hover .tooltip-text {
        visibility: visible;
        opacity: 1;
    }
    
    .tooltip-text {
        z-index: 1000;
        position: absolute;
        bottom: 94%; 
        right:0px;
        visibility: hidden;
        background-color: rgba(97, 97, 97, 0.92);
        border-radius: 4px;
        color: rgb(255, 255, 255);
        font-family: Roboto, Helvetica, Arial, sans-serif;
        padding: 4px 8px;
        font-size: 0.6875rem;
        width: 74px;
        margin: 2px;
        font-weight: 500;
        opacity: 0;
        transition: opacity 0.3s;
    }

    .cancel-search {
        opacity: 1;
        color: rgba(209, 213, 219, 1);
        width: 1.5rem;
        height: 1.5rem;
        z-index: 20;
        fill: currentColor;
        stroke: currentColor;
        stroke-width: 0;
        cursor: pointer;
    }
    .cancel-search:hover .tooltip-text{
        bottom: 64%; 
        visibility: visible;
        opacity: 1;
    }
`;