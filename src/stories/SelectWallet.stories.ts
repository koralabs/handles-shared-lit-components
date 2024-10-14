import { html, TemplateResult } from 'lit';
import '../web-components/SelectWallet/index.js';

export default {
    title: 'Components/SelectWallet',
    component: 'select-wallet',
    argTypes: {
        wallets: {
            control: { type: 'array' },
            description: 'An array of wallet objects.',
            defaultValue: [],
        },
        selectWallet: {
            control: { type: 'function' },
            description: 'A function to handle the wallet selection.',
            defaultValue: () => { },
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
    wallets?: any[];
    selectWallet?: (wallet) => void;
}

const Template: Story<ArgTypes> = ({
    wallets = [],
    selectWallet = (wallet) => { },
}: ArgTypes) => html`
    <select-wallet
        .selectWallet="${selectWallet}"
        .wallets="${wallets}">
    </select-wallet>
`;

export const Regular = Template.bind({});
Regular.args = {
    wallets: [
        { key: 'lace', name: 'Lace', icon: 'data:image/svg+xml,%3Csvg width="45" height="45" v…/%3E%3C/radialGradient%3E%3C/defs%3E%3C/svg%3E%0A' },
        { key: 'begin', name: 'Begin Wallet', icon: 'data:image/svg+xml,%3Csvg width="27" height="26" v….0677 23.5744Z" fill="%233414FC"/%3E%3C/svg%3E%0A' },
        { key: 'eternl', name: 'Eternl', icon: 'data:image/svg+xml,%3Csvg width="27" height="26" v….0677 23.5744Z" fill="%233414FC"/%3E%3C/svg%3E%0A' },
        { key: 'nami', name: 'Nami', icon: 'data:image/svg+xml,%3Csvg width="27" height="26" v….0677 23.5744Z" fill="%233414FC"/%3E%3C/svg%3E%0A' }
    ],
    selectWallet: (wallet) => {
        console.log('Selected wallet:', wallet);
    },
};
