import { useAccount, useBalance, useNetwork } from "wagmi"
// import { InjectedConnector } from "wagmi/connectors/injected";
// import { Database } from "@tableland/sdk";
import { useSession, signIn, signOut } from "next-auth/react"
import { useEffect } from "react"


export default function Profile() {
    const account = useAccount()
    const network = useNetwork()
    const { data } = useBalance(account)
    const { data: session } = useSession()

    useEffect(() => {
        console.log(session)
    }, [session])



    return <div>
        <div className="flex flex-col gap-5 ">
            <span className="text-2xl cursor-pointer">{account.address}</span>
            <span className="text-2xl">Balance: <span className="">{data?.formatted} {data?.symbol} {data && data?.decimals > 0 ? "🤑" : "(go for some bounty I guess)"}</span></span>
            {session ? <div className="flex justify-between"><div>Github: {session?.user?.login}</div> <button onClick={() => signOut()}>disconnect</button></div> : <div> <button onClick={() => signIn("github")}>connect github</button></div>}
        </div>
    </div>
}