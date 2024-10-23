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
