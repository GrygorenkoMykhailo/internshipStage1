"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const socket_io_1 = require("socket.io");
const node_http_1 = require("node:http");
const knex_1 = __importDefault(require("knex"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const knex = (0, knex_1.default)(require('../knexfile.js').development);
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json());
const server = (0, node_http_1.createServer)(app);
const io = new socket_io_1.Server(server, {
    cors: {
        origin: '*',
    },
});
io.on('connection', (socket) => {
    socket.on('join', (chatId) => {
        socket.join('chatroom' + chatId);
    });
    socket.on('message', (message) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const messageId = yield knex('messages').insert({
                author: message.author,
                chat_id: message.chat_id,
                content: message.content,
            });
            io.to('chatroom' + message.chat_id).emit('message', yield knex('messages').where('id', '=', messageId[0]).first());
        }
        catch (error) {
            console.log(error);
            socket.emit("send_message_error");
        }
    }));
});
app.get('/chat/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    console.log(req);
    if (!id || !+id) {
        res.status(400).send();
    }
    else {
        try {
            const chat = yield knex('chats').where('id', '=', +id).first();
            if (!chat) {
                res.status(404).send();
            }
            else {
                const chatMessages = yield knex('messages').where('chat_id', '=', chat === null || chat === void 0 ? void 0 : chat.id);
                const data = {
                    id: chat.id,
                    messages: chatMessages,
                };
                res.status(200).json(data);
            }
        }
        catch (error) {
            console.log(error);
            res.status(500).send();
        }
    }
}));
app.post('/chat', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const insertedIds = yield knex('chats').insert({});
        const data = {
            id: insertedIds[0],
            messages: [],
        };
        res.status(200).json(data);
    }
    catch (_a) {
        res.status(500).send();
    }
}));
app.post('/userAction', (req, res) => {
    console.log('user action: ', req.body);
});
app.post('/survey', (req, res) => {
    console.log('survey data: ', req.body);
});
server.listen(3000, () => {
    console.log('server started');
});
