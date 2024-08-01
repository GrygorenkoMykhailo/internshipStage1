import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { io } from 'socket.io-client';
import { ChatDAO, Message } from '../../types';
import { ActivityTrackerComponent, MessageListComponent, SendMessageComponent, SurveyComponent } from '../../components';
import { useForm, SubmitHandler } from 'react-hook-form';

const socket = io(import.meta.env.VITE_BASE_URL);

type ConnectToChatForm = {
    id: string;
    action: string;
}

export const IndexPage: React.FC = () => {
    const { register, handleSubmit, reset, setValue, formState: { errors }, setError } = useForm<ConnectToChatForm>({
        criteriaMode: 'all'
    });
    const [chatId, setChatId] = useState<number | null>(null);
    const [messages, setMessages] = useState<Message[]>([]);
    const [showSurvey, setShowSurvey] = useState(false);

    const onSubmit: SubmitHandler<ConnectToChatForm> = async (data) => {
        if (data.action === 'connect') {
            if(data.id){
                connectToChat(data.id);
            }else{
                setError('id', { message: 'Chat id is required' });
            }   
        } else if (data.action === 'create') {
            handleCreateChat();
        }
    };

    const connectToChat = async (id: string) => {
        if (id && +id) {
            setChatId(+id);
            try {
                const response = await axios.get(import.meta.env.VITE_BASE_URL + '/chat/' + id);
                const data: ChatDAO = response.data;
                setMessages(data.messages);
                socket.emit('join', id);
            } catch (error) {
                console.error(error);
                alert('Failed to connect to chat. Please check the chat ID.');
            }
        } else {
            alert('Invalid chat ID. Please enter a valid chat ID.');
        }
    };

    const handleCreateChat = async () => {
        try {
            const response = await axios.post(import.meta.env.VITE_BASE_URL + '/chat');
            if (response.status === 200) {
                const data: ChatDAO = response.data;
                setChatId(data.id);
                alert("New chat id: " + data.id);
                reset();  
                setMessages([]);
                socket.emit('join', data.id);
            }
        } catch (error) {
            console.error(error);
            alert('Failed to create a new chat. Please try again.');
        }
    };

    const handleSendMessage = useCallback((message: Partial<Message>) => {
        if (chatId) {
            const newMessage = { ...message, chat_id: chatId };
            if (newMessage.content && newMessage.content.trim()) {
                socket.emit('message', newMessage);
            } else {
                alert('Message content cannot be empty.');
            }
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
            <ActivityTrackerComponent />
            <h1 className="text-2xl font-bold mb-4">Chat Client</h1>
            <div className="mb-4">
                <h2 className="text-xl mb-2">Connect to Chat</h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <input
                        {...register('id', { 
                            pattern: {
                                value: /^\d+$/,
                                message: 'Chat ID must be a number'
                            }
                        })}
                        type="text"
                        placeholder="Enter chat ID"
                        className="border p-2 w-full mb-2"
                    />
                    {errors.id && <p className='text-red-500'>{errors.id.message}</p>}
                    <input {...register('action')} type="hidden" />
                    <button
                        type="submit"
                        onClick={() => setValue('action', 'connect')}
                        className="bg-green-500 text-white p-2 w-full"
                    >
                        Connect
                    </button>
                    <button
                        type="submit"
                        onClick={() => setValue('action', 'create')}
                        className="bg-green-500 text-white p-2 w-full mt-3"
                    >
                        Create New Chat
                    </button>
                </form>
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
