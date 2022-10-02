import { db } from '@utils/db.server'

export default async function handle(req, res) {
    const {ticketId, status} = req.body
    let newStatus = status

    if (status === 'IN PROGRESS') {
        newStatus = 'IN_PROGRESS'
    }

    const data = await db.ticket.update({
        where: {
            id: ticketId
        },
        data: {
            status: newStatus
        }
    });

    res.status(200).json(data)
}

export const config = {
    api: {
        responseLimit: false,
    }
}