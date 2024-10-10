import { html, TemplateResult } from 'lit';
import '../web-components/MainPopup/index.js';

export default {
    title: 'Components/Main Popup',
    component: 'main-popup',
    argTypes: {
        open: { control: 'boolean', description: 'Controls whether the popup is open or closed' },
        message: { control: 'text', description: 'Main message to display in the popup' },
        secondMessage: { control: 'text', description: 'Secondary message to display in the popup' },
        buttonConfirm: { control: 'text', description: 'Text for the confirm button' },
        buttonCancel: { control: 'text', description: 'Text for the cancel button' },
        confirmCallback: { action: 'confirmed', description: 'Callback when confirm button is clicked' }
    }
};

interface Story<T> {
    (args: T): TemplateResult;
    args?: Partial<T>;
    argTypes?: Record<string, unknown>;
}

interface ArgTypes {
    open: boolean;
    message: string;
    secondMessage: string;
    buttonConfirm: string;
    buttonCancel: string;
    confirmCallback: () => void;
}

const Template: Story<ArgTypes> = ({ open, message, secondMessage, buttonConfirm, buttonCancel, confirmCallback }: ArgTypes) => html`
    <main-popup 
        ?open=${open} 
        .message=${message} 
        .secondMessage=${secondMessage}
        .buttonConfirm=${buttonConfirm} 
        .buttonCancel=${buttonCancel} 
        .confirmCallback=${confirmCallback}>
    </main-popup>
`;

export const Regular = Template.bind({});
Regular.args = {
    open: true,
    message: "Are you sure?",
    secondMessage: "This action cannot be undone.",
    buttonConfirm: "Confirm",
    buttonCancel: "Cancel",
    confirmCallback: () => console.log('Confirmed!')
};
