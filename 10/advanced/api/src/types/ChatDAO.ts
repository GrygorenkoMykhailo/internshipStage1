import { Message } from "./Message"

export type ChatDAO = {
    id: number,
    messages: Message[],
}