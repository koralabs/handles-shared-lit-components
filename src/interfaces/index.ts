interface WalletHandle extends Asset {
    active: any;
    default: boolean;
    image?: string;
    imageUrl?: string;
}

interface Asset extends BasicAsset {
    name: string;
    count?: number;
    utxo?: string;
    image?: string;
    src?: string;
    price?: number;
    cost?: number;
    validUntilDate?: number;
}

interface BasicAsset {
    policyId: string;
    hex: string;
}