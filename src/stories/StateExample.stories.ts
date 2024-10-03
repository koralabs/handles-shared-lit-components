import { html, TemplateResult } from 'lit';
import '../web-components/StateExample/index.js';

export default {
    title: 'Components/State Example',
    component: 'state-example',
    argTypes: {
        count: { control: 'number' }
    }
};

interface Story<T> {
    (args: T): TemplateResult;
    args?: Partial<T>;
    argTypes?: Record<string, unknown>;
}

interface ArgTypes {
    title?: string;
    count?: number;
    textColor?: string;
    slot?: TemplateResult;
    handleData?: Array<any>;
    route?: string;
}
const handleData = [
    { policyId: 'f0ff48bbb7bbe9d59a40f1ce90e9e9d0ff5002ec48f232b49ca0fb9a', name: 'dilemma', hex: '000de14064696c656d6d61', utxo: '9318403999df7386fe05d1d0d5ae8f2b5a6bc9f1aab6be29e8553b30263dc1d4#1', image: 'ipfs://zb2rhaiihMSGYvGrJa1asFbo4b1oN9Kqz7P8rZccy3onuTwSZ' },
    { policyId: 'f0ff48bbb7bbe9d59a40f1ce90e9e9d0ff5002ec48f232b49ca0fb9a', name: 'grim-reaper', hex: '000de1406772696d2d726561706572', utxo: '7557d062e12def36e10669c8f2008376ac429b57987571b331492c3e76896014#0', image: 'ipfs://zb2rhcyMtuL1AhVBL7L4E2TmpTgLaTMyrgz4Nt14rxxjVueV3' },
    { policyId: 'f0ff48bbb7bbe9d59a40f1ce90e9e9d0ff5002ec48f232b49ca0fb9a', name: 'sorcerer', hex: '000de140736f726365726572', utxo: '30c94d33bcfca391ed7da18203469aef5fc283d0fbd6c320c6d206e89b37f6f7#1', image: 'ipfs://zb2rhiNnJR7TmEAfT1QZQGZCTcASfMhSNR3uFNdQoBzV8ZyAL' },
    { policyId: 'f0ff48bbb7bbe9d59a40f1ce90e9e9d0ff5002ec48f232b49ca0fb9a', name: 'tst_mig_0070', hex: '000de1407473745f6d69675f30303730', utxo: 'b3febdb68b175868b019ab55fcb4df1cbebfc63453f5e7043b3ce2314f66dd57#1', image: 'ipfs://zb2rhbm6SWz2jyoCYWS349ijEqWSUjqKu1n4JMs668tdbRFMt' },
    { policyId: 'f0ff48bbb7bbe9d59a40f1ce90e9e9d0ff5002ec48f232b49ca0fb9a', name: 'tst_mig_0300', hex: '7473745f6d69675f30333030', utxo: 'ff0418a491f397582bbb49e02870b48d6d8f8309d6a82afdfa8d867b6bd6d4b7#0', image: 'ipfs://QmfK7XhvN4rawMYsHKVTa7ksRVSatZE8yWjJTt5ffQDPgR' },
    { policyId: 'f0ff48bbb7bbe9d59a40f1ce90e9e9d0ff5002ec48f232b49ca0fb9a', name: 'tst_mig_0301', hex: '7473745f6d69675f30333031', utxo: 'ff0418a491f397582bbb49e02870b48d6d8f8309d6a82afdfa8d867b6bd6d4b7#0', image: 'ipfs://QmPMHXiHioH4PHd81JcrgiX7CmY3Niio6HthuM9JNFvCFd' },
    { policyId: 'f0ff48bbb7bbe9d59a40f1ce90e9e9d0ff5002ec48f232b49ca0fb9a', name: 'tst_mig_0302', hex: '7473745f6d69675f30333032', utxo: 'ff0418a491f397582bbb49e02870b48d6d8f8309d6a82afdfa8d867b6bd6d4b7#0', image: 'ipfs://QmVjvybu18gtbUuWaTZPd49wtPzhbJgHEU7mXL2PBUB3DX' },
    { policyId: 'f0ff48bbb7bbe9d59a40f1ce90e9e9d0ff5002ec48f232b49ca0fb9a', name: 'tst_mig_0303', hex: '7473745f6d69675f30333033', utxo: 'ff0418a491f397582bbb49e02870b48d6d8f8309d6a82afdfa8d867b6bd6d4b7#0', image: 'ipfs://Qmbgrik8tWrkGkyHdzeBJC81RyxhxLeXtWuZcbfcCChsFp' },
    { policyId: 'f0ff48bbb7bbe9d59a40f1ce90e9e9d0ff5002ec48f232b49ca0fb9a', name: 'tst_mig_0304', hex: '7473745f6d69675f30333034', utxo: 'ff0418a491f397582bbb49e02870b48d6d8f8309d6a82afdfa8d867b6bd6d4b7#0', image: 'ipfs://QmPbZwBb9bnubArRKX2JMNDatpYGpKXcPgBDjFBCtM8XpJ' },
    { policyId: 'f0ff48bbb7bbe9d59a40f1ce90e9e9d0ff5002ec48f232b49ca0fb9a', name: 'tst_mig_0305', hex: '7473745f6d69675f30333035', utxo: 'ff0418a491f397582bbb49e02870b48d6d8f8309d6a82afdfa8d867b6bd6d4b7#0', image: 'ipfs://QmYjhgJHM226qjFcDkPEdviNDpmw44Y3fiLGkKY78sexj9' },
    { policyId: 'f0ff48bbb7bbe9d59a40f1ce90e9e9d0ff5002ec48f232b49ca0fb9a', name: 'tst_mig_0306', hex: '7473745f6d69675f30333036', utxo: 'ff0418a491f397582bbb49e02870b48d6d8f8309d6a82afdfa8d867b6bd6d4b7#0', image: 'ipfs://QmdJtEdw3tDwNNpJ4FtB2YVZxZJerpwZyLmZ8hLGAF4N6R' },
    { policyId: 'f0ff48bbb7bbe9d59a40f1ce90e9e9d0ff5002ec48f232b49ca0fb9a', name: 'tst_mig_0307', hex: '7473745f6d69675f30333037', utxo: 'ff0418a491f397582bbb49e02870b48d6d8f8309d6a82afdfa8d867b6bd6d4b7#0', image: 'ipfs://QmQN5tK7zKdLGCvvzeHBL9LtmjRHWxetMosKw4krbuyKvm' },
    { policyId: 'f0ff48bbb7bbe9d59a40f1ce90e9e9d0ff5002ec48f232b49ca0fb9a', name: 'tst_mig_0308', hex: '7473745f6d69675f30333038', utxo: 'ff0418a491f397582bbb49e02870b48d6d8f8309d6a82afdfa8d867b6bd6d4b7#0', image: 'ipfs://QmdKzdb5b3TY6BW9iJkqWqDFDtxmUTPWX4Kp5HRRwGJAea' },
    { policyId: 'f0ff48bbb7bbe9d59a40f1ce90e9e9d0ff5002ec48f232b49ca0fb9a', name: 'tst_mig_0309', hex: '7473745f6d69675f30333039', utxo: 'ff0418a491f397582bbb49e02870b48d6d8f8309d6a82afdfa8d867b6bd6d4b7#0', image: 'ipfs://QmaR8NFA8PwL92EmH4zudaVcPxa6J2kCBeKy1uDLoKz6vV' },
    { policyId: 'f0ff48bbb7bbe9d59a40f1ce90e9e9d0ff5002ec48f232b49ca0fb9a', name: 'tst_mig_0310', hex: '7473745f6d69675f30333130', utxo: 'ff0418a491f397582bbb49e02870b48d6d8f8309d6a82afdfa8d867b6bd6d4b7#0', image: 'ipfs://QmSPL94dn169vwv2zvKXrytxageks33my5p8ynZtdKPUnR' }
];
const route = 'https://public-handles.myfilebase.com';

const Template: Story<ArgTypes> = ({ title = 'Hello world', count = 5, textColor, slot, }: ArgTypes) => html` 
    <state-example style="--my-counter-text-color: ${textColor || 'black'}" .title=${title} .count=${count}> 
        ${slot} 
    <select-handle .handleData=${handleData} .route=${route}> </select-handle>
    </state-example>
`;

export const Regular = Template.bind({});

export const CustomTitle = Template.bind({});
CustomTitle.args = {
    title: 'My title'
};

export const CustomCounter = Template.bind({});
CustomCounter.args = {
    count: 123456
};

export const SlottedContent = Template.bind({});
SlottedContent.args = {
    slot: html`<p>Slotted content</p>`
};
SlottedContent.argTypes = {
    slot: { table: { disable: true } }
};
