import { html, TemplateResult } from 'lit';
import '../web-components/HandleSmallSearch/index.js';

export default {
    title: 'Components/HandleSmallSearch',
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
    <handle-small-search ></handle-small-search>

 `;

export const Regular = Template.bind({});


