import { getWeather } from "@/database/database";
import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse){
    if(req.method === 'GET'){
        res.status(200).json(getWeather());
    }else{
        res.status(400).send(null);
    }
}