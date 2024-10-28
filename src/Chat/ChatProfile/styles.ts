import { css } from 'lit'

export const ChatProfileStyles = css`
    .chat-profile-wrapper{
        display:flex;
        align-items: center;
        justify-content: center;
    }
    .chat-profile-wrapper.isOffline:hover .tooltip-text {
        visibility: visible;
        opacity: 1;
    }
    
    .current-handle {
        overflow: hidden;
        text-overflow: ellipsis;
        border: 1px solid rgba(74, 222, 128, 1);
        border-radius: 0.5rem;
        display: flex;
        text-decoration: none;
        flex-direction: row;
        align-items: center;
        justify-content:center;
        width: -webkit-fill-available;
        background-color: hsla(0, 0%, 100%, 0.05);
        border-radius: 0.5em;
    }

    .current-handle.isOffline{
        border: 1px solid rgba(108, 110, 137, 1);
    }

    .handle-wrapper {
        margin:0.7rem;
        display: flex;
        flex-direction: row;
    }

    .handle-sign {
        display: flex;
        align-items: center;
        font-family: Ubuntu Mono, monospace;
        fill: rgba(74, 222, 128, 1);
        margin-right: 1px;
    } 
    
    .dollar-sign {
        font-family: Ubuntu Mono, monospace;
        color: rgba(74, 222, 128, 1);
    }

    .dollar-sign.isOffline {
        color:rgba(108, 110, 137, 1)
    }

    .handle-text {
        color: white;
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-family: Ubuntu Mono, monospace;
    }  
      
    .tooltip-text {
        z-index: 1000;
        position: absolute; /* Use absolute positioning relative to the button */
        bottom: 94%; /* Positioning tooltip below the button */
        visibility: hidden;
        background-color: rgba(97, 97, 97, 0.92);
        border-radius: 4px;
        color: rgb(255, 255, 255);
        font-family: Roboto, Helvetica, Arial, sans-serif;
        padding: 4px 8px;
        font-size: 0.6875rem;
        width: 91px;
        margin: 2px;
        font-weight: 500;
        opacity: 0;
        transition: opacity 0.3s;
    }

    
    `