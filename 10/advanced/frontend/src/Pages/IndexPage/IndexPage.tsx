import { useState, useEffect, useCallback } from 'react';
import axios, { AxiosError } from 'axios';
import { io } from 'socket.io-client';
import { ChatDAO, Message } from '../../types';
import { MessageListComponent, SendMessageComponent, SurveyComponent } from '../../components';
import { useForm, SubmitHandler } from 'react-hook-form';

const CreateChatModal: React.FC<{ onClose: () => void; onCreate: (name: string) => void; }> = ({ onClose, onCreate }) => {
    const [name, setName] = useState('');

    const handleCreate = () => {
        if (name.trim()) {
            onCreate(name);
        } else {
            alert('Chat name cannot be empty.');
        }
    };

    return (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded shadow-lg">
                <h2 className="text-xl font-semibold mb-4">Create New Chat</h2>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter chat name"
                    className="border p-2 w-full mb-4"
                />
                <div className="flex justify-end">
                    <button
                        onClick={handleCreate}
                        className="bg-green-500 text-white px-4 py-2 rounded mr-2"
                    >
                        Create
                    </button>
                    <button
                        onClick={onClose}
                        className="bg-gray-500 text-white px-4 py-2 rounded"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

const socket = io(import.meta.env.VITE_BASE_URL);

type ConnectToChatForm = {
    name: string;
    action: string;
};

export const IndexPage: React.FC = () => {
    const { register, handleSubmit, reset, setValue } = useForm<ConnectToChatForm>({
        criteriaMode: 'all'
    });

    const [chatId, setChatId] = useState<number | null>(null);
    const [messages, setMessages] = useState<Message[]>([]);
    const [showSurvey, setShowSurvey] = useState(false);
    const [showCreateChatModal, setShowCreateChatModal] = useState(false);

    const onSubmit: SubmitHandler<ConnectToChatForm> = async (data) => {
        if (data.action === 'connect') {
            await connectToChat(data.name);
        } else if (data.action === 'create') {
            setShowCreateChatModal(true);
        }
    };

    const connectToChat = async (name: string) => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/chat/${name}`);
            const data: ChatDAO = response.data;
            setChatId(data.id);
            setMessages(data.messages);
            socket.emit('join', data.id);
        } catch (error) {
            console.error(error);
            alert('Failed to connect to chat. Please check the chat identifier.');
        }
    };

    const handleCreateChat = async (name: string) => {
        try {
            const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/chat`, { name });
            if (response.status === 201) {
                const data: ChatDAO = response.data;
                setChatId(data.id);
                alert(`New chat created with ID: ${data.name}`);
                reset();
                setMessages([]);
                socket.emit('join', data.id);
                setShowCreateChatModal(false);
            }
        } catch (error) {
            if(error instanceof AxiosError){
                if(error.response?.status === 409){
                    alert('Chat with name ' + name + ' already exists');
                }
            }
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
            if (chatId !== null) {
                socket.emit('leave', chatId.toString());
            }
            socket.off('message');
            socket.off('send_message_error');
            clearTimeout(timer);
        };
    }, [chatId]);

    useEffect(() => {
        const handleDisconnect = () => {
            if (chatId !== null) {
                socket.emit('leave', chatId.toString());
            }
        };

        window.addEventListener('beforeunload', handleDisconnect);

        return () => {
            window.removeEventListener('beforeunload', handleDisconnect);
            if (chatId !== null) {
                socket.emit('leave', chatId.toString());
            }
        };
    }, [chatId]);

    return (
        <div className="p-4">
            <div className="mb-6">
                <h2 className="text-xl mb-4 font-bold">Connect to Chat</h2>
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
                    <input
                        {...register('name')}
                        type="text"
                        placeholder="Enter chat name"
                        className="border p-3 w-full rounded"
                    />
                    <input {...register('action')} type="hidden" />
                    <div className="flex gap-4">
                        <button
                            type="submit"
                            onClick={() => setValue('action', 'connect')}
                            className="bg-blue-500 text-white p-3 rounded flex-grow"
                        >
                            Connect
                        </button>
                        <button
                            type="submit"
                            onClick={() => setValue('action', 'create')}
                            className="bg-green-500 text-white p-3 rounded flex-grow"
                        >
                            Create New Chat
                        </button>
                    </div>
                </form>
            </div>
            {chatId !== null && (
                <div className="flex flex-col">
                    <h2 className="text-xl mb-4">Chat Messages</h2>
                    <div className="flex-1 overflow-hidden">
                        <MessageListComponent messages={messages} />
                    </div>
                    <SendMessageComponent onSendCallback={handleSendMessage} />
                </div>
            )}
            {showSurvey && <SurveyComponent onSubmitCallback={() => setShowSurvey(false)} />}
            {showCreateChatModal && (
                <CreateChatModal
                    onClose={() => setShowCreateChatModal(false)}
                    onCreate={handleCreateChat}
                />
            )}
        </div>
    );
};
