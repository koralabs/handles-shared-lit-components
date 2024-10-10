import { html, TemplateResult } from 'lit';
import '../web-components/DisconnectWalletButton/index.js';

export default {
    title: 'Components/DisconnectWalletButton',
    component: 'disconnect-wallet-button',
    argTypes: {
        walletKey: {
            control: 'text',
            description: 'The key of the wallet to disconnect (required)',
            defaultValue: 'nami',
        },
        addFunction: {
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
    walletKey?: string;
    addFunction?: () => void;
}

const Template: Story<ArgTypes> = ({ walletKey, addFunction }: ArgTypes) => html`
    <disconnect-wallet-button 
        walletKey="${walletKey}" 
        .addFunction=${addFunction}>
    </disconnect-wallet-button>
`;

export const Regular = Template.bind({});
Regular.args = {
    walletKey: 'eternl',
    addFunction: () => console.log('Wallet disconnected!'),
};
