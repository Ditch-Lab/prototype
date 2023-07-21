import { Magic } from '@magic-sdk/react-native-expo'
import {
  MAGIC_LINK_PUBLISHABLE_KEY,
  RPC_URL
} from '@env'

const customNodeOptions = {
  rpcUrl: RPC_URL, // Polygon Mumbai RPC URL
  chainId: 80001 // Polygon Mumbai chain id
}

export const magicClient = new Magic(MAGIC_LINK_PUBLISHABLE_KEY, { network: customNodeOptions })
