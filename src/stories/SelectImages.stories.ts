import { html, TemplateResult } from 'lit';
import '../web-components/SelectImages/index.js';

export default {
    title: 'Components/SelectImages',
    component: 'select-images',
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
    <select-images>
    </select-images>
 `;

export const Regular = Template.bind({});



