import  React, { useRef } from "react";
import { Message } from "../../types";

type props = {
    onSendCallback: (message: Partial<Message>) => void;
};

export const SendMessageComponent: React.FC<props> = React.memo(({ onSendCallback }) => {
    const authorRef = useRef<HTMLInputElement>(null);
    const contentRef = useRef<HTMLTextAreaElement>(null);

    const handleSendMessage = () => {
        const author = authorRef.current?.value || 'Anonymous';
        const content = contentRef.current?.value || '';
        if (content) {
            onSendCallback({ author, content });
            if (contentRef.current) contentRef.current.value = '';
        }
    };

    return (
        <div className="mt-4">
            <input
                ref={authorRef}
                type="text"
                placeholder="Enter your name"
                className="border p-2 w-full mb-2"
            />
            <textarea
                ref={contentRef}
                placeholder="Type your message..."
                className="border p-2 w-full mb-2"
            />
            <button
                onClick={handleSendMessage}
                className="bg-blue-500 text-white p-2 w-full"
            >
                Send
            </button>
        </div>
    );
});
