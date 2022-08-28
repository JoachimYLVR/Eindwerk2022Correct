import db from "../../db";

export default async function handler(req, res) {
    if (req.method === 'POST') {
        try {
            const response = await db('feedbackelements').insert(req.body)
            //.onConflict('id').update(req.body)
            res.status(200).json(response)
        } catch (error) {
            res.status(500).json(error)
        }
    } else if (req.method === 'PATCH') {
        try {
            const response = await db('feedbackelements').where('id', req.body.id).update(req.body)
            //.onConflict('id').update(req.body)
            res.status(200).json(response)
        } catch (error) {
            res.status(500).json(error)
        }
    } else {
        res.status(500).json({message: "Server was unable to handle request."})
    }
} 