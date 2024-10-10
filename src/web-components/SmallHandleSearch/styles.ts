import { css } from 'lit';

export const HandleSmallSearchStyles = css`
    * {
        font-family:
        Syne,
        Noto Sans,
        ui-sans-serif,
        system-ui,
        -apple-system,
        Segoe UI,
        Roboto,
        Ubuntu,
        Cantarell,
        sans-serif,
        BlinkMacSystemFont,
        Helvetica Neue,
        Arial;
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

    .permissions-field {
        width: 100%;
        display: flex;
        flex-direction: row;
        align-items: center;
        padding: 5px;
        margin-bottom: 0.5rem;
        position: relative;
        border-radius: 7px;
        justify-content: center;
        flex-wrap: nowrap;
    }   
    .input-form {
        font-family: Ubuntu Mono, monospace;
        overflow-y: auto;
        padding: 0.5rem 0.75rem 0.5rem 2rem;
        width: -webkit-fill-available;
        border: 1px solid rgba(86, 119, 159, 1);
        border-radius: 9999px;
        background-color: hsla(0, 0%, 100%, 0.05);
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
    .clear-search {
        opacity: 1;
        color: rgba(209, 213, 219, 1);
        width: 1.25rem;
        height: 1.25rem;
        z-index: 20;
        fill: currentColor;
        stroke: currentColor;
        cursor: pointer;
        stroke-width: 0;
    }
    .clear-search-wrapper {
        visibility: hidden;
        display: none;
        top: 16px;
        right: 19px;
        position: absolute;
    }
    .search-icon-wrapper {
        top: 18px;
        left: 19px;
        position: absolute;
    }
    .clear-search-wrapper.searching {
        visibility: visible;
        display: flex;
    }
    
        @media screen and (max-width: 350px) {
        .clear-search-wrapper {
            right: 20px;
        }
        .search-icon-wrapper {
            left: 20px;
        }
}
    
    
    
    `;