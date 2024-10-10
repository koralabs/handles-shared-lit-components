import { html, TemplateResult } from 'lit';
import '../web-components/SelectHandle/index.js';

export default {
    title: 'Components/SelectHandle',
    component: 'select-handle',
    argTypes: {
        handleData: { control: 'array' },
        route: { control: 'text' },
        shouldRenderButtons: { control: 'boolean' },
        addFunction: { action: 'addFunction called' },
        infiniteScroll: { action: 'infiniteScroll called' },
    },
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

const Template: Story<ArgTypes> = ({ handleData, route, shouldRenderButtons }: ArgTypes) => html`
    <select-handle
        .handleData=${handleData}
        .route=${route}
        ?showButtons=${shouldRenderButtons}>
        <div slot="slottedSearch">Search...</div>
        <div slot="slottedButtons"> <button @click=${() => console.log('Button clicked!')}>Action</button> </div>
    </select-handle>
 `;

export const Regular = Template.bind({});
Regular.args = {
    handleData: [
        { name: 'Handle 1', image: 'ipfs://exampleImage1' },
        { name: 'Handle 2', image: 'ipfs://exampleImage2' },
        { name: 'Handle 3', image: 'ipfs://exampleImage3' },
    ],
    route: 'https://example.com',
    shouldRenderButtons: true,
};
