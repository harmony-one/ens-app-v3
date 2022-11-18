import { EthAddress } from '@app/types'

export const emptyAddress = '0x0000000000000000000000000000000000000000'

export const networkName = {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  '1': 'mainnet',
  // eslint-disable-next-line @typescript-eslint/naming-convention
  '5': 'goerli',
  // eslint-disable-next-line @typescript-eslint/naming-convention
  '4': 'rinkeby',
  // eslint-disable-next-line @typescript-eslint/naming-convention
  '3': 'ropsten',
  // eslint-disable-next-line @typescript-eslint/naming-convention
  '1337': 'local',
  // eslint-disable-next-line @typescript-eslint/naming-convention
  '1666600000': 'harmony',
  // eslint-disable-next-line @typescript-eslint/naming-convention
  '1666600001': 'harmony-s1',
}

interface ResolverAddresses {
  [key: string]: EthAddress[]
}

// Ordered by recency
export const RESOLVER_ADDRESSES: ResolverAddresses = {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  '1': [
    '0x4976fb03C32e5B8cfe2b6cCB31c09Ba78EBaBa41',
    '0xdaaf96c344f63131acadd0ea35170e7892d3dfba',
    '0x226159d592e2b063810a10ebf6dcbada94ed68b8',
    '0x1da022710df5002339274aadee8d58218e9d6ab5',
  ],
  // eslint-disable-next-line @typescript-eslint/naming-convention
  '5': [
    '0xE264d5bb84bA3b8061ADC38D3D76e6674aB91852',
    '0x121304143ea8101e69335f309e2062d299a234b5',
    '0xff77b96d6bafcec0d684bb528b22e0ab09c70663',
    '0x6e1b40ed2d626b97a43d2c12e48a6de49a03c7a4',
    '0xc1ea41786094d1fbe5aded033b5370d51f7a3f96',
    '0xbbe3fd189d18c8b73ba54e9dd01f89e6b3ee71f0',
    '0x4B1488B7a6B320d2D721406204aBc3eeAa9AD329',
  ],
  // eslint-disable-next-line @typescript-eslint/naming-convention
  '1337': [
    '0x4976fb03C32e5B8cfe2b6cCB31c09Ba78EBaBa41',
    '0xdaaf96c344f63131acadd0ea35170e7892d3dfba',
    '0x226159d592e2b063810a10ebf6dcbada94ed68b8',
    '0x1da022710df5002339274aadee8d58218e9d6ab5',
  ],
}

export const RESOLVER_INTERFACE_IDS = {
  addrInterfaceId: '0x3b3b57de',
  txtInterfaceId: '0x59d1d43c',
  contentHashInterfaceId: '0xbc1c58d1',
}

export const GRACE_PERIOD = 90 * 24 * 60 * 60 * 1000
