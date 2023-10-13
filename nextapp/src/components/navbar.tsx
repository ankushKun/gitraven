import * as fonts from "@/utils/fonts";
import Link from "next/link";

export default function Navbar() {

    return <nav className="bg-black/40 z-10 relative w-full rounded-2xl ring-4 ring-white/20 mx-auto p-3 flex sm:flex-row flex-col gap-4 justify-between items-center">
        {/* <Image src={gitravenLogo} alt="logo" className="invert opacity-95 ml-3" height={35} /> */}
        <Link href="/"><span className="text-4xl" style={fonts.nabla.style}>GitRaven</span></Link>
        <div className="flex gap-5">
            <w3m-button loadingLabel="hol' up" size="md" />
            <Link href="/dashboard">dash</Link>
        </div>
    </nav>
}