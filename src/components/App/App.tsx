import css from "./App.module.css"
import NoteList from "../NoteList/NoteList";
import Pagination from "../Pagination/Pagination";
import Modal from "../Modal/Modal"
import NoteForm from "../NoteForm/NoteForm"
import SearchBox from "../SearchBox/SearchBox";
import { fetchNotes } from "../../services/noteService";
import { keepPreviousData, useQuery } from "@tanstack/react-query"
import { useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import type { Note } from "../../types/note"

export default function App() {
  const [searchValue, setSearchValue] = useState<string>('')
  const [page, setPage] = useState<number>(1)
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false)
  const {data} = useQuery({
    queryKey: ["noteQuery", searchValue, page],
    queryFn: () => fetchNotes(searchValue, page),
    placeholderData: keepPreviousData,
  })
  

  const handleClick = () => {
    setModalIsOpen(true)
  }

  const handleClose = () => {
    setModalIsOpen(false)
  }


  const onSearch = (value: string) => {
    setSearchValue(value)
    setPage(1)
  }

  const debouncedOnSearch = useDebouncedCallback(onSearch, 1000)
  
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
        <SearchBox searchValue={searchValue} onSearch={debouncedOnSearch}/>
        {totalPages > 1 && <Pagination totalPages={totalPages} onPageChange={handlePage} forcePage={page}/>}
    <button className={css.button} onClick={handleClick}>Create note +</button>
        {results.length > 0 && <NoteList notes={results} />}
        {modalIsOpen && <Modal onClose={handleClose}>
          <NoteForm onClose={handleClose}/>
        </Modal>}
        
  </header>
</div>
  )
}