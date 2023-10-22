// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Database } from "@tableland/sdk";
import type { NextApiRequest, NextApiResponse } from 'next'
import { bountyTableName } from "@/utils/blockchain";

const tableName: string = bountyTableName;

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
    const { maintainer, bid } = req.body;
    console.log(maintainer)
    let results: any = []
    if (maintainer && !bid) {
        results = (await db.prepare(`SELECT * FROM ${tableName} WHERE maintainer='${maintainer.toLowerCase()}'`).all()).results;
    }
    else if (bid && !maintainer) {
        results = (await db.prepare(`SELECT * FROM ${tableName} WHERE bid=${bid}`).all()).results;
    } else if (bid && maintainer) {
        results = (await db.prepare(`SELECT * FROM ${tableName} WHERE bid=${bid} AND maintainer='${maintainer.toLowerCase()}'`).all()).results;
    }
    console.log(results)
    res.status(200).json({ results })
}
