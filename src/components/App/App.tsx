import css from "./App.module.css"
import NoteList from "../NoteList/NoteList";
import Pagination from "../Pagination/Pagination";
import Modal from "../Modal/Modal"
import { fetchNotes } from "../../services/noteService";
import { useQuery } from "@tanstack/react-query"
import { useState } from "react";
// import type Note from "../../types/note"

export default function App() {
  // const [note, setNote] = useState<Note>({})
  const [query, setQuery] = useState<string>('')
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false)
  const {data} = useQuery({
    queryKey: ["key"],
    queryFn: () => fetchNotes(query),
  })
console.log(setQuery);

  const handleClick = () => {
    setModalIsOpen(true)
  }

  const handleClose = () => {
    setModalIsOpen(false)
  }



  const results = data?.results ?? []
  console.log(data);
  console.log(results);
  
  return (
    <div className={css.app}>
	<header className={css.toolbar}>
		{/* Компонент SearchBox */}
		{results.length > 1 && <Pagination/>}
    <button className={css.button} onClick={handleClick}>Create note +</button>
        {results.length > 1 && <NoteList notes={results} />}
        {modalIsOpen && <Modal onClose={handleClose}/>}
        
  </header>
</div>
  )
}