import express from 'express'
import { Server } from 'socket.io';
import { createServer } from "node:http"
import Knex from 'knex'
import { MessageDAO, ChatDAO, Chat, Message, CreateChatDAO } from './types';
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

    console.log('Client connected:', socket.id);

    socket.on('join', (chatId) => {
        socket.join('chatroom' + chatId);
        console.log(`Client ${socket.id} joined chatroom ${chatId}`);
    });

    socket.on('message', async (message: MessageDAO) => {
        try{
            console.log('client ' + socket.id + ' wrote message ', message);
            const messageId = await knex<Message>('messages').insert({
                author: message.author,
                chat_id: message.chat_id,
                content: message.content,
            });
            console.log('inserted:', messageId[0]);
            io.to('chatroom' + message.chat_id).emit('message', await knex('messages').where('id', '=', messageId[0]).first());
        }catch(error){
            console.log(error);
            socket.emit("send_message_error");
        }
    });   
    
    socket.on('leave', (chatId) => {
        console.log('client ' + socket.id + ' leaving room' + chatId);
        socket.leave(chatId);
    });

    socket.on('disconnect', () => {
        console.log('client ' + socket.id + 'disconnected');
        socket.disconnect();
    });
});

app.get('/chat/:name', async (req, res) => {
    console.log('chat request');
    const { name } = req.params;
    console.log(name);

    if(!name){
        res.status(400).send();
    }else{
        try{
            const chat = await knex<Chat>('chats').where('name','=', name).first();
            if(!chat){
                res.status(404).send();
            }else{
                const chatMessages = await knex<Message>('messages').where('chat_id', '=', chat?.id)
                const data: ChatDAO = {
                    id: chat.id,
                    name: chat.name,
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
    const { name }: CreateChatDAO = req.body;

    try {
        const chatExists = await knex<Chat>('chats').where('name', '=', name).first();
        if (chatExists) {
            res.status(409).json({ message: 'Chat name already exists' });
        } else {
            const [insertedId] = await knex<Chat>('chats').insert({ name });
            const newChat = await knex<Chat>('chats').where('id', '=', insertedId).first();
            if (newChat) {
                const data: ChatDAO = {
                    id: insertedId,
                    name: newChat.name,
                    messages: [],
                };
                res.status(201).json(data);
            } else {
                res.status(500).send();
            }
        }
    } catch (error) {
        console.error(error);
        res.status(500).send();
    }
});

app.post('/userAction', (req, res) => {
    console.log('user action: ', req.body);
    res.status(200).send();
});

app.post('/survey', (req, res) => {
    console.log('survey data: ', req.body);
    res.status(200).send();
});

server.listen(3000, () => {
    console.log('server started');
});