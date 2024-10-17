import * as helios from '../helios.js';


let heliosInstance: any = null;

export const getHelios = (): any => {
    if (!heliosInstance) {
        heliosInstance = helios;
        if (IS_PRODUCTION) {
            heliosInstance.config.IS_TESTNET = false;
        }
    }
    return heliosInstance;
};

export const walletHandles = async (): Promise<WalletHandle[]> => {
    let heliosInstance: any | null = null;
    let walletConnectErrorMessage = '';

    // Get the singleton instance of ErrorPopupHandler


    const enableWallet = async (walletKey: string) => {
        try {
            const enabledHandle = await window.cardano[walletKey].enable();
            return enabledHandle;
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
                            count: parseInt(count as string),
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

    // Get walletKey from localStorage
    const walletKey = localStorage.getItem('connectedWalletKey');
    if (!walletKey) {
        return [];
    }

    const connectedHandle = await enableWallet(walletKey);

    if (!connectedHandle) {
        return [];
    }

    const helios = await getHelios();
    const heliosWallet = new helios.Cip30Wallet(connectedHandle);
    const builtUtxos = await getBuiltUtxos(heliosWallet);
    const { handles } = buildWalletNFTs(builtUtxos);

    return handles;
}

// Check if the code is running on the server or client
export const IS_SERVER: boolean = typeof process !== 'undefined' && typeof process.versions.node !== 'undefined';

// Check if the environment is production and the network is mainnet
export const IS_PRODUCTION: boolean = IS_SERVER
    ? (process.env.NODE_ENV?.trim() === 'production' && process.env.NETWORK?.toLowerCase() === 'mainnet')
    : !(window.location.host.includes('preview.') ||
        window.location.host.includes('preprod.') ||
        window.location.host.includes('localhost'));

// Define the authorization grant duration
export const AUTH_GRANT_DURATION: number = 1000 * 60 * 60 * 24 * 30; // 30 days

export const delay: (ms: number) => Promise<void> = (ms) => new Promise<void>((resolve) => setTimeout(resolve, ms));

export const POLICY_ID = 'f0ff48bbb7bbe9d59a40f1ce90e9e9d0ff5002ec48f232b49ca0fb9a';

export const getNameFromHex = (hex: string): string => {
    const hexWithoutPrefix = hex.replace('0x', '').replace(AssetNameLabel.LBL_222, '').replace(AssetNameLabel.LBL_444, '');
    const bufferArray = hexWithoutPrefix.match(/.{1,2}/g)?.map(byte => parseInt(byte, 16));
    const hexArray = bufferArray ? new Uint8Array(bufferArray) : new Uint8Array();
    const buffer = hexArray.buffer;
    return new TextDecoder().decode(buffer);
};

// Environment variables handling
const getEnvVariable = (variableName: string, defaultValue: string) => {
    if (IS_SERVER) {
        return process.env[variableName] ?? defaultValue;
    } else {
        return defaultValue;
    }
};

export const IPFS_GATEWAY = getEnvVariable('PUBLIC_IPFS_GATEWAY', 'https://public-handles.myfilebase.com');
export const IPFS_GATEWAY_RESIZE_QUERY = getEnvVariable('PUBLIC_IPFS_GATEWAY_RESIZE_QUERY', '?img-width=512');


export interface BasicAsset {
    policyId: string;
    hex: string;
}
export interface Asset extends BasicAsset {
    name: string;
    count?: number;
    utxo?: string;
    image?: string;
    src?: string;
    price?: number;
    cost?: number;
    validUntilDate?: number;
}
export interface WalletHandle extends Asset {
    active: any;
    default: boolean;
    image?: string;
    imageUrl?: string;
}
export enum AssetNameLabel {
    LBL_000 = "00000000",
    LBL_001 = "00001070",
    LBL_002 = "000020e0",
    LBL_100 = "000643b0",
    LBL_222 = "000de140",
    LBL_444 = "001bc280"
}


export const handleData = [
    {
        "default": false,
        "hex": "000de14064696c656d6d61",
        "count": 1,
        "name": "dilemma",
        "policyId": "f0ff48bbb7bbe9d59a40f1ce90e9e9d0ff5002ec48f232b49ca0fb9a"
    },
    {
        "default": false,
        "hex": "000de1406772696d2d726561706572",
        "count": 1,
        "name": "grim-reaper",
        "policyId": "f0ff48bbb7bbe9d59a40f1ce90e9e9d0ff5002ec48f232b49ca0fb9a"
    },
    {
        "default": false,
        "hex": "000de140736f726365726572",
        "count": 1,
        "name": "sorcerer",
        "policyId": "f0ff48bbb7bbe9d59a40f1ce90e9e9d0ff5002ec48f232b49ca0fb9a"
    },
    {
        "default": false,
        "hex": "000de1407468656f6e6572696e67",
        "count": 1,
        "name": "theonering",
        "policyId": "f0ff48bbb7bbe9d59a40f1ce90e9e9d0ff5002ec48f232b49ca0fb9a"
    },
    {
        "default": false,
        "hex": "000de1407473745f6d69675f30303730",
        "count": 1,
        "name": "tst_mig_0070",
        "policyId": "f0ff48bbb7bbe9d59a40f1ce90e9e9d0ff5002ec48f232b49ca0fb9a"
    },
    {
        "default": false,
        "hex": "7473745f6d69675f30333030",
        "count": 1,
        "name": "tst_mig_0300",
        "policyId": "f0ff48bbb7bbe9d59a40f1ce90e9e9d0ff5002ec48f232b49ca0fb9a"
    },
    {
        "default": false,
        "hex": "7473745f6d69675f30333031",
        "count": 1,
        "name": "tst_mig_0301",
        "policyId": "f0ff48bbb7bbe9d59a40f1ce90e9e9d0ff5002ec48f232b49ca0fb9a"
    },
    {
        "default": false,
        "hex": "7473745f6d69675f30333032",
        "count": 1,
        "name": "tst_mig_0302",
        "policyId": "f0ff48bbb7bbe9d59a40f1ce90e9e9d0ff5002ec48f232b49ca0fb9a"
    },
    {
        "default": false,
        "hex": "7473745f6d69675f30333033",
        "count": 1,
        "name": "tst_mig_0303",
        "policyId": "f0ff48bbb7bbe9d59a40f1ce90e9e9d0ff5002ec48f232b49ca0fb9a"
    },
    {
        "default": false,
        "hex": "7473745f6d69675f30333034",
        "count": 1,
        "name": "tst_mig_0304",
        "policyId": "f0ff48bbb7bbe9d59a40f1ce90e9e9d0ff5002ec48f232b49ca0fb9a"
    },
    {
        "default": false,
        "hex": "7473745f6d69675f30333035",
        "count": 1,
        "name": "tst_mig_0305",
        "policyId": "f0ff48bbb7bbe9d59a40f1ce90e9e9d0ff5002ec48f232b49ca0fb9a"
    },
    {
        "default": false,
        "hex": "7473745f6d69675f30333036",
        "count": 1,
        "name": "tst_mig_0306",
        "policyId": "f0ff48bbb7bbe9d59a40f1ce90e9e9d0ff5002ec48f232b49ca0fb9a"
    },
    {
        "default": false,
        "hex": "7473745f6d69675f30333037",
        "count": 1,
        "name": "tst_mig_0307",
        "policyId": "f0ff48bbb7bbe9d59a40f1ce90e9e9d0ff5002ec48f232b49ca0fb9a"
    },
    {
        "default": false,
        "hex": "7473745f6d69675f30333038",
        "count": 1,
        "name": "tst_mig_0308",
        "policyId": "f0ff48bbb7bbe9d59a40f1ce90e9e9d0ff5002ec48f232b49ca0fb9a"
    },
    {
        "default": false,
        "hex": "7473745f6d69675f30333039",
        "count": 1,
        "name": "tst_mig_0309",
        "policyId": "f0ff48bbb7bbe9d59a40f1ce90e9e9d0ff5002ec48f232b49ca0fb9a"
    },
    {
        "default": false,
        "hex": "7473745f6d69675f30333130",
        "count": 1,
        "name": "tst_mig_0310",
        "policyId": "f0ff48bbb7bbe9d59a40f1ce90e9e9d0ff5002ec48f232b49ca0fb9a"
    },
    {
        "default": false,
        "hex": "7473745f6d69675f30333131",
        "count": 1,
        "name": "tst_mig_0311",
        "policyId": "f0ff48bbb7bbe9d59a40f1ce90e9e9d0ff5002ec48f232b49ca0fb9a"
    },
    {
        "default": false,
        "hex": "7473745f6d69675f30333132",
        "count": 1,
        "name": "tst_mig_0312",
        "policyId": "f0ff48bbb7bbe9d59a40f1ce90e9e9d0ff5002ec48f232b49ca0fb9a"
    },
    {
        "default": false,
        "hex": "7473745f6d69675f30333133",
        "count": 1,
        "name": "tst_mig_0313",
        "policyId": "f0ff48bbb7bbe9d59a40f1ce90e9e9d0ff5002ec48f232b49ca0fb9a"
    },
    {
        "default": false,
        "hex": "7473745f6d69675f30333134",
        "count": 1,
        "name": "tst_mig_0314",
        "policyId": "f0ff48bbb7bbe9d59a40f1ce90e9e9d0ff5002ec48f232b49ca0fb9a"
    },
    {
        "default": false,
        "hex": "7473745f6d69675f30333135",
        "count": 1,
        "name": "tst_mig_0315",
        "policyId": "f0ff48bbb7bbe9d59a40f1ce90e9e9d0ff5002ec48f232b49ca0fb9a"
    },
    {
        "default": false,
        "hex": "7473745f6d69675f30333136",
        "count": 1,
        "name": "tst_mig_0316",
        "policyId": "f0ff48bbb7bbe9d59a40f1ce90e9e9d0ff5002ec48f232b49ca0fb9a"
    },
    {
        "default": false,
        "hex": "7473745f6d69675f30333137",
        "count": 1,
        "name": "tst_mig_0317",
        "policyId": "f0ff48bbb7bbe9d59a40f1ce90e9e9d0ff5002ec48f232b49ca0fb9a"
    },
    {
        "default": false,
        "hex": "7473745f6d69675f30333138",
        "count": 1,
        "name": "tst_mig_0318",
        "policyId": "f0ff48bbb7bbe9d59a40f1ce90e9e9d0ff5002ec48f232b49ca0fb9a"
    },
    {
        "default": false,
        "hex": "7473745f6d69675f30333139",
        "count": 1,
        "name": "tst_mig_0319",
        "policyId": "f0ff48bbb7bbe9d59a40f1ce90e9e9d0ff5002ec48f232b49ca0fb9a"
    },
    {
        "default": false,
        "hex": "7473745f6d69675f30333230",
        "count": 1,
        "name": "tst_mig_0320",
        "policyId": "f0ff48bbb7bbe9d59a40f1ce90e9e9d0ff5002ec48f232b49ca0fb9a"
    },
    {
        "default": false,
        "hex": "7473745f6d69675f30333231",
        "count": 1,
        "name": "tst_mig_0321",
        "policyId": "f0ff48bbb7bbe9d59a40f1ce90e9e9d0ff5002ec48f232b49ca0fb9a"
    }
]