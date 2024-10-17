import { css } from 'lit'

export const ChatSearchStyles = css`
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

    .permissions-field {
        width: 100%;
        display: flex;
        flex-direction: row;
        align-items: center;
        padding: 5px;
        position: relative;
        border-radius: 7px;
        justify-content: center;
        flex-wrap: nowrap;
    }
    .search-field-wrapper {
        display:flex;
        flex-direction:column;
    }

    .input-form {
        font-family: Ubuntu Mono, monospace;
        overflow-y: auto;
        padding: 0.5rem 0.75rem 0.5rem 0.5rem;
        width: -webkit-fill-available;
        border: none;
        border-radius: 9999px;
        background-color: transparent;
        transition-property: all;
        transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
        transition-duration: 0.15s;
        color: rgba(255, 255, 255, 1);
        font-size: 1rem;
        line-height: 1.5rem;
        -webkit-appearance: none;
        -moz-appearance: none;
        appearance: none;
        --tw-shadow: 0 0 transparent;
    }

    .input-form:focus {
        outline: none;
        border-width: 1px;
        border-color: #2462E9;
    }

    .search-icon-wrapper {
        color: white;
    }
    .searched-handles-wrapper{
    }
    `