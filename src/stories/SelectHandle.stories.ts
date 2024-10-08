import { html, TemplateResult } from 'lit';
import '../web-components/SelectHandle/index.js';

export default {
    title: 'Components/SelectHandle',
    component: 'select-handle',
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
    handleData?: Array<any>;
    route?: string;
    shouldRenderButtons?: boolean;
    help?: string;
    addFunction?: Function;
}

const Template: Story<ArgTypes> = ({ }: ArgTypes) => html`
    <select-handle></select-handle>
 `;

export const Regular = Template.bind({});


