import { useAccount, useBalance, useNetwork } from "wagmi"
// import { InjectedConnector } from "wagmi/connectors/injected";
// import { Database } from "@tableland/sdk";


export default function Profile() {
    const account = useAccount()
    const network = useNetwork()
    const { data } = useBalance(account)



    return <div>
        <div className="flex flex-col gap-5 ">
            <span className="text-2xl cursor-pointer">{account.address}</span>
            <span className="text-2xl">Balance: <span className="">{data?.formatted} {data?.symbol} {data && data?.decimals > 0 ? "🤑" : "(go for some bounty I guess)"}</span></span>
        </div>
    </div>
}