import { CustomLoader } from '../components/CustomLoader/index.js';

export default {
    title: 'Components/Custom Loader',
    argeTypes: {
        size: { control: 'text' }
    }
};

export const Basic = CustomLoader.bind({});
