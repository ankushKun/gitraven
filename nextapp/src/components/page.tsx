import Navbar from "./navbar"
import { useAccount } from "wagmi"
import { useEffect } from "react"
import { useRouter } from "next/router"
import Loader from "./loader"


export default function Page({ children, background, noLoading }: any) {
    const { isConnected } = useAccount()
    const router = useRouter()

    useEffect(() => {
        if (!isConnected && !noLoading) {
            setTimeout(() => {
                router.push("/")
            }, 5000)
        }
    }, [isConnected, router, noLoading])

    return <main className="min-h-screen sm:px-20 p-5 text-white/90 select-none"
        style={{ backgroundImage: "url('/background.jpg')", backgroundRepeat: "no-repeat", backgroundSize: "cover", backgroundPosition: "center center" }}>
        <Navbar />
        <main className={`p-5 my-10 mb-0 rounded-2xl flex flex-col items-center ${background ? "bg-black/30 ring-4 ring-white/20" : ""}`}>
            {isConnected || noLoading ? children : <Loader />}
        </main>
    </main>
}