import { useRouter } from 'next/navigation'
import { useWeb3Modal } from '@web3modal/wagmi/react'
import { useAccount } from 'wagmi'
import { useEffect, useState } from 'react'

import Page from "@/components/page"
import * as fonts from "@/utils/fonts"
import Link from 'next/link'

export default function Home() {
  const account = useAccount()
  const router = useRouter()
  const { open } = useWeb3Modal()
  const [getStartedClicked, setGetStartedClicked] = useState(false)

  function getStarted() {
    if (account.isConnected) router.push("/dashboard")
    else open().then(() => setGetStartedClicked(true))
  }

  useEffect(() => {
    // if (getStartedClicked && account.isConnected) router.push("/dashboard")

  }, [getStartedClicked, account, router])

  return (
    <Page>
      <div className="h-[90vh] relative bottom-40 z-0 w-full flex flex-col justify-evenly items-center" id="hero">
        <div className="text-center text-4xl sm:text-6xl mt-10 " style={fonts.gabarito.style}>Earn 💴 from your contributions! 🧑‍💻</div>
        <Link className="btn btn-lg rounded-2xl bg-[#f39b48] text-black font-bold text-2xl hover:text-[#f39b48]" href="/bounties">Checkout Bounties</Link>
        <Link href="#never-gonna-give-you-up" className='absolute bottom-10'>how it works? 🤨</Link>
      </div>
      <div className='bg-white/10 h-screen w-full' id="never-gonna-give-you-up">
        insert illustration here
      </div>
    </Page>
  )
}
