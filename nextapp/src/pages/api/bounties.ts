

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
    tags: string[],
    id: string,
}
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

type Response = {
    bounties: BountyData[],
}

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<Response>
) {
    res.status(200).json({
        bounties: [
            {
                title: "Create a new logo for the website",
                description: "The current logo is a placeholder, we need a new logo for the website",
                image: "",
                platform: "github",
                url: "",
                reward: 100,
                crypto: "ETH",
                status: "open",
                maintainer: "0x1234",
                created: new Date(),
                tags: ["logo", "design"],
                id: "1"
            },
            {
                title: "Create a new logo for the website",
                description: "The current logo is a placeholder, we need a new logo for the website\nThe current logo is a placeholder, we need a new logo for the website\nThe current logo is a placeholder, we need a new logo for the website",
                image: "",
                platform: "github",
                url: "",
                reward: 100,
                crypto: "ETH",
                status: "open",
                maintainer: "0x1234",
                created: new Date(),
                tags: ["logo", "design"],
                id: "2"
            },
            {
                title: "Create a new logo for the website",
                description: "The current logo is a placeholder, we need a new logo for the website",
                image: "",
                platform: "github",
                url: "",
                reward: 100,
                crypto: "ETH",
                status: "open",
                maintainer: "0x1234",
                created: new Date(),
                tags: ["logo", "design"],
                id: "3"
            },
            {
                title: "Create a new logo for the website",
                description: "The current logo is a placeholder, we need a new logo for the website",
                image: "",
                platform: "github",
                url: "",
                reward: 100,
                crypto: "ETH",
                status: "open",
                maintainer: "0x1234",
                created: new Date(),
                tags: ["logo", "design"],
                id: "4"
            },
            {
                title: "Create a new logo for the website",
                description: "The current logo is a placeholder, we need a new logo for the website",
                image: "",
                platform: "github",
                url: "",
                reward: 100,
                crypto: "ETH",
                status: "open",
                maintainer: "0x1234",
                created: new Date(),
                tags: ["logo", "design"],
                id: "5"
            },
            {
                title: "Create a new logo for the website",
                description: "The current logo is a placeholder, we need a new logo for the website",
                image: "",
                platform: "github",
                url: "",
                reward: 100,
                crypto: "ETH",
                status: "open",
                maintainer: "0x1234",
                created: new Date(),
                tags: ["logo", "design"],
                id: "6"
            }
        ]
    })
}
