// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Database } from "@tableland/sdk";
import type { NextApiRequest, NextApiResponse } from 'next'
import { bountyTableName } from "@/utils/blockchain";

const tableName: string = bountyTableName;

export type BountyData = {
    title: string,
    description: string,
    image: string,
    platform: string | "github" | "gitlab",
    url: string,
    reward: number,
    crypto: string | "ETH" | "MATIC",
    status: string | "open" | "closed"
    maintainer: string,
    created: Date,
    tags: string,
    id: string,
}

// interface HealthBot {
//     counter: number;
// }

// const db = new Database<HealthBot>();
const db = new Database();


type Response = {
    counter: number,
}

export default async function handler(
    req: NextApiRequest,
    // res: NextApiResponse<Response>
    res: any
) {

    const { results } = (await db.prepare(`SELECT * FROM ${tableName};`).all());
    res.status(200).json({ results })
}
