import { html, TemplateResult } from 'lit';
import '../web-components/SelectImages/index.js';

export default {
    title: 'Components/SelectImages',
    component: 'select-images',
    argTypes: {
        handleData: { control: 'array' },
        addFunction: { action: 'addFunction called' },
        infiniteScroll: { action: 'infiniteScroll called' },
        selectHandle: { action: 'selectHandle called' },
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
    addFunction?: Function;
    infiniteScroll?: Function;
    selectHandle?: Function;
    slottedSearchStyling?: string;
    search?: TemplateResult;
    loader?: TemplateResult;
}

const Template: Story<ArgTypes> = ({ handleData, selectHandle, search, infiniteScroll, loader }: ArgTypes) => html`
    <select-images
        .handleData=${handleData}
        .selectHandle=${selectHandle}
        .infiniteScroll=${infiniteScroll}>
        <div slot="slottedSearch">${search}</div>
        <div slot="slottedLoader">${loader}</div>
    </select-images>
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
    selectHandle: (handle) => console.log(handle),
    infiniteScroll: () => console.log('infiniteScroll'),
    search: html`<input type="text" placeholder="Search" />`,
    loader: html`<img src="ipfs://exampleLoader" />`,
};
