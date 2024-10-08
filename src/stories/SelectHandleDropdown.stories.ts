import { html, TemplateResult } from 'lit';
import '../web-components/SelectHandleDropdown/index.js';

export default {
    title: 'Components/SelectHandleDropdown',
    component: 'select-handle-dropdown',
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
    handle: string;
    help?: string;
    addFunction?: Function;
}

const Template: Story<ArgTypes> = ({ }: ArgTypes) => html`
    <select-handle-dropdown>
        <div slot="slottedDropdown">
            <select-handle></select-handle>
        </div>
    </select-handle-dropdown>

 `;

export const Regular = Template.bind({});

