import assert from 'node:assert/strict';
import test from 'node:test';

import { CustomLoader, StateExample } from '../lib/index.js';
import {
    SharedButtonLarge,
    SharedButtonMedium,
    SharedButtonSmall
} from '../lib/web-components/Button/index.js';
import { SelectHandle } from '../lib/web-components/SelectHandle/index.js';

const valueText = (value) => String(value);

const templateText = (template) => {
    const strings = Array.from(template.strings ?? []);
    const values = Array.from(template.values ?? []);
    let text = strings[0] ?? '';

    for (let index = 0; index < values.length; index++) {
        const value = values[index];
        if (Array.isArray(value)) {
            text += value.map(templateText).join('');
        } else if (value?.strings) {
            text += templateText(value);
        } else if (typeof value !== 'function') {
            text += valueText(value);
        }
        text += strings[index + 1] ?? '';
    }

    return text;
};

test('StateExample renders title/count and increments from the click binding', () => {
    const element = new StateExample();
    element.title = 'Wallet state';
    element.count = 4;

    const rendered = element.render();
    assert.equal(rendered.values[0], 'Wallet state');
    assert.equal(rendered.values[2], 4);
    assert.match(templateText(rendered), /The count is 34434:/);

    rendered.values[1]();
    assert.equal(element.count, 5);
});

test('StateExample exposes the documented custom element tag and default state', () => {
    const element = customElements.get('state-example');

    assert.equal(element, StateExample);
    assert.equal(new element().count, 0);
});

test('SelectHandle renders the active handle, image URL, and active class', () => {
    const element = new SelectHandle();
    element.handleData = [
        { name: 'ada', image: 'ipfs://ada' },
        { name: 'kora', image: 'ipfs://kora' }
    ];
    element.activeHandle = { name: 'ada' };
    element.imageUrl = 'https://example.test/ada.png';

    const rendered = element.render();
    const currentHandle = rendered.values[1];
    const handleItems = rendered.values[3];

    assert.match(templateText(currentHandle), /current-handle/);
    assert.equal(currentHandle.values[0].values[0], 'https://example.test/ada.png');
    assert.equal(currentHandle.values[1], 'ada');
    assert.equal(handleItems.length, 2);
    assert.equal(handleItems[0].values[1], 'active');
    assert.equal(handleItems[0].values[3], 'ada');
    assert.equal(handleItems[1].values[1], '');
    assert.equal(handleItems[1].values[3], 'kora');
});

test('SelectHandle click binding calls onSelectHandle with a copied handle', () => {
    const selected = [];
    const sourceHandle = { name: 'kora', image: 'ipfs://kora' };
    const element = new SelectHandle();
    element.handleData = [sourceHandle];
    element.onSelectHandle = (handle) => selected.push(handle);

    const rendered = element.render();
    const firstItem = rendered.values[3][0];
    firstItem.values[0]();

    assert.deepEqual(selected, [sourceHandle]);
    assert.notEqual(selected[0], sourceHandle);
});

test('SelectHandle switches active handle imagery to loader slots while loading', () => {
    const element = new SelectHandle();
    element.handleData = [{ name: 'ada', image: 'ipfs://ada' }];
    element.activeHandle = { name: 'ada' };
    element.loadingImg = true;

    const rendered = element.render();
    const currentHandle = rendered.values[1];
    const handleItems = rendered.values[3];

    assert.match(templateText(currentHandle.values[0]), /slot name="slottedLoader"/);
    assert.doesNotMatch(templateText(handleItems[0].values[2]), /handle-img/);
    assert.match(templateText(rendered.values[4]), /slot name="slottedLoader"/);
});

test('SelectHandle calls lifecycle and scroll callbacks supplied by consumers', () => {
    let firstUpdated = 0;
    let scrollEvent;
    const element = new SelectHandle();
    element.onFirstUpdated = () => firstUpdated++;
    element.onScroll = (event) => {
        scrollEvent = event;
    };

    element.firstUpdated();
    const rendered = element.render();
    const event = { type: 'scroll' };
    rendered.values[2](event);

    assert.equal(firstUpdated, 1);
    assert.equal(scrollEvent, event);
});

test('shared button variants render their custom elements and slotted button content', () => {
    for (const [tagName, ButtonClass] of [
        ['shared-button-small', SharedButtonSmall],
        ['shared-button-medium', SharedButtonMedium],
        ['shared-button-large', SharedButtonLarge]
    ]) {
        assert.equal(customElements.get(tagName), ButtonClass);
        assert.match(templateText(ButtonClass.renderTag()), new RegExp(`<${tagName}></${tagName}>`));

        const button = new ButtonClass();
        button.buttonClass = 'primary';
        button.buttonColor = '#0DDD60';
        button.textColor = '#101828';

        const rendered = button.render();
        const text = templateText(rendered);
        assert.match(text, /shared-button primary/);
        assert.match(text, /background-color: #0DDD60/);
        assert.match(text, /color:#101828/);
        assert.match(text, /slot name="shared-button"/);
    }
});

test('CustomLoader renders both animated SVG layers', () => {
    const rendered = CustomLoader();
    const text = templateText(rendered);

    assert.match(text, /class="loader"/);
    assert.match(text, /class="green-svg"/);
    assert.match(text, /class="blue-svg"/);
    assert.match(text, /rotate-forward/);
    assert.match(text, /rotate-reverse/);
});
