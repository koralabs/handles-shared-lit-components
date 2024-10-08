import { html, TemplateResult } from 'lit';
import '../web-components/CustomToggle/index.js';
export default {
    title: 'Components/CustomToggle',
    component: 'custom-select',
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
}

const Template: Story<ArgTypes> = ({ }: ArgTypes) => html`
    <custom-toggle></custom-toggle>

 `;

export const Regular = Template.bind({});