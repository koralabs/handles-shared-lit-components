import { html, TemplateResult } from 'lit';
import '../web-components/SelectHandleDropdown/index.js';

export default {
    title: 'Components/SelectHandleDropdown',
    component: 'select-handle-dropdown',
    argTypes: {
        dropdownHandle: { control: 'text', description: 'The currently selected handle' },
        help: { control: 'text', description: 'Help text for the dropdown' },
        addFunction: {
            control: 'function',
            description: 'Function to execute on button click',
            action: 'clicked' // To log the click action in the Storybook action panel
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
    help?: string;
    addFunction?: Function;
    options?: string[];
    dropdownPositioning?: string;
}

const Template: Story<ArgTypes> = ({ dropdownHandle, help, addFunction, options, dropdownPositioning }: ArgTypes) => html`
    <select-handle-dropdown
        .dropdownHandle=${dropdownHandle}
        .help=${help}
        .addFunction=${addFunction}
        .options=${options}
        .dropdownPositioning=${dropdownPositioning}
    >
        <div slot="slottedDropdown">
            ${options && options.length > 0
        ? options.map(option => html`<div>${option}</div>`)
        : html`<div>No options available</div>`}
        </div>
    </select-handle-dropdown>
`;

export const Regular = Template.bind({});
Regular.args = {
    dropdownHandle: 'No active handle',
    help: 'Select your wallet handle from the dropdown.',
    addFunction: () => console.log('Add button clicked!'),
    options: ['Handle 1', 'Handle 2', 'Handle 3'],
    dropdownPositioning: 'display: flex; position: absolute; z-index: 1;',
};
