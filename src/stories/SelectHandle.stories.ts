import { html, TemplateResult } from 'lit';
import '../web-components/SelectHandle/index.js';
import { SelectHandle } from '../web-components/SelectHandle/index';

export default {
    title: 'Components/SelectHandle',
    component: 'select-handle',
    argTypes: {
        handleData: { control: 'array' },
        addFunction: { action: 'addFunction called' },
        infiniteScroll: { action: 'infiniteScroll called' },
        selectHandle: { action: 'selectHandle called' },
        slottedButtonsStyling: { control: 'text' },
        slottedSearchStyling: { control: 'text' },
        imageUrl: { control: 'text' },
        search: { control: 'text' },
        buttons: { control: 'text' },
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
    slottedButtonsStyling?: string;
    slottedSearchStyling?: string;
    imageUrl?: string;
    search?: TemplateResult;
    buttons?: TemplateResult;
    loader?: TemplateResult;
}

const Template: Story<ArgTypes> = ({ handleData, selectHandle, search, buttons, loader, imageUrl }: ArgTypes) => html`
    <select-handle
        .handleData=${handleData}
        .selectHandle=${selectHandle}
        .imageUrl=${imageUrl}>
        <div slot="slottedSearch">${search}</div>
        <div slot="slottedButtons">${buttons}</div>
        <div slot="slottedLoader">${loader}</div>
    </select-handle>
`;

export const Regular = Template.bind({});
Regular.args = {
    handleData: [
        { name: 'Handle 1', image: 'ipfs://exampleImage1' },
        { name: 'Handle 2', image: 'ipfs://exampleImage2' },
        { name: 'Handle 3', image: 'ipfs://exampleImage3' },
    ],
    selectHandle: (handle: any) => console.log(handle),
    imageUrl: 'ipfs://exampleImage',
    search: html`<input type="text" placeholder="Search" />`,
    buttons: html`<button>Cancel</button><button>Continue</button>`,
    loader: html`<img src="ipfs://exampleLoader" />`,
};

