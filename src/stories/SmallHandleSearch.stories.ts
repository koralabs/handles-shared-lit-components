import { html, TemplateResult } from 'lit';
import '../web-components/SmallHandleSearch/index.js';

export default {
    title: 'Components/HandleSmallSearch',
    component: 'handle-small-search',
    argTypes: {
        inputValue: { control: 'text' },
        searching: { control: 'boolean' },
    },
};

interface Story<T> {
    (args: T): TemplateResult;
    args?: Partial<T>;
    argTypes?: Record<string, unknown>;
    slot?: TemplateResult;
}

interface ArgTypes {
    inputValue?: string;
    searching?: boolean;
}

const Template: Story<ArgTypes> = ({ inputValue, searching }: ArgTypes) => html`
    <handle-small-search
        .inputValue="${inputValue}"
        .searching="${searching}"
    ></handle-small-search>
`;

export const Regular = Template.bind({});
Regular.args = {
    inputValue: '',
    searching: false,
};
