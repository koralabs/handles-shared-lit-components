import { html, TemplateResult } from 'lit';
import '../web-components/SelectWallet/index.js';

export default {
    title: 'Components/SelectWallet',
    component: 'select-wallet',
    argTypes: {
        getUserWallets: {
            control: { type: 'array' },
            description: 'A function that returns an array of wallet objects.',
            defaultValue: () => [],
        },
        route: {
            control: { type: 'text' },
            description: 'The route to navigate to when a wallet is selected.',
            defaultValue: '',
        }
    }
};

interface Story<T> {
    (args: T): TemplateResult;
    args?: Partial<T>;
    argTypes?: Record<string, unknown>;
    slot?: TemplateResult;
}

interface ArgTypes {
    getUserWallets?: () => [];
    route?: string;
}

const Template: Story<ArgTypes> = ({
    getUserWallets = () => [],
    route = '',
}: ArgTypes) => html`
    <select-wallet
        .route="${route}"
        .getUserWallets="${getUserWallets}">
    </select-wallet>
`;

export const Regular = Template.bind({});
Regular.args = {
    getUserWallets: () => {
        return [
            { key: '1', name: 'Wallet', icon: 'icon' },
            { key: '2', name: 'Wallet', icon: 'icon' },
            { key: '3', name: 'Wallet', icon: 'icon' },
            { key: '1', name: 'Wallet', icon: 'icon' },
            { key: '2', name: 'Wallet', icon: 'icon' },
            { key: '3', name: 'Wallet', icon: 'icon' }
        ];
    },
    route: '/route'
};
