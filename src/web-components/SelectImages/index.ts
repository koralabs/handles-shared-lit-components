import { css, html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { IPFS_GATEWAY, IPFS_GATEWAY_RESIZE_QUERY } from '../../helpers/KoraLabsHelpers';
import { SelectImagesStyles } from './styles';

interface WalletHandle extends Asset {
    active: any;
    default: boolean;
    image?: string;
    imageUrl?: string;
}

interface Asset extends BasicAsset {
    name: string;
    count?: number;
    utxo?: string;
    image?: string;
    src?: string;
    price?: number;
    cost?: number;
    validUntilDate?: number;
}

interface BasicAsset {
    policyId: string;
    hex: string;
}

@customElement('select-images')
export class SelectImages extends LitElement {
    @property({ type: Array }) handleData: any[] = [];
    @property({ type: Object }) handle: any = {};
    @property({ type: Boolean }) dropdownOpen = false;
    @property({ type: Boolean }) loadingImg = false;
    @property({ type: Boolean }) isLoading = false;
    @property({ type: String }) imgWidth: string = '';
    @property({ type: String }) imgHeight: string = '';
    @property({ type: String }) route = '';
    @property({ type: String }) slottedSearchStyling: string = '';
    @property({ type: Function }) addFunction = () => { };
    @property({ type: Function }) infiniteScroll = () => { };
    @property({ type: Object })
    litElement!: LitElement;
    help: string;
    handleDataArray: any;


    static styles = SelectImagesStyles

    firstUpdated() {
        const handle = localStorage.getItem('selectedHandle');
        this.handle = JSON.parse(handle ?? '{}');
        this.helpLogger();
        this.addFunction();
    }

    helpLogger() {
        if (this.help === 'help') {
            console.info(`
            To use this SelectImages component, you can pass in the following:

            1. **Slotted elements**:
                - Use a \`div\` with \`slot="slottedSearch"\` for the search input to filter images.
                
            2. **Handle data**:
                - Pass in \`handleData\` formatted as an array of \`WalletHandle\` objects.
                - Each \`WalletHandle\` should include **name**, **image**, and optionally **active** and **default** properties.
                - Access the selected handle from localStorage using \`localStorage.getItem('selectedHandle')\`.

            3. **Properties**:
                - \`handleData\`: Array of handle data to be displayed in the component.
                - \`route\`: The URL route to navigate when a handle is selected.
                - \`addFunction\`: A function/property that is called during \`firstUpdated\`.
                - \`infiniteScroll\`: A function/property for handling infinite scrolling in the component.
                - \`slottedSearchStyling\`: A string to style the slotted search input.

            Example usage:
                <select-images 
                    .handleData=\${handleData}
                    .route=\${route}
                    .addFunction=\${myFunction}
                    .slottedButtonsStyling=\${'display: flex;'}>
                </select-images>
        `);
        }
    }


    async selectHandle(handle) {
        this.loadingImg = true;
        this.handle = handle;
        localStorage.setItem('selectedHandle', JSON.stringify(handle));
        this.loadingImg = false;
        this.routeTo(this.route);
        this.requestUpdate();
    }

    routeTo(route: string) {
        window.location.href = route;
    }

    imageUrl = (img: string): string => {
        const image = img.replace('ipfs://', '') || '';
        if (!image) {
            return '';
        }
        return `${IPFS_GATEWAY}/ipfs/${image}${IPFS_GATEWAY_RESIZE_QUERY}`;
    }

    renderImages() {
        const handleDataArray = this.handleData || [];
        if (handleDataArray.length === 1) {
            this.imgHeight = '19rem';
            this.imgWidth = '19rem';
        } else if (handleDataArray.length > 1 && handleDataArray.length <= 10) {
            this.imgHeight = '10rem';
            this.imgWidth = '10rem';
        } else {
            this.imgHeight = '5rem';
            this.imgWidth = '5rem';
        }
        return html`${handleDataArray.map((handleData: WalletHandle, index: number) => {
            const handle = this.handleData ? this.handleData[index] : undefined;
            return html`
            <div @click="${() => handle && this.selectHandle(handle)}" class="handle-item ${handle?.active ? 'active' : ''}">
                <div class="handle-img" style="width:${this.imgWidth}; height:${this.imgHeight}">
                    ${handleData.image
                    ? html`<img src="${this.imageUrl(handleData.image)}" @load="${() => this.handleDataArray[index].loading = false}" />`
                    : html`<custom-loader class="loader"></custom-loader>`
                }
                </div>
            </div>
        `;
        })}`;
    }

    renderHandlesSelect() {
        return html`
            <div class="login-container">
                <div class="login-body">
                    <div class="login-content">
                        <div class="login-content-header">
                            <div class="login-content-header-title">
                            Choose your handle
                            </div>
                        </div>
                        <div class="wallet-handles-content">
                            <div class="select-wrapper">
                                <div style=${this.slottedSearchStyling}>
                                    <slot name="slottedSearch" ></slot>
                                </div>
                                <div class="scroll-wrapper-outer">                            
                                    <div style="width:100%; height:100%; pointer-events:none; position: absolute; z-index: 9; background-image: linear-gradient(to top, rgb(10, 14, 59), rgba(0, 0, 0, 0) 10%, rgba(0, 0, 0, 0) 90%, rgb(10, 14, 59) 100%);"></div>
                                    <div class="scroll-wrapper" @scroll="${this.infiniteScroll}">
                                        <div class="handles-container">
                                            ${this.renderImages()}
                                        </div>
                                    </div>            
                                </div>               
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
    render() {
        return html`
            <div class="logout-and-handles">
                ${this.renderHandlesSelect()}
            </div>
        `;
    }
}