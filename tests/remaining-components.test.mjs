import assert from 'node:assert/strict';
import test from 'node:test';

import { Button } from '../lib/components/Button/index.js';
import { DisconnectWalletButton } from '../lib/web-components/DisconnectWalletButton/index.js';

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

// Feature: A primary button exposes its requested size, color, label, and click behavior.
// Failure caught: Consumer configuration or the click binding is dropped from the rendered template.
// Negative control: The secondary rendering below must not retain the primary class.
test('Button renders primary configuration and invokes its click handler', () => {
    let clicks = 0;
    const rendered = Button({
        primary: true,
        backgroundColor: '#123456',
        size: 'large',
        label: 'Save wallet',
        onClick: () => clicks++
    });

    assert.equal(rendered.values[0], 'shared-button shared-button--large shared-button--primary');
    assert.deepEqual(rendered.values[1].values[0], { backgroundColor: '#123456' });
    assert.equal(rendered.values[3], 'Save wallet');
    rendered.values[2]();
    assert.equal(clicks, 1);

    const secondary = Button({ label: 'Cancel' });
    assert.equal(secondary.values[0], 'shared-button shared-button--medium shared-button--secondary');
    assert.notEqual(secondary.values[0], rendered.values[0]);
});

// Feature: Button size choices map to distinct public CSS classes.
// Failure caught: Small and medium requests collapse onto the same visual size.
// Negative control: The small class is explicitly compared with the default medium class.
test('Button keeps small and default-medium size states distinct', () => {
    const small = Button({ size: 'small', label: 'Small' });
    const defaultSize = Button({ label: 'Default' });

    assert.equal(small.values[0], 'shared-button shared-button--small shared-button--secondary');
    assert.equal(defaultSize.values[0], 'shared-button shared-button--medium shared-button--secondary');
    assert.notEqual(small.values[0], defaultSize.values[0]);
});

// Feature: The disconnect control displays a supplied wallet image and forwards clicks.
// Failure caught: The wallet identity or disconnect callback disappears from the control.
// Negative control: Removing the URL must replace the image with the fallback wallet SVG.
test('DisconnectWalletButton renders a wallet image and forwards clicks', () => {
    let clicks = 0;
    const element = new DisconnectWalletButton();
    element.walletIconUrl = 'https://example.test/wallet.png';
    element.onClick = () => clicks++;

    let rendered = element.render();
    assert.equal(customElements.get('disconnect-wallet-button'), DisconnectWalletButton);
    assert.match(templateText(rendered), /https:\/\/example\.test\/wallet\.png/);
    assert.match(templateText(rendered), /alt="Wallet Icon"/);
    rendered.values[0]();
    assert.equal(clicks, 1);

    element.walletIconUrl = '';
    rendered = element.render();
    assert.doesNotMatch(templateText(rendered), /alt="Wallet Icon"/);
    assert.match(templateText(rendered), /viewBox="0 0 512 512"/);
});

// Feature: Hovering swaps the connected-wallet graphic for the disconnect affordance.
// Failure caught: Mouse bindings fail to update hover state or render the disconnect icon.
// Negative control: Leaving restores the non-hover fallback instead of retaining the disconnect SVG.
test('DisconnectWalletButton toggles its disconnect affordance on hover', () => {
    const element = new DisconnectWalletButton();

    let rendered = element.render();
    assert.equal(element.showHoverIcon, false);
    assert.match(templateText(rendered), /Disconnect Wallet/);
    assert.doesNotMatch(templateText(rendered), /disconnect-svg/);

    rendered.values[1]();
    assert.equal(element.showHoverIcon, true);
    rendered = element.render();
    assert.match(templateText(rendered), /disconnect-svg/);

    rendered.values[2]();
    assert.equal(element.showHoverIcon, false);
    assert.doesNotMatch(templateText(element.render()), /disconnect-svg/);
});
