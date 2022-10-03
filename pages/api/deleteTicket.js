import { db } from '@utils/db.server'

export default async function handle(req, res) {
    const { ticketId } = req.body;

    const data = await db.ticket.delete({
        where: {
            id: ticketId
        }
    })
    
    res.status(200).json(data)
}