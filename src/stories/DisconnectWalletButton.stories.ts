import { html, TemplateResult } from 'lit';
import '../web-components/DisconnectWalletButton/index.js';

export default {
    title: 'Components/DisconnectWalletButton',
    component: 'disconnect-wallet-button',
    argTypes: {
    }
};

interface Story<T> {
    (args: T): TemplateResult;
    args?: Partial<T>;
    argTypes?: Record<string, unknown>;
    slot?: TemplateResult;

}

interface ArgTypes {
    help?: string;
}

const Template: Story<ArgTypes> = ({ help = 'help' }: ArgTypes) => html`
    <disconnect-wallet-button></disconnect-wallet-button>

 `;

export const Regular = Template.bind({});
