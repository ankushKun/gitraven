
import Page from "@/components/page";
import { useState, useEffect } from "react";
import { MdClose } from "react-icons/md"
import { BountyData } from "./api/bounties";
import { dateToRelativeTime } from "@/utils/conversions";
import useScreenSize from "@/hooks/screenSize";

export default function Bounties() {
    const [bounties, setBounties] = useState<BountyData[]>([])
    const [selectedBounty, setSelectedBounty] = useState<BountyData | null>(null)
    const screenSize = useScreenSize()

    useEffect(() => {
        fetch("/api/bounties").then(res => res.json()).then(data => setBounties(data.bounties))
    }, [])

    const Item = ({ data }: { data: BountyData }) => {
        function setActive() {
            setSelectedBounty(data)
        }
        return <div className={`ring-0.5 p-5 ring-white/40 bg-black/30 hover:ring-1 transition-all duration-200 rounded-2xl w-full cursor-pointer flex flex-col gap-1 ${data.id == selectedBounty?.id ? " ring-1" : ""}`}
            onClick={setActive}>
            <div className="text-xl font-bold">{data.title}</div>
            <span className="flex justify-between">
                <div className="text-white/50">{dateToRelativeTime(data.created)}</div>
                <div className="">{data.status}</div>
            </span>
            <span className="flex justify-between">
                <div className="">{data.reward} {data.crypto}</div>
                <div className="">by {data.maintainer.substring(0, 6)}...</div>
            </span>
            <span className="flex gap-2">{data.tags.map((tag, index) => <div key={index} className="text-sm bg-red-400 rounded-xl w-fit px-2 ring-2 text-black ring-black">{tag}</div>)}</span>
        </div>
    }

    return <Page background>
        <div className="w-full flex" >
            <div className={`${screenSize.width > 640 ? "w-[25%]" : "w-[100%]"} h-[70vh] overflow-scroll flex flex-col gap-5 items-center p-0.5 px-2`}>
                {bounties.length} bounties found
                {bounties.map((item, index) => <Item key={index} data={item} />)}
            </div>
            {screenSize.width > 640 ?
                <>
                    {selectedBounty ?
                        <div className="w-[75%] flex flex-col gap-5 ml-7 rounded-2xl bg-black/50 p-3 px-4 h-[70vh]" >
                            {/* DESKTOP VIEW */}
                            <div className="flex justify-between">
                                <div className="text-2xl font-bold">{selectedBounty.title}</div>
                                <div className="text-white/50">{dateToRelativeTime(selectedBounty.created)}</div>
                            </div>
                            <div className="flex justify-between">
                                <div className="">For {selectedBounty.reward} {selectedBounty.crypto}</div>
                                <div className="">by {selectedBounty.maintainer}</div>
                            </div>
                            <div className="flex gap-2 justify-end">{selectedBounty.tags.map((tag, index) => <div key={index} className="text-sm bg-red-400 rounded-xl w-fit px-2 ring-2 text-black ring-black">{tag}</div>)}</div>
                            <div className="text-white/50">{selectedBounty.status}</div>
                        </div>
                        : null}
                </> :
                <div >
                    {/* MOBILE VIEW, SLIDES FROM BOTTOM */}
                    {selectedBounty ?
                        <div className="bg-black/70 backdrop-blur rounded-t-2xl absolute bottom-0 left-0 w-full h-[82vh] p-5">
                            <button className="ml-auto block mb-5" onClick={() => { setSelectedBounty(null) }}><MdClose size={35} /></button>
                            <div className="flex flex-col gap-5">
                                <div className="text-2xl font-bold">{selectedBounty.title}</div>
                                <span className="flex justify-between">
                                    <div className="text-white/50">{dateToRelativeTime(selectedBounty.created)}</div>
                                    <div className="">{selectedBounty.status}</div>
                                </span>
                                <span className="flex justify-between">
                                    <div className="">{selectedBounty.reward} {selectedBounty.crypto}</div>
                                    <div className="">by {selectedBounty.maintainer.substring(0, 6)}...</div>
                                </span>
                                <span className="flex gap-2">{selectedBounty.tags.map((tag, index) => <div key={index} className="text-sm bg-red-400 rounded-xl w-fit px-2 ring-2 text-black ring-black">{tag}</div>)}</span>
                            </div>
                        </div> : null
                    }
                </div>
            }
        </div>
    </Page>
}