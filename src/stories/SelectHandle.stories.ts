import { html, TemplateResult } from 'lit';
import '../web-components/selectHandle/index.js';

export default {
    title: 'Components/SelectHandle',
    component: 'select-handle',
    argTypes: {
    }
};

interface Story<T> {
    (args: T): TemplateResult;
    args?: Partial<T>;
    argTypes?: Record<string, unknown>;
}

interface ArgTypes {
}

const Template: Story<ArgTypes> = ({ }: ArgTypes) => html` <select-handle > </select-handle> `;

export const Regular = Template.bind({});


