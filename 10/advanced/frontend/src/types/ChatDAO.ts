import { Message } from "./Message"

export type ChatDAO = {
    id: number,
    name: string,
    messages: Message[],
}