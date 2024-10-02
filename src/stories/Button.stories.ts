// src/stories/LitButton.stories.ts
import { html } from 'lit';
import '../web-components/Button'; // Ensure this path points to your button components file

const meta = {
    title: 'Components/LitButton',
    argTypes: {
        label: { control: 'text' }
    }
};

export default meta;

const Template = ({ label, size }) => {
    switch (size) {
        case 'small':
            return html`<lit-button-small>${label}</lit-button-small>`;
        case 'medium':
            return html`<lit-button-medium>${label}</lit-button-medium>`;
        case 'large':
            return html`<lit-button-large>${label}</lit-button-large>`;
        default:
            return html`<lit-button-medium>${label}</lit-button-medium>`;
    }
};

export const Small = Template.bind({});
Small.args = {
    label: 'Small Button',
    size: 'small'
};

export const Medium = Template.bind({});
Medium.args = {
    label: 'Medium Button',
    size: 'medium'
};

export const Large = Template.bind({});
Large.args = {
    label: 'Large Button',
    size: 'large'
};
