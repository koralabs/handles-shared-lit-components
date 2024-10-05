import { html, TemplateResult } from 'lit';
import '../web-components/BuiltElements.js';
export default {
    title: 'Components/BuiltElements',
    component: 'built-elements',
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
    <built-elements></built-elements>

 `;

export const Regular = Template.bind({});