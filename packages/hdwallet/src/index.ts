import HDNode from "hdkey";
import {
  generateMnemonic,
  mnemonicToSeedSync,
  // mnemonicToSeed
} from "bip39";

export class HDWallet {
  static defaultPath = "m/44'/503'/0'/0"; // default Conflux path-503
  mnemonic: string;
  password?: string;
  seed: Buffer;
  rootNode: HDNode;

  static generateMnemonic(): string {
    return generateMnemonic();
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
    return this.getPrivateKey(`${HDWallet.defaultPath}/${index}`);
  }
}
