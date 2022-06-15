import { HDWallet } from '../src/index';

const TestMnemonic = 'faint also eye industry survey unhappy boil public lemon myself cube sense';

test('Random generate', () => {
  expect(typeof HDWallet.generateMnemonic()).toBe('string');
});

test('Validate', () => {
  expect(HDWallet.validateMnemonic(TestMnemonic)).toBe(true);
  expect(HDWallet.validateMnemonic('a b c')).toBe(false);
});

test('derive key', () => {
  const wallet = new HDWallet(TestMnemonic);
  const first = wallet.getPrivateKeyByIndex(0);
  expect(first.toString('hex')).toBe('40d0f137665463584cc57fce2b761572a85d1cbf1601fc93d001c129b2a11c92');
});