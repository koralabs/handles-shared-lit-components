import { getHelios, getNameFromHex, POLICY_ID, WalletHandle } from '.';
import * as helios from '../helios';

declare global {
    interface Window {
        cardano: any;
    }
}

export const walletHandles = async (): Promise<WalletHandle[]> => {
    let heliosInstance: any | null = null;
    let walletConnectErrorMessage = '';


    const walletKey = localStorage.getItem('walletKey');
    if (!walletKey) {
        return [];
    }

    const enableWallet = async (walletKey: string) => {
        try {
            if (window.cardano[walletKey]) {
                const enabledHandle = await window.cardano[walletKey].enable();
                return enabledHandle;
            } else {
                console.error('unable to access this wallet on this network')
            }
        } catch (error) {
            walletConnectErrorMessage = (error as any).message || 'Unknown error';
            return null;
        }
    };

    const getBuiltUtxos = async (wallet: helios.Cip30Wallet): Promise<helios.TxInput[]> => {
        const utxos = await wallet.utxos;
        return utxos;
    };

    const buildWalletNFTs = (builtUtxos: helios.TxInput[]): { handles: WalletHandle[] } => {
        return builtUtxos.reduce<{ handles: WalletHandle[] }>((agg, utxo) => {
            const { assets } = utxo.value;
            const assetsObj = assets.dump();

            for (const policyId of Object.keys(assetsObj)) {
                if (policyId === POLICY_ID) {
                    const items = assetsObj[policyId as keyof typeof assetsObj];
                    for (const [hex, count] of Object.entries(items)) {
                        const name = getNameFromHex(hex);
                        const updatedAsset: WalletHandle = {
                            default: false,
                            hex,
                            count: parseInt(count as string
                            ),
                            name,
                            policyId,
                            active: undefined
                        };
                        agg.handles.push(updatedAsset);
                    }
                }
            }
            return agg;
        }, { handles: [] });
    };



    const connectedHandle = await enableWallet(walletKey);

    if (!connectedHandle) {
        return [];
    }

    const helios = await getHelios();
    const heliosWallet = new helios.Cip30Wallet(connectedHandle);
    const builtUtxos = await getBuiltUtxos(heliosWallet);
    const { handles } = buildWalletNFTs(builtUtxos);

    return handles;
};
