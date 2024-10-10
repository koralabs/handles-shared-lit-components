import { html, TemplateResult } from 'lit';
import '../web-components/SelectImages/index.js';

export default {
    title: 'Components/SelectImages',
    component: 'select-images',
    argTypes: {
        handleData: {
            control: {
                type: 'array', // or 'object' depending on how you want to define the array structure
            },
            description: 'Array of WalletHandle objects to be displayed in the component.',
        },
        route: {
            control: {
                type: 'text',
            },
            description: 'The URL route to navigate when a handle is selected.',
        },
        addFunction: {
            control: {
                type: 'function', // Use a function control or just describe how it should work
            },
            description: 'A function to be called during the firstUpdated lifecycle hook.',
        },
        slottedSearchStyling: {
            control: {
                type: 'text',
            },
            description: 'Styling for the slotted search input.',
        },
    },
};

interface Story<T> {
    (args: T): TemplateResult;
    args?: Partial<T>;
    argTypes?: Record<string, unknown>;
    slot?: TemplateResult;
}

interface ArgTypes {
    handleData?: Array<any>;
    route?: string;
    addFunction?: Function;
    slottedSearchStyling?: string;
}

const Template: Story<ArgTypes> = ({ handleData, route, addFunction, slottedSearchStyling }: ArgTypes) => html`
    <select-images 
        .handleData=${handleData} 
        .route=${route} 
        .addFunction=${addFunction} 
        .slottedSearchStyling=${slottedSearchStyling}>
    </select-images>
`;

export const Regular = Template.bind({});
Regular.args = {
    handleData: [
        {
            name: 'Wallet 1',
            image: 'ipfs://example-image-1',
            active: true,
            default: false,
            policyId: 'policy-id-1',
            hex: 'hex-1'
        },
        {
            name: 'Wallet 2',
            image: 'ipfs://example-image-2',
            active: false,
            default: true,
            policyId: 'policy-id-2',
            hex: 'hex-2'
        }
    ],
    route: '/wallet/1',
    addFunction: () => console.log('Add function called!'),
    slottedSearchStyling: 'margin-bottom: 10px;'
};



