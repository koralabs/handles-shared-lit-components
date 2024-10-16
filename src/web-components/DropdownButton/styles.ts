import { css } from 'lit';

export const DropdownButtonStyles = css`
    .handles-select-btn {
        border: none;
        fill: rgb(12, 209, 91);
        background: none;
        color: rgb(255, 255, 255);
        border-radius: 0.25rem;
        padding: 0.5rem 0rem 0.5rem 1rem;
        cursor: pointer;
        text-align: center;
        text-decoration: none;
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        justify-content: center;
        font-size: 1rem;
    }
    .handles-select-wrapper {
        display: flex;
        align-items: center;
        justify-content: space-between;
        transition-property: all;
        transition-timing-function: cubic-bezier(.4, 0, .2, 1);
        transition-duration: .15s;
        color: rgba(107, 114, 128, 1);
        font-weight: 700;
        text-align: center;
        padding-left: 1rem;
        padding-top: .5rem;
        padding-bottom: .5rem;
        padding-right: 1.5rem;
        background-color: hsla(0, 0%, 100%, .05);
        border-radius: 1.5rem;
        cursor: pointer;
        margin: 0;
        position: relative;
    }
    .handle-text {
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-family: inherit; 
    }
    .arrow {
        width: 20px;
        height: 20px;
        padding-left: 7px;
        color: rgb(255, 255, 255);
    }
    .select-handle {
        display: none;
    }
    .handle-and-icon {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
    }
    .svg-styling {
        height: 25px;
        width: 25px;
    }
`;
