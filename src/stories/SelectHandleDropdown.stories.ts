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
        options: {
            control: 'array',
            description: 'Array of options to be displayed in the dropdown',
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
    options?: string[];
    dropdownPositioning?: string;
}

const Template: Story<ArgTypes> = ({ dropdownHandle, onClick, options, dropdownPositioning }: ArgTypes) => html`
    <dropdown-button
        .dropdownHandle=${dropdownHandle}
        .onClick=${onClick}
        .options=${options}
        .dropdownPositioning=${dropdownPositioning}
    >
        <div slot="slottedDropdown">
            ${options && options.length > 0
        ? options.map(option => html`<div>${option}</div>`)
        : html`<div>No options available</div>`}
        </div>
    </dropdown-button>
`;

export const Regular = Template.bind({});
Regular.args = {
    dropdownHandle: 'No active handle',
    onClick: () => console.log('Add button clicked!'),
    options: ['Handle 1', 'Handle 2', 'Handle 3'],
    dropdownPositioning: 'display: flex; position: absolute; z-index: 1;',
};
