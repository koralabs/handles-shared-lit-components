import { html, TemplateResult } from 'lit';
import '../Chat/index.js'

export default {
    title: 'Components/HandleChat',
    component: 'handle-chat',
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

const Template: Story<ArgTypes> = ({ }: ArgTypes) => html`
    <handle-chat></handle-chat>
`;

export const Regular = Template.bind({});
