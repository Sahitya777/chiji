import { http, createConfig } from '@wagmi/core'
import { baseSepolia, mainnet, sepolia } from '@wagmi/core/chains'
import { cookieStorage, createStorage } from 'wagmi'
import { coinbaseWallet, metaMask, walletConnect } from 'wagmi/connectors'

export const projectId = '<WALLETCONNECT_PROJECT_ID>' as string

export const config = createConfig({
  chains: [baseSepolia],
  connectors:[metaMask(),coinbaseWallet(),walletConnect({projectId})],
  ssr: true,
  storage: createStorage({
    storage: cookieStorage,
  }),
  transports: {
    [baseSepolia.id]: http(),
  },
})