import Image from "next/image"
import loadingGif from "../assets/loding.gif"

export default function Loader() {
    return <div className="flex flex-col justify-center items-center" suppressHydrationWarning>
        <Image src={loadingGif} alt="Loading" width={200} />
        <span className="text-xl font-bold mt-5">Connect Wallet to continue...</span>
    </div>
}