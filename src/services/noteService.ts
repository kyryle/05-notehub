import axios from "axios";
import type Note from "../types/note"

const myKey = import.meta.env.VITE_NOTEHUB_TOKEN;

export default interface Response {
    results: Note[],
    total_pages: number,
}

export const fetchNotes = async (query: string) => {
    try {
        const result = await axios.get<Response>('https://notehub-public.goit.study/api/notes?', {
            params: {
                query: query
            },
            headers: {
                Authorization: `Bearer ${myKey}`
            }

        })
        console.log(result);
        
    } catch (err) {
        console.log(err);
        return (
            {
                results: [],
                total_pages: 0
            }
        )
        
    }

}

export const createNote = async () => {
    
}

export const deleteNote = async () => {
    
}