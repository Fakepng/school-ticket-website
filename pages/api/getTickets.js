import { db } from '@utils/db.server'

export default async function handle(req, res) {
    const data = await db.ticket.findMany()
    res.status(200).json(data)
}

export const config = {
    api: {
        bodyParser: {
            sizeLimit: '10mb',
        },
        responseLimit: false,
    }
}