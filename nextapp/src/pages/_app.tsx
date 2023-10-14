import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { createWeb3Modal, defaultWagmiConfig } from '@web3modal/wagmi/react'
import { WagmiConfig } from 'wagmi'
import { polygonMumbai } from 'wagmi/chains'



const projectId = process.env.WC_PROJECT_ID!

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
