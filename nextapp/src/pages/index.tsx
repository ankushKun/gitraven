import { useRouter } from 'next/navigation'

import { useWeb3Modal } from '@web3modal/wagmi/react'
import { useAccount } from 'wagmi'

import Page from "@/components/page"
import * as fonts from "@/utils/fonts"

export default function Home() {
  const router = useRouter()
  const { open } = useWeb3Modal()
  const account = useAccount()

  function getStarted() {
    if (account.isConnected) router.push("/dashboard")
    else open()
  }

  return (
    <Page>
      <div className="text-center text-4xl sm:text-6xl mt-10" style={fonts.gabarito.style}>Earn 💴 through contributions! 🧑‍💻</div>
      <button className="btn rounded-none my-40 bg-green-600 text-black font-bold text-2xl hover:text-green-600"
        onClick={getStarted} suppressHydrationWarning
      >{account.isConnected ? "Dashboard" : "Get Started"}</button>
    </Page>
  )
}
