import { storybookPlugin } from '@web/dev-server-storybook';
import { esbuildPlugin } from '@web/dev-server-esbuild';
import baseConfig from '../web-dev-server.config.mjs';

export default /** @type {import('@web/dev-server').DevServerConfig} */ ({
    ...baseConfig,
    open: '/',
    plugins: [esbuildPlugin({ ts: true }), storybookPlugin({ type: 'web-components' }), ...baseConfig.plugins]
});
