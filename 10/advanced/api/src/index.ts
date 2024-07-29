import express from 'express'
import { Server } from 'socket.io';
import { createServer } from "node:http"
import Knex from 'knex'
import { MessageDAO, ChatDAO, Chat, Message } from './types';
import cors from 'cors'
import bodyParser from 'body-parser';

const knex = Knex(require('../knexfile.js').development);

const app = express();
app.use(cors());
app.use(bodyParser.json());
const server = createServer(app);
const io = new Server(server, {
    cors: {
        origin: '*',
    },
});

io.on('connection', (socket) => {

    socket.on('join', (chatId) => {
        socket.join('chatroom' + chatId)
    });

    socket.on('message', async (message: MessageDAO) => {
        try{
            const messageId = await knex<Message>('messages').insert({
                author: message.author,
                chat_id: message.chat_id,
                content: message.content,
            });
            io.to('chatroom' + message.chat_id).emit('message', await knex('messages').where('id', '=', messageId[0]).first());
        }catch(error){
            console.log(error);
            socket.emit("send_message_error");
        }
    });    
});

app.get('/chat/:id', async (req, res) => {
    const { id } = req.params;

    if(!id || !+id){
        res.status(400).send();
    }else{
        try{
            const chat = await knex<Chat>('chats').where('id','=', +id).first();
            if(!chat){
                res.status(404).send();
            }else{
                const chatMessages = await knex<Message>('messages').where('chat_id', '=', chat?.id)
                const data: ChatDAO = {
                    id: chat.id,
                    messages: chatMessages,
                };
                res.status(200).json(data); 
            }
        }
        catch(error){
            console.log(error);
            res.status(500).send();
        } 
    }
});

app.post('/chat', async (req, res) => {
    try{
        const insertedIds = await knex<Chat>('chats').insert({});
        const data: ChatDAO = {
            id: insertedIds[0],
            messages: [],
        };
        res.status(200).json(data)
    }catch{
        res.status(500).send();
    }
    
});

app.post('/userAction', (req, res) => {
    console.log('user action: ', req.body);
});

app.post('/survey', (req, res) => {
    console.log('survey data: ', req.body);
});

server.listen(3000, () => {
    console.log('server started');
});