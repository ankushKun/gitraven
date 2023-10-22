import { useEffect, useState } from "react"
import { useAccount, useContractWrite } from "wagmi"
import { useContractRead } from "wagmi"
import { contractAddress, contractAbi } from "@/utils/blockchain"
import { ethers } from "ethers"
import { toast } from "react-toastify"

export default function Bounties() {
    const account = useAccount()
    const [myBounties, setMyBounties] = useState([])
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [url, setUrl] = useState("")
    const [tags, setTags] = useState("")
    const [amount, setAmount] = useState("") //wei

    useEffect(() => {
        console.log(account.address)
        if (!account.address) return
        fetch("/api/get-bounties", {
            method: "POST",
            body: JSON.stringify({ maintainer: account.address.toLowerCase() }),
            headers: { "Content-Type": "application/json" }
        }).then(res => res.json()).then(data => {
            console.log(data)
            setMyBounties(data.results)
        }).catch(e => {
            console.log(e)
        })
    }, [account.address])


    const addFreeBounty = useContractWrite({
        address: contractAddress,
        abi: contractAbi,
        functionName: "addFreeBounty",
        onSuccess: () => {
            toast.success("Free Bounty created")
            setTitle("")
            setDescription("")
            setUrl("")
            setTags("")
            setAmount("")
        },
        onError: (e) => {
            toast.error(e.message)
        }
    })

    const addPaidBounty = useContractWrite({
        address: contractAddress,
        abi: contractAbi,
        functionName: "addPaidBounty",
        onSuccess: () => {
            toast.success("Paid Bounty created")
            setTitle("")
            setDescription("")
            setUrl("")
            setTags("")
            setAmount("")
        },
        onError: (e) => {
            toast.error(e.message)
        }
    })


    useEffect(() => {
        if (account.isConnected) {
            // fetch my bounties

        }
    }, [account.isConnected])

    function createBounty() {
        if (title && description && url && tags) {
            if (parseFloat(amount) > 0) {
                addPaidBounty.write({
                    args: [title, description, url, tags],
                    value: ethers.utils.parseEther(amount).toBigInt()
                })
            }
            else {
                addFreeBounty.write({
                    args: [title, description, url, tags],
                })
            }
        } else {
            alert("enter details")
        }
    }

    return <div className="w-full relative">
        <details className="relative">
            <summary className="btn btn-secondary">New</summary>
            <div className="py-2 w-full flex flex-col gap-2">
                <input type="text" placeholder="Bounty Title" className="input input-sm text-white bg-transparent input-secondary bg-none w-full" onChange={(e) => setTitle(e.target.value)} />
                <textarea placeholder="Give detailed description" className="textarea text-white bg-transparent input-secondary bg-none w-full" onChange={(e) => setDescription(e.target.value)} />
                <input type="url" placeholder="Repo/Issue link" className="input input-sm text-white bg-transparent input-secondary bg-none w-full" onChange={(e) => setUrl(e.target.value)} />
                <input type="text" placeholder="tags (comma seperated)" className="input input-sm text-white bg-transparent input-secondary bg-none w-full" onChange={(e) => setTags(e.target.value)} />
                <div className="form-control w-full">
                    <input type="number" placeholder="Bounty Amount (ETH)" defaultValue={0} className="input input-sm text-white bg-transparent input-secondary bg-none w-full" onChange={(e) => setAmount(e.target.value)} />
                    {/* <label className="label-text text-white/50" >~$0.1</label> */}
                </div>
                <button className="btn btn-primary" onClick={createBounty}>Create</button>
            </div>
        </details>
        <div>
            <div className="text-center">My bounties</div>
            {/* list created bounties */}
            {myBounties.map((bounty: any, i: number) => {
                return <div className="flex flex-col gap-2 border-b border-white/20 py-2" key={i}>
                    <div className="flex flex-row justify-between">
                        <div className="text-lg">{bounty.title}</div>
                        <div className="text-sm">{bounty.amount} ETH</div>
                    </div>
                    <div className="text-sm">{bounty.description}</div>
                    <div className="flex flex-row justify-between">
                        <div className="text-sm">{bounty.tags}</div>
                        <div className="text-sm">{bounty.url}</div>
                    </div>
                </div>
            })}
        </div>
    </div>
}