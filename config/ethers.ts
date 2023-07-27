import '@ethersproject/shims'

import { Buffer } from 'buffer'
import { ethers } from 'ethers'
import { magicClient } from '../config/magicLink'
global.Buffer = global.Buffer || Buffer

const ethersProvider = new ethers.providers.Web3Provider(magicClient.rpcProvider)

const getChainId = async () => {
  try {
    const networkDetails = await ethersProvider.getNetwork()
    return networkDetails
  } catch (error) {
    return error
  }
}

const getBalance = async (address: string): Promise<string> => {
  try {
    const weiBalance = await ethersProvider.getBalance(address)
    const balance = ethers.utils.formatEther(weiBalance)

    return balance
  } catch (error) {
    console.log(error)
    return error
  }
}

export default {
  getChainId,
  getBalance
//   sendTransaction,
//   signMessage
}
