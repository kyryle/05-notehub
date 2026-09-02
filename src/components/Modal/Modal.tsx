import { createPortal } from "react-dom"
import NoteForm from "../NoteForm/NoteForm"
import css from "./Modal.module.css"

interface ModalProps {
  onClose: () => void
}

export default function Modal({ onClose }: ModalProps) {
  
  const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose()
    }

  }

  return createPortal(<div className={css.backdrop} role="dialog" aria-modal="true"
    onClick={handleBackdropClick}
  >
<div
  className={css.backdrop}
  role="dialog"
  aria-modal="true"
>
  <div className={css.modal}>
    {<NoteForm onClose={onClose} />}
  </div>
    </div>
  </div>,
    document.body
  )
}
