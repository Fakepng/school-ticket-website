import { db } from '@utils/db.server'

export default async function handle(req, res) {
    const {ticketId, priority} = req.body

    const data = await db.ticket.update({
        where: {
            id: ticketId
        },
        data: {
            priority
        }
    });

    res.status(200).json(data)
}

export const config = {
    api: {
        responseLimit: false,
    }
}