import { html } from 'lit';
import '../web-components/Button'; // Ensure this path points to your button components file

const meta = {
    title: 'Components/LitButton',
    argTypes: {
        label: { control: 'text', description: 'Button label' },
        size: {
            control: { type: 'select' },
            options: ['small', 'medium', 'large'],
            description: 'Size of the button'
        },
        buttonColor: {
            control: 'color',
            description: 'Background color of the button'
        },
        textColor: {
            control: 'color',
            description: 'Text color of the button'
        }
    }
};

export default meta;

const Template = ({ label, size, buttonColor, textColor }) => {
    switch (size) {
        case 'small':
            return html`<shared-button-small .buttonColor=${buttonColor} .textColor=${textColor}>${label}</shared-button-small>`;
        case 'medium':
            return html`<shared-button-medium .buttonColor=${buttonColor} .textColor=${textColor}>${label}</shared-button-medium>`;
        case 'large':
            return html`<shared-button-large .buttonColor=${buttonColor} .textColor=${textColor}>${label}</shared-button-large>`;
        default:
            return html`<shared-button-medium .buttonColor=${buttonColor} .textColor=${textColor}>${label}</shared-button-medium>`;
    }
};

export const Small = Template.bind({});
Small.args = {
    label: 'Small Button',
    size: 'small',
    buttonColor: '#3d85cc',
    textColor: '#ffffff'
};

export const Medium = Template.bind({});
Medium.args = {
    label: 'Medium Button',
    size: 'medium',
    buttonColor: '#3d85cc',
    textColor: '#ffffff'
};

export const Large = Template.bind({});
Large.args = {
    label: 'Large Button',
    size: 'large',
    buttonColor: '#3d85cc',
    textColor: '#ffffff'
};
