import { createPortal } from "react-dom"
import NoteForm from "../NoteForm/NoteForm"
import css from "./Modal.module.css"
import { useEffect } from "react"

interface ModalProps {
  onClose: () => void
}

export default function Modal({ onClose }: ModalProps) {

    useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => {
        document.body.style.overflow = ''
    }

  }, [])

  useEffect(() => {
    const handleCloseButton = (event: KeyboardEvent) => {
      if (event.code === "Escape") {
        onClose()
      }
    }
    
    document.addEventListener("keydown", handleCloseButton)

    return () => {
      document.removeEventListener("keydown", handleCloseButton)
    }
  }, [onClose])
  
  const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose()
    }

  }

  return createPortal(<div className={css.backdrop} role="dialog" aria-modal="true"
    onClick={handleBackdropClick}
  >
  <div className={css.modal}>
    {<NoteForm onClose={onClose} />}
  </div>
  </div>,
    document.body
  )
}
