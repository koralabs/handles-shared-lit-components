import { html, TemplateResult } from 'lit';
import '../web-components/selectWallet/index.js';

export default {
    title: 'Components/SelectWallet',
    component: 'select-handle',
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
    handleData?: Array<any>;
    route?: string;
    shouldRenderButtons?: boolean;
    help?: string;
}


const Template: Story<ArgTypes> = ({ help = 'help' }: ArgTypes) => html`
    <select-wallet > 
    </select-wallet>
 `;

export const Regular = Template.bind({});


