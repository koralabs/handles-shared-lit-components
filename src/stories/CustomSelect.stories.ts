import { html, TemplateResult } from 'lit';
import '../web-components/CustomSelect/index.js';
export default {
    title: 'Components/CustomSelect',
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
    <custom-select></custom-select>

 `;

export const Regular = Template.bind({});