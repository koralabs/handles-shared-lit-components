import assert from 'node:assert/strict';
import test from 'node:test';

import { CustomCheckBox } from '../lib/web-components/CustomCheckBox/index.js';
import { CustomToggle } from '../lib/web-components/CustomToggle/index.js';
import { DropdownButton } from '../lib/web-components/DropdownButton/index.js';
import { ErrorPopup } from '../lib/web-components/ErrorPopup/index.js';
import { SelectWallet } from '../lib/web-components/SelectWallet/index.js';

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

test('DropdownButton toggles between hidden/default and open/positioned dropdown states', () => {
    const element = new DropdownButton();
    element.dropdownPositioning = 'display: flex; position: relative;';

    let rendered = element.render();
    assert.equal(customElements.get('dropdown-button'), DropdownButton);
    assert.equal(rendered.values[1], 'Choose Handle');
    assert.equal(rendered.values[2], '');
    assert.equal(rendered.values[3], 'display: none;');

    rendered.values[0].call(element);
    element.dropdownHandle = '$kora';
    rendered = element.render();

    assert.equal(element.dropdownOpen, true);
    assert.equal(rendered.values[1], '$kora');
    assert.equal(rendered.values[2], 'open');
    assert.equal(rendered.values[3], 'display: flex; position: relative;');
});

test('SelectWallet renders empty and selected wallet states and forwards user callbacks', () => {
    const firstUpdates = [];
    const scrollEvents = [];
    const selectedWallets = [];
    const element = new SelectWallet();
    element.slottedButtonsStyling = 'display: grid;';
    element.onFirstUpdated = () => firstUpdates.push('first');
    element.onScroll = (event) => scrollEvents.push(event);
    element.onSelectWallet = (wallet) => selectedWallets.push(wallet);

    element.firstUpdated();
    let rendered = element.render();
    const scrollEvent = { type: 'scroll' };
    rendered.values[0](scrollEvent);

    assert.deepEqual(firstUpdates, ['first']);
    assert.deepEqual(scrollEvents, [scrollEvent]);
    assert.match(templateText(rendered.values[1]), /No supported wallet extensions found/);
    assert.equal(rendered.values[2], 'display: grid;');

    const lace = { key: 'lace', name: 'Lace', icon: 'lace.svg' };
    const nami = { key: 'nami', name: 'Nami', icon: 'nami.svg' };
    element.wallets = [lace, nami];
    element.selectedWallet = 'nami';

    rendered = element.render();
    const walletItems = rendered.values[1];
    assert.equal(walletItems.length, 2);
    assert.equal(walletItems[0].values[0], '');
    assert.equal(walletItems[0].values[2], 'inactive');
    assert.equal(walletItems[1].values[0], 'selected');
    assert.equal(walletItems[1].values[2], 'active');
    assert.equal(walletItems[1].values[3], 'nami.svg');
    assert.equal(walletItems[1].values[4], 'Nami');
    assert.equal(walletItems[1].values[5], 'selected');
    assert.equal(walletItems[1].values[6], 'Nami');
    assert.equal(walletItems[1].values[7].values[0], 'selected-div');
    assert.equal(walletItems[1].values[7].values[1], 'inner-selected-div');

    walletItems[0].values[1]();
    assert.deepEqual(selectedWallets, [lace]);
});

test('CustomCheckBox exposes checked, small, disabled, and hidden icon states in render output', () => {
    const element = new CustomCheckBox();

    let rendered = element.render();
    assert.equal(customElements.get('custom-checkbox'), CustomCheckBox);
    assert.equal(rendered.values[0], '');
    assert.equal(rendered.values[1], '');
    assert.equal(rendered.values[2], '');
    assert.equal(rendered.values[3], 'none');
    assert.equal(rendered.values[4], '');

    element.checked = true;
    element.smallCheckbox = true;
    element.disabled = true;
    rendered = element.render();

    assert.equal(rendered.values[0], 'checked');
    assert.equal(rendered.values[1], 'small');
    assert.equal(rendered.values[2], 'disabled');
    assert.equal(rendered.values[3], 'flex');
    assert.equal(rendered.values[4], 'disabled');
    assert.match(templateText(rendered), /checkbox checked small disabled/);
});

test('CustomToggle renders inactive, active, and compact switch classes after build import', () => {
    const element = new CustomToggle();

    let rendered = element.render();
    assert.equal(customElements.get('custom-toggle'), CustomToggle);
    assert.equal(rendered.values[0], '');
    assert.equal(rendered.values[1], '');
    assert.equal(rendered.values[2], '');
    assert.equal(rendered.values[3], '');

    element.isActive = true;
    element.smallToggle = true;
    rendered = element.render();

    assert.equal(rendered.values[0], 'toggled');
    assert.equal(rendered.values[1], 'small');
    assert.equal(rendered.values[2], 'toggled');
    assert.equal(rendered.values[3], 'small');
    assert.match(templateText(rendered), /line toggled small/);
    assert.match(templateText(rendered), /circle toggled small/);
});

test('ErrorPopup renders progress and dispatches close while clearing countdown state', () => {
    const element = new ErrorPopup();
    element.open = true;
    element.messageTitle = 'Wallet error';
    element.message = 'Try again';
    element.countdown = 3;

    const rendered = element.render();
    assert.equal(customElements.get('error-popup'), ErrorPopup);
    assert.equal(rendered.values[0], 'show');
    assert.equal(rendered.values[2], 'Wallet error');
    assert.equal(rendered.values[3], 'Try again');
    assert.equal(rendered.values[4], '60%');

    const hadWindow = Object.prototype.hasOwnProperty.call(globalThis, 'window');
    const previousWindow = globalThis.window;
    const previousClearInterval = globalThis.clearInterval;
    let dispatchedEvent;
    let clearedInterval;

    globalThis.window = {
        dispatchEvent(event) {
            dispatchedEvent = event;
            return true;
        }
    };
    globalThis.clearInterval = (intervalId) => {
        clearedInterval = intervalId;
    };

    try {
        element.countdown = 1;
        element.countdownInterval = 99;
        rendered.values[1].call(element);

        assert.equal(dispatchedEvent.type, 'error-popup-closed');
        assert.equal(clearedInterval, 99);
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
