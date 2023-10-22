import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { createWeb3Modal, defaultWagmiConfig } from '@web3modal/wagmi/react'
import { WagmiConfig } from 'wagmi'
import { sepolia, polygonMumbai } from 'wagmi/chains'
import { SessionProvider } from "next-auth/react"




const projectId = "8eb3ea359713a5c3e40567c8f1178ea9"

const metadata = {
  name: 'GitRaven',
  description: 'Opensource bounty platorm',
  theme: 'dark'
}

const chains = [sepolia, polygonMumbai]
const wagmiConfig = defaultWagmiConfig({ chains, projectId, metadata })

createWeb3Modal({
  wagmiConfig, projectId, chains, themeVariables: {
    '--w3m-accent': "#f39b48",
    "--w3m-border-radius-master": "2px"
  }
})

function SafeHydrate({ children }: any) {
  return (
    <div suppressHydrationWarning>
      {typeof window === 'undefined' ? null : children}
    </div>
  )
}


export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return <WagmiConfig config={wagmiConfig}>
    <SessionProvider session={session}>
      <SafeHydrate>
        <Component {...pageProps} />
      </SafeHydrate>
    </SessionProvider>
  </WagmiConfig>
}
