import css from "./App.module.css"
import NoteList from "../NoteList/NoteList";
import Pagination from "../Pagination/Pagination";
import Modal from "../Modal/Modal"
import SearchBox from "../SearchBox/SearchBox";
import { fetchNotes } from "../../services/noteService";
import { keepPreviousData, useQuery } from "@tanstack/react-query"
import { useState } from "react";
import type { Note } from "../../types/note"

export default function App() {
  const [query, setQuery] = useState<string>('')
  const [page, setPage] = useState<number>(1)
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false)
  const {data} = useQuery({
    queryKey: ["key", query],
    queryFn: () => fetchNotes(query),
    placeholderData: keepPreviousData,
  })
  console.log(setQuery);
  console.log(page);
  

  const handleClick = () => {
    setModalIsOpen(true)
  }

  const handleClose = () => {
    setModalIsOpen(false)
  }

  const handlePage = (page: number) => {
    setPage(page)
  }


  const results: Note[] = data?.notes ?? []
  const totalPages = data?.totalPages ?? 0
  console.log(data);
  console.log(results);
  
  return (
    <div className={css.app}>
	<header className={css.toolbar}>
		<SearchBox/>
        {results.length > 1 && <Pagination totalPages={totalPages} getPage={handlePage}/>}
    <button className={css.button} onClick={handleClick}>Create note +</button>
        {results.length > 0 && <NoteList notes={results} />}
        {modalIsOpen && <Modal onClose={handleClose}/>}
        
  </header>
</div>
  )
}