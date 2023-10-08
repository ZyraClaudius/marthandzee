import { WeddingEvent } from "./event"

export type WeddingGuest = {
    id: number,
    name: string,
    events: Array<WeddingEvent>
}