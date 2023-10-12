import Image from "next/image";
import * as fonts from "@/utils/fonts";
import { useWeb3Modal } from '@web3modal/wagmi/react'
import { useAccount, useBalance } from "wagmi";
import Link from "next/link";

export default function Navbar() {
    const { open } = useWeb3Modal()
    const account = useAccount()

    return <nav className="bg-black/40 w-full ring-4 ring-white/20 mx-auto p-3 flex sm:flex-row flex-col gap-4 justify-between items-center">
        {/* <Image src={gitravenLogo} alt="logo" className="invert opacity-95 ml-3" height={35} /> */}
        <Link href="/"><span className="text-4xl" style={fonts.nabla.style}>GitRaven</span></Link>
        <w3m-button loadingLabel="hol' up" size="md" />
    </nav>
}