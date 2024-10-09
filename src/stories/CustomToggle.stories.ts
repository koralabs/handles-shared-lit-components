import { html, TemplateResult } from 'lit';
import '../web-components/CustomToggle/index.js';
import { CustomToggle } from '../web-components/CustomToggle/index.js';

export default {
    title: 'Components/CustomToggle',
    component: 'custom-toggle',
    argTypes: {
        isActive: { control: 'boolean' }
    }
};

interface Story<T> {
    (args: T): TemplateResult;
    args?: Partial<T>;
    argTypes?: Record<string, unknown>;
    slot?: TemplateResult;
}

interface ArgTypes {
    isActive: boolean;
}

const Template: Story<ArgTypes> = ({ isActive }: ArgTypes) => {
    const handleEvent = (event: Event) => {
        const toggleElement = event.currentTarget as CustomToggle;
        isActive = !isActive;
        toggleElement.isActive = isActive; // Set the reactive property on the custom element
    };

    return html`
        <custom-toggle .isActive=${isActive} @click=${handleEvent}></custom-toggle>
    `;
};

export const Regular = Template.bind({});
Regular.args = {
    isActive: false
};