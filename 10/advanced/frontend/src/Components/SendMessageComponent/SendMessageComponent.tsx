import React from "react";
import { Message } from "../../types";
import { useForm, SubmitHandler } from "react-hook-form";

type SendMessageComponentProps = {
    onSendCallback: (message: Partial<Message>) => void;
};

type SendMessageForm = {
    author: string,
    content: string,
}

export const SendMessageComponent: React.FC<SendMessageComponentProps> = React.memo(({ onSendCallback }) => {
    const { register, handleSubmit } = useForm<SendMessageForm>();

    const onSubmit: SubmitHandler<SendMessageForm> = data => {
        onSendCallback(data as Partial<Message>);
    }

    return (
        <form className="mt-4" onSubmit={handleSubmit(onSubmit)}>
            <input
                {...register('author')}
                type="text"
                placeholder="Enter your name"
                className="border p-2 w-full mb-2"
            />
            <textarea
                {...register('content')}
                placeholder="Type your message..."
                className="border p-2 w-full mb-2"
            />
            <button type="submit" className="bg-blue-500 text-white p-2 w-full">Send</button>
        </form>
    );
});
