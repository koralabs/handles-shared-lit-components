import { html, TemplateResult } from 'lit';
import '../web-components/LargeHandleSelector/index.js';

export default {
    title: 'Components/LargeHandleSelector',
    component: 'large-handle-selector',
    argTypes: {
        handleData: { control: 'array' },
        onFirstUpdated: { action: 'onFirstUpdated called' },
        onScroll: { action: 'onScroll called' },
        onSelectHandle: { action: 'onSelectHandle called' },
        slottedSearchStyling: { control: 'text' },
        search: { control: 'text' },
        loader: { control: 'text' },
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
    onFirstUpdated?: Function;
    onScroll?: Function;
    onSelectHandle?: Function;
    slottedSearchStyling?: string;
    search?: TemplateResult;
    loader?: TemplateResult;
}

const Template: Story<ArgTypes> = ({ handleData, onSelectHandle, search, onScroll, loader }: ArgTypes) => html`
    <large-handle-selector
        .handleData=${handleData}
        .onSelectHandle=${onSelectHandle}
        .onScroll=${onScroll}>
        <div slot="slottedSearch">${search}</div>
        <div slot="slottedLoader">${loader}</div>
    </large-handle-selector>
`;

export const Regular = Template.bind({});
Regular.args = {
    handleData: [
        { name: 'Handle 1', image: 'zb2rhiv8WgRqPrRKYuHic1NsXHmgNKFyojuc81E5qFWFWLaQn?img-width=512' },
        { name: 'Handle 2', image: 'zb2rhiv8WgRqPrRKYuHic1NsXHmgNKFyojuc81E5qFWFWLaQn?img-width=512' },
        { name: 'Handle 3', image: 'zb2rhiv8WgRqPrRKYuHic1NsXHmgNKFyojuc81E5qFWFWLaQn?img-width=512' },
        { name: 'Handle 1', image: 'zb2rhiv8WgRqPrRKYuHic1NsXHmgNKFyojuc81E5qFWFWLaQn?img-width=512' },
        { name: 'Handle 2', image: 'zb2rhiv8WgRqPrRKYuHic1NsXHmgNKFyojuc81E5qFWFWLaQn?img-width=512' },
        { name: 'Handle 3', image: 'zb2rhiv8WgRqPrRKYuHic1NsXHmgNKFyojuc81E5qFWFWLaQn?img-width=512' },
        { name: 'Handle 1', image: 'zb2rhiv8WgRqPrRKYuHic1NsXHmgNKFyojuc81E5qFWFWLaQn?img-width=512' },
        { name: 'Handle 2', image: 'zb2rhiv8WgRqPrRKYuHic1NsXHmgNKFyojuc81E5qFWFWLaQn?img-width=512' },
        { name: 'Handle 3', image: 'zb2rhiv8WgRqPrRKYuHic1NsXHmgNKFyojuc81E5qFWFWLaQn?img-width=512' },
        { name: 'Handle 1', image: 'zb2rhiv8WgRqPrRKYuHic1NsXHmgNKFyojuc81E5qFWFWLaQn?img-width=512' },
        { name: 'Handle 2', image: 'zb2rhiv8WgRqPrRKYuHic1NsXHmgNKFyojuc81E5qFWFWLaQn?img-width=512' },
        { name: 'Handle 3', image: 'zb2rhiv8WgRqPrRKYuHic1NsXHmgNKFyojuc81E5qFWFWLaQn?img-width=512' },
        { name: 'Handle 3', image: 'zb2rhiv8WgRqPrRKYuHic1NsXHmgNKFyojuc81E5qFWFWLaQn?img-width=512' },
        { name: 'Handle 1', image: 'zb2rhiv8WgRqPrRKYuHic1NsXHmgNKFyojuc81E5qFWFWLaQn?img-width=512' },
        { name: 'Handle 2', image: 'zb2rhiv8WgRqPrRKYuHic1NsXHmgNKFyojuc81E5qFWFWLaQn?img-width=512' },

    ],
    onSelectHandle: (handle) => console.log(handle),
    onScroll: () => console.log('onScroll'),
    search: html`<input type="text" placeholder="Search" />`,
    loader: html`<img src="ipfs://exampleLoader" />`,
};
