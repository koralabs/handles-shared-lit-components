import { html, TemplateResult } from 'lit';
import '../web-components/DisconnectWalletButton/index.js';

export default {
    title: 'Components/DisconnectWalletButton',
    component: 'disconnect-wallet-button',
    argTypes: {
        walletIconUrl: {
            control: 'text',
            description: 'the URL of the wallet icon',
            defaultValue: 'https://via.placeholder.com/150',
        },
        onClick: {
            action: 'clicked',
            description: 'Function executed when the button is clicked',
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
    walletIconUrl?: string;
    onClick?: () => void;
}

const Template: Story<ArgTypes> = ({ walletIconUrl, onClick }: ArgTypes) => html`
    <disconnect-wallet-button 
        .walletIconUrl="${walletIconUrl}" 
        .onClick =${onClick}>
    </disconnect-wallet-button>
`;

export const Regular = Template.bind({});
Regular.args = {
    walletIconUrl: 'https://via.placeholder.com/150',
    onClick: () => console.log('Wallet disconnected!'),
};
