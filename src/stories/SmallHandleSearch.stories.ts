import { html, TemplateResult } from 'lit';
import '../web-components/SmallHandleSearch/index.js';

export default {
    title: 'Components/HandleSmallSearch',
    component: 'handle-small-search',
    argTypes: {
        inputValue: { control: 'text' },
        open: { control: 'boolean' },
        search: { control: 'text' },
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
    open?: boolean;
    search?: string;
    searching?: boolean;
}

const Template: Story<ArgTypes> = ({ inputValue, open, search, searching }: ArgTypes) => html`
    <handle-small-search
        .inputValue="${inputValue}"
        .open="${open}"
        .search="${search}"
        .searching="${searching}"
    ></handle-small-search>
`;

export const Regular = Template.bind({});
Regular.args = {
    inputValue: '',
    open: false,
    search: '',
    searching: false,
};
