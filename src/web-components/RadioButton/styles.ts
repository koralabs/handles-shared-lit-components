import { css } from 'lit';

export const RadioButtonStyles = css`
  .selected-div {
    display: flex;
    background-color: rgba(34, 197, 94, 1);
    justify-content: center;
    align-items: center;
    border-radius: 9999px;
    box-shadow: green 0px 0px 8px;
    border: 1px solid rgba(156, 163, 175, 1);
    fill: rgba(34, 197, 94, 1);
    width: 1.25rem;
    height: 1.25rem;
  }  
  
  .unselected-div {
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 9999px;
    border: 1px solid rgba(156, 163, 175, 1);
    width: 20px;
    height: 20px;
  }

  .inner-selected-div {
    border-radius: 9999px;
    box-shadow: green 0px 0px 8px;
    background: white;
    width: 10px;
    height: 10px;
  }

  .inner-unselected-div {
    border-radius: 9999px;
    width: 10px;
    height: 10px;
  }
  .selected-div.small {
    width: 16px;
    height: 16px;
  }  
  
  .unselected-div.small {
    width: 16px;
    height: 16px;
  }

  .inner-selected-div.small {
    width: 8px;
    height: 8px;
  }

  .inner-unselected-div.small {
    width: 8px;
    height: 8px;
  }

`