import { html, TemplateResult } from 'lit';
import '../web-components/ErrorPopup/index.js';

export default {
    title: 'Components/ErrorPopup',
    component: 'error-popup',
    argTypes: {
        open: { control: 'boolean' },
        message: { control: 'text' },
        countdown: { control: { type: 'range', min: 0, max: 10 } },
    },
};

interface Story<T> {
    (args: T): TemplateResult;
    args?: Partial<T>;
    argTypes?: Record<string, unknown>;
}

interface ArgTypes {
    open: boolean;
    message: string;
    countdown: number;
}

const Template: Story<ArgTypes> = ({ open, message, countdown }: ArgTypes) => html`
    <error-popup
        .open=${open}
        .message=${message}
        .countdown=${countdown}>
    </error-popup>
`;

export const Regular = Template.bind({});
Regular.args = {
    open: true,
    message: 'An error occurred. Please try again!',
    countdown: 5,
};
