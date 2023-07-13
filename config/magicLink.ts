import { Magic } from '@magic-sdk/react-native-expo'
import {
  MAGIC_LINK_PUBLISHABLE_KEY
} from '@env'

export const magicClient = new Magic(MAGIC_LINK_PUBLISHABLE_KEY)
