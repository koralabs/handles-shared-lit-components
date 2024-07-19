import type { Meta, StoryObj } from '@storybook/web-components';

import type { PageProps } from './Page/Page';
import { CustomLoader } from '../components/CustomLoader';
import * as HeaderStories from './Header/Header.stories';

const meta = {
    title: 'custom-loader',
    render: (args: PageProps) => CustomLoader.renderTag(),
} satisfies Meta<PageProps>;

export default meta;
type Story = StoryObj<PageProps>;

export const LoggedIn: Story = {
    args: {
        // More on composing args: https://storybook.js.org/docs/writing-stories/args#args-composition
        ...HeaderStories.LoggedIn.args,
    },
};
