// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Database } from "@tableland/sdk";
import type { NextApiRequest, NextApiResponse } from 'next'

const tableName: string = "healthbot_80001_1"; // Tablelands health check table

interface HealthBot {
    counter: number;
}

const db = new Database<HealthBot>();

type Response = {
    counter: number,
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Response>
) {
    const { results } = await db.prepare<HealthBot>(`SELECT counter FROM ${tableName};`).all();
    // console.log(results)
    res.status(200).json({ counter: results[0].counter })
}
