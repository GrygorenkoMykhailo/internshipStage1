import { Message } from "../../types";
import { MessageComponent } from "../../components";

export const MessageListComponent: React.FC<{ messages: Message[]}> = ({messages}) => {
    return (
        <div className="border p-4 w-80 h-80 overflow-y-scroll">
            {messages.map((m) => (
                <MessageComponent key={m.id} message={m} />
            ))}
        </div>
    );
};