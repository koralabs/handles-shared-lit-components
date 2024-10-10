import { html, TemplateResult } from 'lit';
import '../web-components/SelectWallet/index.js';

export default {
    title: 'Components/SelectWallet',
    component: 'select-wallet',
    argTypes: {
        handleData: {
            control: 'array',
            description: 'Array of wallet data objects to be passed to the component',
            defaultValue: [],
        },
        route: {
            control: 'text',
            description: 'The URL route to navigate to when a wallet is selected',
            defaultValue: '/home',
        },
        shouldRenderButtons: {
            control: 'boolean',
            description: 'Indicates whether to render buttons in the component',
            defaultValue: true,
        },
        help: {
            control: 'text',
            description: 'Help text displayed in the component',
            defaultValue: 'Select a wallet to connect',
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
    shouldRenderButtons?: boolean;
    help?: string;
}

const Template: Story<ArgTypes> = ({ handleData = [], route = '/home', shouldRenderButtons = true, help = 'Select a wallet to connect' }: ArgTypes) => html`
    <select-wallet 
        .route=${route} 
        .help=${help} 
        .slottedButtonsStyling=${shouldRenderButtons ? 'display: flex;' : 'display: none;'}
        .addFunction=${() => console.log('Add function triggered!')}>
    </select-wallet>
`;

export const Regular = Template.bind({});
Regular.args = {
    handleData: [],
    route: '/home',
    shouldRenderButtons: true,
    help: 'Select a wallet to connect',
};
