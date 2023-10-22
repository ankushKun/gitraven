
import Page from "@/components/page";
import { useState, useEffect } from "react";
import { MdClose } from "react-icons/md"
import { BountyData } from "./api/all-bounties";
import { dateToRelativeTime } from "@/utils/conversions";
import { useLocalStorage } from 'usehooks-ts'
import useScreenSize from "@/hooks/screen";
import { MdBookmarkAdd, MdBookmarkAdded, } from "react-icons/md"
import { FaExternalLinkAlt } from "react-icons/fa"
import Link from "next/link";
import { ethers } from "ethers"

export default function Bounties() {
    const [bounties, setBounties] = useState<BountyData[]>([])
    const [selectedBounty, setSelectedBounty] = useState<BountyData | null>(null)
    const [closePopup, setClosePopup] = useState(false)
    const screen = useScreenSize()
    const [bookmarks, setBookmarks] = useLocalStorage<string[]>("bookmarks", [])
    const [selectedIsBookmarked, setSelectedIsBookmarked] = useState(false)


    useEffect(() => {
        fetch("/api/all-bounties").then(res => res.json()).then(data => setBounties(data.results))
    }, [])

    useEffect(() => {
        if (closePopup) {
            setTimeout(() => {
                setSelectedBounty(null)
                setClosePopup(false)
            }, 450)
        }
    }, [closePopup])

    useEffect(() => {
        if (selectedBounty)
            setSelectedIsBookmarked(bookmarks.includes(selectedBounty.id))
    }, [bookmarks, selectedBounty])

    const Item = ({ data }: { data: BountyData }) => {
        const [isBookmarked, setIsBookmarked] = useState(bookmarks.includes(data.id))

        function setActive() {
            setSelectedBounty(data)
        }
        return <div className={`ring-0.5 p-5 ring-white/40 bg-black/30 relative hover:ring-1 transition-all duration-200 rounded-2xl w-full cursor-pointer flex flex-col gap-1 ${data.id == selectedBounty?.id ? " ring-1" : ""}`}
            onClick={setActive}>
            <div className="text-xl font-bold">{data.title}</div>
            <span className="flex justify-between">
                <div className="text-white/50">{dateToRelativeTime(data.created)}</div>
                <div className="">{data.status}</div>
            </span>
            <span className="flex justify-between">
                <div className="">{data.reward / 1000000000000000000} ETH</div>
                <div className="">by {data.maintainer.substring(0, 6)}...</div>
            </span>
            <span className="flex gap-2">{data.tags.split(",").map((tag: string, index: number) => <div key={index} className="text-sm bg-red-400 rounded-xl w-fit px-2 ring-2 text-black ring-black">{tag}</div>)}</span>
            <button className="absolute bottom-2 right-2" onClick={(e) => {
                e.isPropagationStopped()
                e.preventDefault()
                e.stopPropagation()
                // set bookmarks without duplicates
                if (bookmarks.includes(data.id))
                    setBookmarks(bookmarks.filter(item => item != data.id))
                else
                    setBookmarks([...bookmarks, data.id])
            }}>{isBookmarked ? <MdBookmarkAdded size={25} /> : <MdBookmarkAdd size={25} />}</button>
        </div>
    }

    return <Page background noLoading>
        <div className="w-full flex" >
            <div className={`${screen!.width > 640 ? "w-[25%]" : "w-[100%]"} h-[70vh] overflow-scroll flex flex-col gap-5 items-center p-0.5 px-2`}>
                {bounties.length} bounties found
                {bounties.map((item, index) => <Item key={index} data={item} />)}
            </div>
            {screen!.width > 640 ?
                <>
                    {selectedBounty &&
                        <div className="w-[75%] flex flex-col gap-5 ml-7 rounded-2xl bg-black/50 p-3 px-4 h-[70vh]" >
                            {/* DESKTOP VIEW */}
                            <div className="flex justify-between">
                                <div className="text-2xl font-bold">{selectedBounty.title}</div>
                                <div className="text-white/50">{dateToRelativeTime(selectedBounty.created)}</div>
                            </div>
                            <div className="flex justify-between">
                                <div className="">For {(selectedBounty.reward / 1000000000000000000)} ETH</div>
                                <div className="">by {selectedBounty.maintainer}</div>
                            </div>
                            <div className="flex justify-between">
                                <div className="text-white/50">{selectedBounty.status}</div>
                                <div className="flex gap-2 justify-end">{selectedBounty.tags.split(",").map((tag: string, index: number) => <div key={index} className="text-sm bg-red-400 rounded-xl w-fit px-2 ring-2 text-black ring-black">{tag}</div>)}</div>
                            </div>
                            <div className="text-white">{selectedBounty.description}</div>
                            <div className="flex w-full justify-evenly">
                                <Link href={selectedBounty.url} target="_blank" className="btn btn-secondary rounded-lg">Checkout<FaExternalLinkAlt size={15} className="mb-1" /></Link>
                                <Link href={selectedBounty.url} target="_blank" className="btn btn-secondary rounded-lg">Fork Repo<FaExternalLinkAlt size={15} className="mb-1" /></Link>
                                <Link href={selectedBounty.url} target="_blank" className="btn btn-secondary rounded-lg">Submit Solution<FaExternalLinkAlt size={15} className="mb-1" /></Link>

                                {/* <button className="btn btn-secondary rounded-lg block"
                                    onClick={() => {
                                        // set bookmarks without duplicates
                                        if (bookmarks.includes(selectedBounty.id))
                                            setBookmarks(bookmarks.filter(item => item != selectedBounty.id))
                                        else
                                            setBookmarks([...bookmarks, selectedBounty.id])
                                    }}
                                >{selectedIsBookmarked ? <MdBookmarkAdded size={25} /> : <MdBookmarkAdd size={25} />}</button> */}

                            </div>
                        </div>
                    }
                </> :
                <div >
                    {/* MOBILE VIEW, SLIDES FROM BOTTOM */}
                    {selectedBounty &&
                        <div className={`bg-black/70 ring-1 ring-white/50 mx-0.5 backdrop-blur rounded-t-2xl absolute bottom-0 left-0 mb-0 pb-0 h-[80vh] p-5 ${closePopup ? "slide-out-bottom" : "slide-in-bottom"}`}>
                            <button className="ml-auto block mb-5" onClick={() => setClosePopup(true)}><MdClose size={35} /></button>
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
                                <span className="flex gap-2">{selectedBounty.tags.split(",").map((tag: string, index: number) => <div key={index} className="text-sm bg-red-400 rounded-xl w-fit px-2 ring-2 text-black ring-black">{tag}</div>)}</span>
                                <div className="text-white">{selectedBounty.description}</div>
                                <div className="flex w-full justify-evenly">
                                    <Link href={selectedBounty.url} target="_blank" className="btn btn-secondary rounded-lg">Checkout<FaExternalLinkAlt size={15} className="mb-1" /></Link>
                                    <Link href={"#"} target="_blank" className="btn btn-secondary rounded-lg">Fork<FaExternalLinkAlt size={15} className="mb-1" /></Link>
                                    <Link href={"#"} target="_blank" className="btn btn-secondary rounded-lg">Submit<FaExternalLinkAlt size={15} className="mb-1" /></Link>

                                    <button className=" block absolute top-5 left-5"
                                        onClick={() => {
                                            // set bookmarks without duplicates
                                            if (bookmarks.includes(selectedBounty.id))
                                                setBookmarks(bookmarks.filter(item => item != selectedBounty.id))
                                            else
                                                setBookmarks([...bookmarks, selectedBounty.id])
                                        }}
                                    >{selectedIsBookmarked ? <MdBookmarkAdded size={25} /> : <MdBookmarkAdd size={25} />}</button>
                                </div>
                            </div>
                        </div>
                    }
                </div>
            }
        </div>
    </Page>
}