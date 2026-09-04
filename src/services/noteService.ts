import axios from "axios";
import type { Note, NoteId } from "../types/note"


const myKey = import.meta.env.VITE_NOTEHUB_TOKEN;

export interface NoteHubResponse {
    notes: Note[],
    totalPages: number,
}

interface NoteData {
    title: string;
    content: string;
    tag: "Todo" | "Work" | "Personal" | "Meeting" | "Shopping"
}

export const fetchNotes = async (search: string) => {
    try {
        const result = await axios.get<NoteHubResponse>('https://notehub-public.goit.study/api/notes', {
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

export const createNote = async (data: NoteData) => {
    const result = await axios.post<Note>(`https://notehub-public.goit.study/api/notes`, data, {
        headers: {
                Authorization: `Bearer ${myKey}`
            }
    })
    return result.data
    
}

export const deleteNote = async (id: NoteId) => {
    const result = await axios.delete<Note>(`https://notehub-public.goit.study/api/notes/${id}`, {
        headers: {
                Authorization: `Bearer ${myKey}`
            }
    })
    return result.data
    
}