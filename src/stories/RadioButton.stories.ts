import { html, TemplateResult } from 'lit';
import '../web-components/RadioButton/index.js';

export default {
    title: 'Components/Radio Button',
    component: 'radio-button',
    argTypes: {
        isSelected: { control: 'boolean' },
        isSmall: { control: 'boolean' },
    }
};

interface Story<T> {
    (args: T): TemplateResult;
    args?: Partial<T>;
    argTypes?: Record<string, unknown>;
}

interface ArgTypes {
    title?: string;
    slot?: TemplateResult;
    isSelected?: boolean;
    isSmall?: boolean;
}

const Template: Story<ArgTypes> = ({ isSelected, isSmall }) => html` <radio-button .isSelected=${isSelected} .isSmall=${isSmall}></radio-button> `;

export const Regular = Template.bind({});
