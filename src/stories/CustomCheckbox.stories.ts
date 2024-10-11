import { html, TemplateResult } from 'lit';
import '../web-components/CustomCheckBox/index.js';

export default {
    title: 'Components/Custom Checkbox',
    component: 'custom-checkbox',
    argTypes: {
        checked: { control: 'boolean' },
        smallCheckbox: { control: 'boolean' },
        disabled: { control: 'boolean' },
    }
};

interface Story<T> {
    (args: T): TemplateResult;
    args?: Partial<T>;
    argTypes?: Record<string, unknown>;
}

interface ArgTypes {
    checked?: boolean;
    smallCheckbox?: boolean;
    disabled?: boolean;
}

const Template: Story<ArgTypes> = ({ checked = false, smallCheckbox = false, disabled = false, }: ArgTypes) =>
    html`<custom-checkbox .checked=${checked} .smallCheckbox=${smallCheckbox} .disabled=${disabled} ></custom-checkbox>`;

export const Regular = Template.bind({});
Regular.args = {
    checked: false,
    smallCheckbox: false,
    disabled: false,
};

export const Checked = Template.bind({});
Checked.args = {
    checked: true,
    smallCheckbox: false,
};

export const SmallCheckbox = Template.bind({});
SmallCheckbox.args = {
    checked: false,
    smallCheckbox: true,
};
