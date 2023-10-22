import { useEffect, useState } from "react"

export default function Bookmarks() {
    const [bookmarks, setBookmarks] = useState([])
    const [bounties, setBounties] = useState([])

    useEffect(() => {
        const books = localStorage.getItem("bookmarks")
        setBookmarks(JSON.parse(books || "[]"))
    }, [])

    useEffect(() => {
        bookmarks.forEach((b: any) => {
            fetch("/api/get-bounties", {
                method: "POST",
                body: JSON.stringify({ bid: b }),
                headers: { "Content-Type": "application/json" }
            }).then(res => res.json()).then(data => {
                console.log(data)
                setBounties(data.results)
            }).catch(e => {
                console.log(e)
            })
        })
    }, [bookmarks])

    return <div>
        {bounties.map((b: any, i: number) => {

            return <div className="flex flex-col gap-2 border-b border-white/20 py-2" key={i}>
                <div className="flex flex-row justify-between">
                    <div className="text-lg">{b.title}</div>
                    <div className="text-sm">{b.amount} ETH</div>
                </div>
                <div className="text-sm">{b.description}</div>
                <div className="flex flex-row justify-between">
                    <div className="text-sm">{b.tags}</div>
                    <div className="text-sm">{b.url}</div>
                </div>
            </div>
        })}
    </div>
}