import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { createWeb3Modal, defaultWagmiConfig } from '@web3modal/wagmi/react'
import { WagmiConfig } from 'wagmi'
import { polygonMumbai } from 'wagmi/chains'



const projectId = "8eb3ea359713a5c3e40567c8f1178ea9"

const metadata = {
  name: 'GitRaven',
  description: 'Opensource bounty platorm',
  theme: 'dark'
}

const chains = [polygonMumbai]
const wagmiConfig = defaultWagmiConfig({ chains, projectId, metadata })

createWeb3Modal({
  wagmiConfig, projectId, chains, themeVariables: {
    '--w3m-accent': "#f39b48",
    "--w3m-border-radius-master": "2px"
  }
})


export default function App({ Component, pageProps }: AppProps) {
  return <WagmiConfig config={wagmiConfig}>
    <Component {...pageProps} />
  </WagmiConfig>
}
