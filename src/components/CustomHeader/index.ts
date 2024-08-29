import { LitElement, html, css, PropertyValueMap } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

export class CustomHeader extends LitElement {
    static renderTag = () => document.createElement("custom-header");
    static styles = css`
        .custom_header {
            background-color: var(--header-background);
            color: var(--text-color);
            flex: 1;
            display: flex;
            justify-content: space-between;
            align-items: center;
            z-index: 4;
            width: 100%;
            position: sticky;
            top: 0;
            height: 60px;
            box-shadow: var(--box-shadow);
            border-bottom: 1px solid #c6c6c6;
            opacity: 1;
        }
        #header-icon {
            width: fit-content;
            height: 40px;
            margin-left: 10px;
        }
        .header-icon-text {
            display: flex;
            align-items: center;
            padding: 0 10px;
        }
        .authhandleme {
            color: var(--text-color);
            fill: var(--text-color);                
            text-decoration: none;
            font-size: 28px;
            font-family: NotoSans-Bold, Noto Sans;
            font-weight: 700;
        }
        @media screen and (max-width: 750px) {
            .authhandleme {
                font-size: 5vw;
            }
            #header-icon {
                width: 7vw;
                height: 7vw;
                margin-left: 10px;
            }
        }
        @media (min-width: 768px) {
            .footer {
                font-size: 1rem;
            }
        }
        @media screen and (max-width: 1010px) {
            .section {
                margin-top: 0px;
                width: 80vw;
            }
        }
    `;

    render() {
        return html`
            <header class="custom_header">
                <div style="width: fit-content;">
                        <div class="header-icon-text">
                            <svg id="header-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 49">
                                <path id="logo_S" data-name="logo S" d="M6.847,2.28q0-.819,1.269-1.531A6.543,6.543,0,0,1,11.458,0q1.6,0,2.071.713a1.691,1.691,0,0,1,.333.926V2.707a11.626,11.626,0,0,1,5.245,1.5c.4.284.6.558.6.818a10.97,10.97,0,0,1-.835,3.988q-.8,2.137-1.568,2.138a4.05,4.05,0,0,1-.869-.321A9.124,9.124,0,0,0,12.76,9.793a4.669,4.669,0,0,0-1.97.284.954.954,0,0,0-.5.891c0,.38.246.678.735.891a10.607,10.607,0,0,0,1.8.569,12.063,12.063,0,0,1,2.372.749,13.116,13.116,0,0,1,2.4,1.281A5.632,5.632,0,0,1,19.442,16.7a6.6,6.6,0,0,1,.735,2.991,10.022,10.022,0,0,1-.268,2.528,7.742,7.742,0,0,1-.936,2.065A5.961,5.961,0,0,1,17,26.206a9.615,9.615,0,0,1-3.141,1.212v.569q0,.819-1.269,1.531a6.531,6.531,0,0,1-3.34.747q-1.6,0-2.071-.711a1.7,1.7,0,0,1-.335-.926V27.56a21.3,21.3,0,0,1-3.775-.676Q0,25.995,0,24.961a16.977,16.977,0,0,1,.534-4.13q.535-2.172,1.269-2.173.133,0,2.772.962a12.92,12.92,0,0,0,3.976.962,3.425,3.425,0,0,0,1.736-.284,1.077,1.077,0,0,0,.4-.891c0-.38-.246-.7-.735-.962a6.491,6.491,0,0,0-1.838-.676A15.515,15.515,0,0,1,3.34,15.74a5.472,5.472,0,0,1-1.836-2.1A6.823,6.823,0,0,1,.768,10.4q0-6.553,6.079-7.655Z" transform="translate(0 9.487)" fill="#0cd15b"/>
                            </svg>
                            <text class="authhandleme" transform="translate(23 38)">
                                <tspan x="0" y="0"> <slot></slot> </tspan>
                            </text>
                        </div>
                </div>
                <div style="display: flex; justify-content: center; align-items: center">
                </div>
            </header>
        `;
    }
}

customElements.define('custom-header', CustomHeader);
