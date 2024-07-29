import { Message } from "../../types";

export const MessageComponent: React.FC<{ message: Message } > = ({message}) => {
    return (
        <div className="p-2 bg-gray-200 rounded mb-2">
            <strong>{message.author}:</strong> {message.content}
        </div>
    );
};