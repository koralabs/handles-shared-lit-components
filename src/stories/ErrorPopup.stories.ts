import { html, TemplateResult } from 'lit';
import '../web-components/ErrorPopup/index.js';

export default {
    title: 'Components/ErrorPopup',
    component: 'error-popup',
    argTypes: {
        open: { control: 'boolean' },
        messageTitle: { control: 'text' },
        message: { control: 'text' },
        countdown: { control: { type: 'range', min: 0, max: 5 } },
    },
};

interface Story<T> {
    (args: T): TemplateResult;
    args?: Partial<T>;
    argTypes?: Record<string, unknown>;
}

interface ArgTypes {
    open: boolean;
    messageTitle: string;
    message: string;
    countdown: number;
}

const Template: Story<ArgTypes> = ({ open, messageTitle, message, countdown }: ArgTypes) => html`
    <error-popup
        .open=${open}
        .messageTitle=${messageTitle}
        .message=${message}
        .countdown=${countdown}>
    </error-popup>
`;

export const Regular = Template.bind({});
Regular.args = {
    open: true,
    messageTitle: 'Error',
    message: 'An error occurred. Please try again!',
    countdown: 5,
};
