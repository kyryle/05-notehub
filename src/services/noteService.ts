import axios from "axios";
import type {Note} from "../types/note"

const myKey = import.meta.env.VITE_NOTEHUB_TOKEN;

export default interface Response {
    notes: Note[],
    totalPages: number,
}

export const fetchNotes = async (search: string) => {
    try {
        const result = await axios.get<Response>('https://notehub-public.goit.study/api/notes', {
            params: {
                search: search,
                page: 1,
            },
            headers: {
                Authorization: `Bearer ${myKey}`
            }

        })
        return result.data
        
    } catch (err) {
        console.log(err);
        return (
            {
                notes: [],
                totalPages: 0
            }
        )
        
    }

}

export const createNote = async () => {
    
}

export const deleteNote = async () => {
    
}