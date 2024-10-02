import { html } from 'lit';
import { styleMap } from 'lit/directives/style-map.js';

export interface ButtonProps {
    /**
     * Is this the principal call to action on the page?
     */
    primary?: boolean;
    /**
     * What background color to use
     */
    backgroundColor?: string;
    /**
     * How large should the button be?
     */
    size?: 'small' | 'medium' | 'large';
    /**
     * Button contents
     */
    label: string;
    /**
     * Optional click handler
     */
    onClick?: () => void;
}
/**
 * Primary UI component for user interaction
 */
export const Button = ({ primary, backgroundColor, size, label, onClick }: ButtonProps) => {
    const mode = primary ? 'shared-button--primary' : 'shared-button--secondary';

    return html`
        <style>
            .shared-button {
                font-family: 'Nunito Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
                font-weight: 700;
                border: 0;
                border-radius: 3em;
                cursor: pointer;
                display: inline-block;
                line-height: 1;
            }
            .shared-button--primary {
                color: white;
                background-color: #1ea7fd;
            }
            .shared-button--secondary {
                color: #333;
                background-color: transparent;
                box-shadow: rgba(0, 0, 0, 0.15) 0px 0px 0px 1px inset;
            }
            .shared-button--small {
                font-size: 12px;
                padding: 10px 16px;
            }
            .shared-button--medium {
                font-size: 14px;
                padding: 11px 20px;
            }
            .shared-button--large {
                font-size: 16px;
                padding: 12px 24px;
            }
        </style>
        <button type="button" class=${['shared-button', `shared-button--${size || 'medium'}`, mode].join(' ')} style=${styleMap({ backgroundColor })} @click=${onClick}>${label}</button>
    `;
};
