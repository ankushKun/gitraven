import { useAccount, useBalance, useNetwork } from "wagmi"
// import { InjectedConnector } from "wagmi/connectors/injected";
// import { Database } from "@tableland/sdk";
import { useSession, signIn, signOut } from "next-auth/react"
import { use, useEffect, useState } from "react"
import { useContractRead, useContractWrite, readContracts } from "wagmi"
import { contractAddress, contractAbi } from "@/utils/blockchain"

export default function Profile() {
    const account = useAccount()
    const accData = useBalance(account).data
    const { data: session } = useSession()
    const [isRegistered, setIsRegistered] = useState(false)


    useContractRead({
        address: contractAddress,
        abi: contractAbi,
        functionName: "registrations",
        args: [account.address],
        onSuccess: (data: boolean) => {
            console.log(data)
            setIsRegistered(data)
        },
        watch: true
    })

    const { write } = useContractWrite({
        address: contractAddress,
        abi: contractAbi,
        functionName: "register",
        args: [session?.user?.login],
    })




    return <div>
        <div className="flex flex-col gap-5 ">
            <span className="text-2xl cursor-pointer">{account.address}</span>
            <span className="text-2xl">Balance: <span className="">{accData?.formatted} {accData?.symbol} {accData && accData?.decimals > 0 ? "🤑" : "(go for some bounty I guess)"}</span></span>
            {session ? <div className="flex justify-between"><div>Github: {session?.user?.login}</div> <button onClick={() => signOut()}>disconnect</button></div> : <div> <button onClick={() => signIn("github")}>connect github</button></div>}
            {session && !isRegistered && <button onClick={() => {
                write()
            }}>register</button>}
            {session && isRegistered && "registered"}
        </div>
    </div>
}