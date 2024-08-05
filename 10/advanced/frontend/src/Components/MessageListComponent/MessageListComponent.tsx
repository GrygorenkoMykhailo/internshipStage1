import { Message } from "../../types";
import { MessageComponent } from "../../components";

export const MessageListComponent: React.FC<{ messages: Message[]}> = ({ messages }) => {
    return (
        <div className="border p-4 h-96 overflow-y-auto">
            {messages.map((m) => (
                <MessageComponent key={m.id} message={m} />
            ))}
        </div>
    );
};
