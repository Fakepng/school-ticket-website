import { db } from '@utils/db.server'

export default async function handle(req, res) {
    const {title, description, room, creator, contact, imageBase64} = JSON.parse(req.body)

    const data = await db.ticket.create({
        data: {
            title,
            description,
            room,
            creator,
            contact,
            image: imageBase64,
            type: 'OTHER',
        }
    });

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