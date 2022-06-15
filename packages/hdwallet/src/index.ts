import HDNode from "hdkey";
import {
  generateMnemonic,
  mnemonicToSeedSync,
  validateMnemonic,
  mnemonicToSeed,
} from "bip39";

export class HDWallet {
  static defaultBasePath = "m/44'/503'/0'/0"; // default Conflux path-503

  mnemonic: string;
  password?: string;
  seed: Buffer;
  rootNode: HDNode;

  static generateMnemonic(): string {
    return generateMnemonic();
  }

  static validateMnemonic(mnemonic: string, wordlist?: string[]): boolean {
    return validateMnemonic(mnemonic, wordlist);
  }

  static mnemonicToSeed(mnemonic: string, password?: string): Promise<Buffer> {
    return mnemonicToSeed(mnemonic, password);
  }

  constructor(mnemonic: string, password?: string) {
    this.mnemonic = mnemonic;
    this.password = password;
    this.seed = mnemonicToSeedSync(mnemonic, password);
    this.rootNode = HDNode.fromMasterSeed(this.seed);
  }

  getPrivateKey(path: string): Buffer {
    return this.rootNode.derive(path).privateKey;
  }

  getPrivateKeyByIndex(index: number): Buffer {
    return this.getPrivateKey(`${HDWallet.defaultBasePath}/${index}`);
  }
}
