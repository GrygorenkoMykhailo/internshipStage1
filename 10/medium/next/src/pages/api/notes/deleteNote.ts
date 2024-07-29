import { NextApiRequest, NextApiResponse } from "next";
import { deleteNote } from "@/database/database";

export default function handler(req: NextApiRequest, res: NextApiResponse){
    if(req.method === 'DELETE'){
        const { id } = req.query;
        if(!id || !+id){
            res.status(400).send(null);
        }else{
            deleteNote(+id);
            res.status(200).send(null);
        }
    }else{
        res.status(400).send(null);
    }
}