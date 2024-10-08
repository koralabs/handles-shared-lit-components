import { html, TemplateResult } from 'lit';
import '../web-components/InfiniteScroll/index.js';

export default {
    title: 'Components/InfiniteScroll',
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
}

const Template: Story<ArgTypes> = ({ }: ArgTypes) => html`
    <infinite-scroll>
    </infinite-scroll>
    
 `;

export const Regular = Template.bind({});

