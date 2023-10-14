import { useEffect, useState } from "react"
import { useAccount } from "wagmi"

export default function Bounties() {
    const account = useAccount()
    const [myBounties, setMyBounties] = useState([])

    useEffect(() => {
        if (account.isConnected) {
            // fetch my bounties
        }
    }, [account.isConnected])

    return <div className="w-full relative">
        <details className="relative">
            <summary className="btn btn-secondary">New</summary>
            <div className="py-2 w-full flex flex-col gap-2">
                <input type="text" placeholder="Bounty Title" className="input input-sm text-white bg-transparent input-secondary bg-none w-full" />
                <textarea placeholder="Give detailed description" className="textarea text-white bg-transparent input-secondary bg-none w-full" />
                <input type="url" placeholder="Repo/Issue link" className="input input-sm text-white bg-transparent input-secondary bg-none w-full" />
                <div className="form-control w-full">
                    <input type="number" placeholder="Bounty Amount (ETH)" className="input input-sm text-white bg-transparent input-secondary bg-none w-full" />
                    <label className="label-text text-white/50" >~$0.1</label>
                </div>
                <button className="btn btn-primary">Create</button>
            </div>
        </details>
        <div>
            {/* list created bounties */}

        </div>
    </div>
}