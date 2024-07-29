import React, { useState, useRef, useEffect, useCallback } from 'react';
import axios from 'axios';
import { io } from 'socket.io-client';
import { ChatDAO, Message } from '../../types';
import { ActivityTrackerComponent, MessageListComponent, SendMessageComponent, SurveyComponent } from '../../Components';

const socket = io(import.meta.env.VITE_BASE_URL);

export const IndexPage: React.FC = () => {
    const [chatId, setChatId] = useState<number | null>(null);
    const [messages, setMessages] = useState<Message[]>([]);
    const chatIdRef = useRef<HTMLInputElement>(null);
    const [showSurvey, setShowSurvey] = useState(false);

    const connectToChat = async () => {
        const id = chatIdRef.current?.value.trim();
        if (id && +id) {
            setChatId(+id);
            try {
                const response = await axios.get(import.meta.env.VITE_BASE_URL + '/chat/' + id);
                const data: ChatDAO = response.data;  
                setMessages(data.messages);
                socket.emit('join', id);
            } catch (error) {
                console.error(error);
            }
        }
    };

    const handleCreateChat = async () => {
        try {
            const response = await axios.post(import.meta.env.VITE_BASE_URL + '/chat');
            if (response.status === 200) {
                const data: ChatDAO = response.data;
                setChatId(data.id);
                alert("New chat id: " + data.id);
                if (chatIdRef.current) chatIdRef.current.value = '';
                setMessages([]);
                socket.emit('join', data.id);  
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleSendMessage = useCallback((message: Partial<Message>) => {
        if (chatId) {
            const newMessage = { ...message, chat_id: chatId };
            socket.emit('message', newMessage);
        }
    }, [chatId]); 

    useEffect(() => {
        socket.on('message', (message: Message) => {
            setMessages((prevMessages) => [...prevMessages, message]);
        });

        socket.on('send_message_error', () => {
            alert('Failed to send message. Please try again.');
        });

        const timer = setTimeout(() => setShowSurvey(true), 1000 * 60);

        return () => {
            socket.off('message');
            socket.off('send_message_error');
            clearTimeout(timer);
        };
    }, []);

    return (
        <div className="p-4">
            <ActivityTrackerComponent/>
            <h1 className="text-2xl font-bold mb-4">Chat Client</h1>
            <div className="mb-4">
                <h2 className="text-xl mb-2">Connect to Chat</h2>
                <input
                    ref={chatIdRef}
                    type="text"
                    placeholder="Enter chat ID"
                    className="border p-2 w-full mb-2"
                />
                <button onClick={connectToChat} className="bg-green-500 text-white p-2 w-full">
                    Connect
                </button>
                <button onClick={handleCreateChat} className="bg-green-500 text-white p-2 w-full mt-3">
                    Create New Chat
                </button>
            </div>
            {chatId !== null && (
                <div>
                    <h2 className="text-xl mb-2">Chat Messages</h2>
                    <MessageListComponent messages={messages} />
                    <SendMessageComponent onSendCallback={handleSendMessage} />
                </div>
            )}
            {showSurvey && <SurveyComponent onSubmitCallback={() => setShowSurvey(false)} />}
        </div>
    );
};
