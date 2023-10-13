import Page from "@/components/page"
import * as fonts from "@/utils/fonts"
import { useEffect, useState } from "react"
import { useAccount } from "wagmi"
import { useRouter } from "next/navigation"

import Profile from "@/components/dashboard/profile"
import Bounties from "@/components/dashboard/bounties"
import Bookmarks from "@/components/dashboard/bookmarks"
import Settings from "@/components/dashboard/settings"

export default function Dashboard() {
    const account = useAccount()
    const router = useRouter()
    const [tabName, setTabName] = useState("")

    useEffect(() => setTabName("Profile"), [])

    useEffect(() => { if (!account.isConnected) router.push("/") }, [account, router])

    const TabButton = ({ text }: any) => {
        return <button className="btn btn-ghost" onClick={() => setTabName(text)}>{text}</button>
    }

    return <Page background>
        <span className="text-4xl mb-5" style={fonts.nabla.style}>Dashboard</span>
        <div className="flex flex-col sm:flex-row w-full border-t border-white/30">
            <div className="border-r border-white/30 flex flex-row sm:flex-col gap-5 p-5 overflow-scroll">
                <TabButton text="Profile" />
                <TabButton text="My Bounties" />
                <TabButton text="Bookmarks" />
                <TabButton text="Settings" />
            </div>
            <div className="p-5 overflow-scroll">
                {tabName === "Profile" && <Profile />}
                {tabName === "My Bounties" && <Bounties />}
                {tabName === "Bookmarks" && <Bookmarks />}
                {tabName === "Settings" && <Settings />}
            </div>
        </div>
    </Page>
}