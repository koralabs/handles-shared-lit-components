import { css } from 'lit';

export const CustomToggleStyles = css`
.line {
    position: relative;
    width: 38px;
    height: 15px;
    border-radius: 100px;
    background: rgba(255, 255, 255, 0.15);
}
.circle {
    position: absolute;
    top: -3px;
    width: 20px;
    height: 20px;
    border-radius: 20px;
    background: rgba(255, 255, 255, 1);
    border: 0.42px solid rgba(143, 92, 241, 0.04);
    box-shadow: 0px 0.83px 0.83px rgba(0, 0, 0, 0.08), 0px 1.67px 5px rgba(0, 0, 0, 0.15);
}
.line.toggled {
    box-shadow: 4px 0px 4px 0px rgba(0, 0, 0, 0.25) inset;
    background: rgba(77, 166, 255, 1);

}
.circle.toggled {
    left: 17px;
}
.line.small {
    width: 32px;
    height: 10px;
}
.line.toggled.small {
    box-shadow: 4px 0px 4px 0px rgba(0, 0, 0, 0.25) inset;
}
.circle.small {
    width: 16px;
    height: 16px;
    top: -3.5px;
    border-radius: 20px;
    border: 0.42px solid rgba(143, 92, 241, 0.04);
    box-shadow: 0px 0.83px 0.83px 0px rgba(0, 0, 0, 0.08);
    box-shadow: 0px 1.67px 5px 0px rgba(0, 0, 0, 0.15);

}
.circle.toggled.small {
    left: 15.1px;
}
`;