import { config } from '../config'
import forge from 'node-forge';

export function encryptEntitySecret(publicKeyString: string): string {
    const entitySecret = forge.util.hexToBytes(config.entitySecret);
    const publicKey = forge.pki.publicKeyFromPem(publicKeyString);
    const encryptedData = publicKey.encrypt(entitySecret, 'RSA-OAEP', { md: forge.md.sha256.create(), mgf1: { md: forge.md.sha256.create(), }, });
    return encryptedData
} 
