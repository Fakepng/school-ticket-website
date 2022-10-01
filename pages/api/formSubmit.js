// import { db } from '@utils/db.server'

export default async function handle(req, res) {
    const {title, description, room, name, contact, imageURLs, imageBase64} = req.body
}

export const config = {
    api: {
        bodyParser: {
            sizeLimit: '10mb'
        }
    }
}