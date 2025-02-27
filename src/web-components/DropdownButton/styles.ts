import { css } from 'lit';

export const DropdownButtonStyles = css`
    .handles-select-btn {
        width: auto;
        padding: 0px;
        border: none;
        fill: rgb(12, 209, 91);
        background: none;
        color: rgb(255, 255, 255);
        border-radius: 0.25rem;
        cursor: pointer;
        text-align: center;
        text-decoration: none;
        display: flex;
        flex-direction: column;
        align-items: stretch;
        justify-content: center;
        font-size: 1rem;
        min-width: 0;
    }

    .handles-select-wrapper {
        display: flex;
        align-items: center;
        justify-content: space-between;
        transition: all 0.15s cubic-bezier(.4, 0, .2, 1);
        color: rgba(107, 114, 128, 1);
        font-weight: 700;
        text-align: center;
        padding: 0.5rem 1rem;
        background-color: hsla(0, 0%, 100%, .05);
        border-radius: 1.5rem;
        cursor: pointer;
        margin: 0;
        position: relative;
        width: auto; 
        max-width: 100%; 
        flex: 1; 
        min-width: 0; 
    }

    .handle-and-icon {
        display: flex;
        align-items: center;
        justify-content: space-between;
        flex: 1;
        min-width: 0;
    }

    .handle-text {
        flex-grow: 1;
        min-width: 0;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    .arrow {
        flex-shrink: 0;
        width: 20px;
        height: 20px;
        margin-left: 8px;
    }

    .svg-styling {
        height: 25px;
        width: 25px;
        flex-shrink: 0;
    }

    .select-handle {
        display: none;
    }
`;
