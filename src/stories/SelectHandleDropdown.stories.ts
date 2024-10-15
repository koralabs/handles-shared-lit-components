import { html, TemplateResult } from 'lit';
import '../web-components/DropdownButton/index.js';

export default {
    title: 'Components/DropdownButton',
    component: 'dropdown-button',
    argTypes: {
        dropdownHandle: { control: 'text', description: 'The currently selected handle' },
        onClick: {
            control: 'function',
            description: 'Function to execute on button click',
            action: 'clicked'
        },
        dropdownPositioning: {
            control: 'text',
            description: 'CSS positioning for the dropdown content',
        },
    },
};

interface Story<T> {
    (args: T): TemplateResult;
    args?: Partial<T>;
    argTypes?: Record<string, unknown>;
    slot?: TemplateResult;
}

interface ArgTypes {
    dropdownHandle: string;
    onClick?: Function;
    dropdownPositioning?: string;
}

const Template: Story<ArgTypes> = ({ dropdownHandle, onClick, dropdownPositioning }: ArgTypes) => html`
    <dropdown-button
        .dropdownHandle=${dropdownHandle}
        .onClick=${onClick}
        .dropdownPositioning=${dropdownPositioning}
    >
        <div slot="slottedDropdown">
        </div>
    </dropdown-button>
`;

export const Regular = Template.bind({});
Regular.args = {
    dropdownHandle: 'No active handle',
    onClick: () => console.log('Add button clicked!'),
    dropdownPositioning: 'display: flex; position: absolute; z-index: 1;',
};
