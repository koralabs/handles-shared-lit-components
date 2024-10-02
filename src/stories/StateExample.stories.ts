import { html, TemplateResult } from 'lit';
import '../web-components/StateExample/index.js';

export default {
    title: 'Components/State Example',
    component: 'state-example',
    argTypes: {
        count: { control: 'number' }
    }
};

interface Story<T> {
    (args: T): TemplateResult;
    args?: Partial<T>;
    argTypes?: Record<string, unknown>;
}

interface ArgTypes {
    title?: string;
    count?: number;
    textColor?: string;
    slot?: TemplateResult;
}

const Template: Story<ArgTypes> = ({ title = 'Hello world', count = 5, textColor, slot }: ArgTypes) => html` <state-example style="--my-counter-text-color: ${textColor || 'black'}" .title=${title} .count=${count}> ${slot} </state-example> `;

export const Regular = Template.bind({});

export const CustomTitle = Template.bind({});
CustomTitle.args = {
    title: 'My title'
};

export const CustomCounter = Template.bind({});
CustomCounter.args = {
    count: 123456
};

export const SlottedContent = Template.bind({});
SlottedContent.args = {
    slot: html`<p>Slotted content</p>`
};
SlottedContent.argTypes = {
    slot: { table: { disable: true } }
};
