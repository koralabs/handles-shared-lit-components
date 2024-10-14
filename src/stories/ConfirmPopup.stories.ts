import { html, TemplateResult } from 'lit';
import '../web-components/ConfirmPopup/index.js';

export default {
    title: 'Components/Confirm Popup',
    component: 'confirm-popup',
    argTypes: {
        open: { control: 'boolean', description: 'Controls whether the popup is open or closed' },
        message: { control: 'text', description: 'Main message to display in the popup' },
        secondMessage: { control: 'text', description: 'Secondary message to display in the popup' },
        confirmButtonLabel: { control: 'text', description: 'Text for the confirm button' },
        cancelButtonLabel: { control: 'text', description: 'Text for the cancel button' },
        onConfirm: { action: 'confirmed', description: 'Callback when confirm button is clicked' },
        onCancel: { action: 'canceled', description: 'Callback when cancel button is clicked' },
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
    confirmButtonLabel: string;
    cancelButtonLabel: string;
    onConfirm: () => void;
    onCancel: () => void;
}

const Template: Story<ArgTypes> = ({ open, message, secondMessage, confirmButtonLabel, cancelButtonLabel, onConfirm, onCancel }: ArgTypes) => html`
    <confirm-popup 
        ?open=${open} 
        .message=${message} 
        .secondMessage=${secondMessage}
        .confirmButtonLabel=${confirmButtonLabel} 
        .cancelButtonLabel=${cancelButtonLabel} 
        .onConfirm=${onConfirm}
        .onCancel=${onCancel}>
    </confirm-popup>
`;

export const Regular = Template.bind({});
Regular.args = {
    open: true,
    message: "Are you sure?",
    secondMessage: "This action cannot be undone.",
    confirmButtonLabel: "Confirm",
    cancelButtonLabel: "Cancel",
    confirmCallback: () => console.log('Confirmed!'),
    onCancel: () => console.log('Canceled!'),
};
