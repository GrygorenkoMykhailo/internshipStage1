import { Genre } from "./"

export type Movie = {
    id: number,
    title: string,
    releaseYear: number,
    genre: Genre[],
    imageUrl: string,
}