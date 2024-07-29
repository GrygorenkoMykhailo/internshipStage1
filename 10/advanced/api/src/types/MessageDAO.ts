import { Message } from "./Message";

export type MessageDAO = Omit<Message, "id">;