import assert from 'node:assert/strict';
import test from 'node:test';

import { ConfirmPopup } from '../lib/web-components/ConfirmPopup/index.js';
import { ErrorPopup } from '../lib/web-components/ErrorPopup/index.js';
import { LargeHandleSelector } from '../lib/web-components/LargeHandleSelector/index.js';
import { RadioButton } from '../lib/web-components/RadioButton/index.js';
import { HandleSmallSearch } from '../lib/web-components/SmallHandleSearch/index.js';

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

test('ConfirmPopup renders messages and closes through confirm and cancel actions', () => {
    const actions = [];
    const element = new ConfirmPopup();
    element.open = true;
    element.message = 'Remove handle?';
    element.secondMessage = 'This cannot be undone.';
    element.confirmButtonLabel = 'Confirm';
    element.cancelButtonLabel = 'Cancel';
    element.onConfirm = () => actions.push('confirm');
    element.onCancel = () => actions.push('cancel');

    let rendered = element.render();
    assert.equal(customElements.get('confirm-popup'), ConfirmPopup);
    assert.equal(rendered.values[0], 'show');
    assert.equal(rendered.values[1], 'Remove handle?');
    assert.equal(rendered.values[2], 'This cannot be undone.');
    assert.equal(rendered.values[3], 'rgba(157, 159, 177, 1)');
    assert.equal(rendered.values[5], 'Cancel');
    assert.equal(rendered.values[6], 'rgba(13, 221, 96, 1)');
    assert.equal(rendered.values[8], 'Confirm');
    assert.match(templateText(rendered), /popup-actions/);

    rendered.values[7].call(element);
    assert.deepEqual(actions, ['confirm']);
    assert.equal(element.open, false);

    element.open = true;
    rendered = element.render();
    rendered.values[4].call(element);
    assert.deepEqual(actions, ['confirm', 'cancel']);
    assert.equal(element.open, false);
});

test('RadioButton renders selected, unselected, small, and regular class states', () => {
    const element = new RadioButton();

    let rendered = element.render();
    assert.equal(customElements.get('radio-button'), RadioButton);
    assert.equal(rendered.values[0], 'selected-div');
    assert.equal(rendered.values[1], 'small');
    assert.equal(rendered.values[2], 'inner-selected-div');
    assert.equal(rendered.values[3], 'small');
    assert.match(templateText(rendered), /selected-div small/);

    element.isSelected = false;
    element.isSmall = false;
    rendered = element.render();

    assert.equal(rendered.values[0], 'unselected-div');
    assert.equal(rendered.values[1], '');
    assert.equal(rendered.values[2], 'inner-unselected-div');
    assert.equal(rendered.values[3], '');
    assert.match(templateText(rendered), /inner-unselected-div/);
});

test('LargeHandleSelector sizes handle imagery and forwards lifecycle and user events', () => {
    let firstUpdated = 0;
    let scrollEvent;
    const selectedHandles = [];
    const element = new LargeHandleSelector();
    element.slottedSearchStyling = 'display: grid;';
    element.onFirstUpdated = () => firstUpdated++;
    element.onScroll = (event) => {
        scrollEvent = event;
    };
    element.onSelectHandle = (handle) => selectedHandles.push(handle);

    element.firstUpdated();
    assert.equal(customElements.get('large-handle-selector'), LargeHandleSelector);
    assert.equal(firstUpdated, 1);

    const soloHandle = { name: 'solo', image: 'solo.png', active: true };
    element.handleData = [soloHandle];
    let renderedImages = element.renderImages();
    let imageItems = renderedImages.values[0];
    assert.equal(element.imgWidth, '19rem');
    assert.equal(element.imgHeight, '19rem');
    assert.equal(imageItems[0].values[1], 'active');
    assert.equal(imageItems[0].values[2].values[0], '19rem');
    assert.equal(imageItems[0].values[2].values[1], '19rem');
    assert.equal(imageItems[0].values[2].values[2], 'solo.png');

    imageItems[0].values[0]();
    assert.deepEqual(selectedHandles, [soloHandle]);

    element.handleData = [
        { name: 'one', image: 'one.png' },
        { name: 'two' }
    ];
    renderedImages = element.renderImages();
    imageItems = renderedImages.values[0];
    assert.equal(element.imgWidth, '10rem');
    assert.equal(element.imgHeight, '10rem');
    assert.match(templateText(imageItems[1].values[2]), /slot name="slottedLoader"/);

    element.handleData = Array.from({ length: 11 }, (_, index) => ({ name: `handle-${index}`, image: `${index}.png` }));
    renderedImages = element.renderImages();
    assert.equal(element.imgWidth, '5rem');
    assert.equal(element.imgHeight, '5rem');
    assert.equal(renderedImages.values[0].length, 11);

    const rendered = element.render();
    const event = { type: 'scroll' };
    rendered.values[1](event);
    assert.equal(rendered.values[0], 'display: grid;');
    assert.equal(scrollEvent, event);
    assert.equal(rendered.values[2].values[0].length, 11);
});

test('HandleSmallSearch dispatches trimmed input state and clears active search', () => {
    const dispatchedEvents = [];
    let updateRequests = 0;
    const element = new HandleSmallSearch();
    element.dispatchEvent = (event) => {
        dispatchedEvents.push(event);
        return true;
    };
    element.requestUpdate = () => {
        updateRequests++;
    };

    element.handleInput({ target: { value: '  $ada  ' } });
    assert.equal(customElements.get('handle-small-search'), HandleSmallSearch);
    assert.equal(element.searching, true);
    assert.equal(element.inputValue, '$ada');
    assert.equal(dispatchedEvents[0].type, 'input-change');
    assert.deepEqual(dispatchedEvents[0].detail, { inputValue: '$ada' });
    assert.equal(dispatchedEvents[0].bubbles, true);
    assert.equal(dispatchedEvents[0].composed, true);
    assert.ok(updateRequests > 0);

    const renderedSearch = element.renderSearch();
    assert.equal(renderedSearch.values[1], '$ada');
    assert.equal(renderedSearch.values[3], 'searching');
    assert.match(templateText(renderedSearch.values[0]), /search-svg/);

    const updatesBeforeClear = updateRequests;
    renderedSearch.values[4].call(element);
    assert.equal(element.searching, false);
    assert.equal(element.inputValue, '');
    assert.ok(updateRequests > updatesBeforeClear);

    element.handleInput({ target: { value: '   ' } });
    assert.equal(element.searching, false);
    assert.equal(element.inputValue, '');
    assert.deepEqual(dispatchedEvents[1].detail, { inputValue: '' });
    assert.match(templateText(element.render()), /permissions-field/);
});

test('ErrorPopup countdown pauses, resumes, and dispatches close at zero', () => {
    const hadWindow = Object.prototype.hasOwnProperty.call(globalThis, 'window');
    const previousWindow = globalThis.window;
    const previousClearInterval = globalThis.clearInterval;
    const clearedIntervals = [];
    const dispatchedEvents = [];
    let intervalCallback;
    let intervalDelay;
    let updateRequests = 0;
    const element = new ErrorPopup();
    element.countdownInterval = 77;
    element.requestUpdate = () => {
        updateRequests++;
    };

    globalThis.window = {
        dispatchEvent(event) {
            dispatchedEvents.push(event);
            return true;
        },
        setInterval(callback, delay) {
            intervalCallback = callback;
            intervalDelay = delay;
            return 123;
        }
    };
    globalThis.clearInterval = (intervalId) => {
        clearedIntervals.push(intervalId);
    };

    try {
        element.firstUpdated();
        assert.equal(intervalDelay, 1000);
        assert.deepEqual(clearedIntervals, [77]);
        assert.equal(element.countdown, 5);
        assert.equal(element.countdownInterval, 123);

        element.onMouseEnter();
        const updatesBeforePausedTick = updateRequests;
        intervalCallback();
        assert.equal(element.countdown, 5);
        assert.equal(updateRequests, updatesBeforePausedTick);

        element.onMouseLeave();
        intervalCallback();
        assert.equal(element.countdown, 4);
        assert.ok(updateRequests > updatesBeforePausedTick);

        element.countdown = 0;
        intervalCallback();
        assert.equal(dispatchedEvents[0].type, 'error-popup-closed');
        assert.deepEqual(clearedIntervals, [77, 123]);
        assert.equal(element.countdown, 5);
        assert.equal(element.countdownInterval, null);
    } finally {
        if (hadWindow) {
            globalThis.window = previousWindow;
        } else {
            delete globalThis.window;
        }
        globalThis.clearInterval = previousClearInterval;
    }
});
