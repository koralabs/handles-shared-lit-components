import { html, TemplateResult } from 'lit';
import '../web-components/SelectHandle/index.js';
import { SelectHandle } from '../web-components/SelectHandle/index.js';

export default {
    title: 'Components/SelectHandle',
    component: 'select-handle',
    argTypes: {
        handleData: { control: 'array' },
        onFirstUpdated: { action: 'onFirstUpdated called' },
        onScroll: { action: 'onScroll called' },
        onSelectHandle: { action: 'onSelectHandle called' },
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
    onFirstUpdated?: Function;
    onScroll?: Function;
    onSelectHandle?: Function;
    slottedButtonsStyling?: string;
    slottedSearchStyling?: string;
    imageUrl?: string;
    search?: TemplateResult;
    buttons?: TemplateResult;
    loader?: TemplateResult;
}

const Template: Story<ArgTypes> = ({ handleData, onSelectHandle, onScroll, search, buttons, loader, imageUrl }: ArgTypes) => html`
    <select-handle
        .handleData=${handleData}
        .onSelectHandle=${onSelectHandle}
        .onScroll=${onScroll}
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
    onSelectHandle: (handle: any) => console.log(handle),
    onScroll: () => console.log('onScroll called'),
    imageUrl: 'ipfs://exampleImage',
    search: html`<input type="text" placeholder="Search" />`,
    buttons: html`<button>Cancel</button><button>Continue</button>`,
    loader: html`<img src="ipfs://exampleLoader" />`,
};

