import type { Meta, StoryObj } from '@storybook/web-components';

import type { PageProps } from './Page/Page';
import * as HeaderStories from './Header/Header.stories';
import { LitButtonBase } from '../components/Button';

const meta = {
    title: 'Lit-Button',
    render: (args: PageProps) => LitButtonBase.renderTag(),
} satisfies Meta<PageProps>;

export default meta;
type Story = StoryObj<PageProps>;

export const LoggedIn: Story = {
    args: {
        // More on composing args: https://storybook.js.org/docs/writing-stories/args#args-composition
        ...HeaderStories.LoggedIn.args,
    },
};