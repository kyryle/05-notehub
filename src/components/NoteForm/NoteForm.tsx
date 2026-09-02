import css from "./NoteForm.module.css";
import { Formik, Form, Field, type FormikHelpers, ErrorMessage } from "formik";
import * as yup from "yup"

interface NoteFormProps {
  onClose: () => void
}

interface FormValues {
  title: string;
  content: string;
  tag: "Todo" | "Work" | "Personal" | "Meeting" | "Shopping"
}

const initialValues: FormValues = {
  title: '',
  content: '',
  tag: 'Todo',
}

const formSchema = yup.object().shape({
  title: yup.string().min(3, "title must be at least 3 symbols long").max(50, "title must be 50 symbols long max").required("you must fill in this input"),
  content: yup.string().max(500, "content must be 500 symbols long max"),
  tag: yup.string().required("you must choose one of the options"),
})

export default function NoteForm({onClose}: NoteFormProps) {
  const handleSubmit = (values: FormValues, helpers: FormikHelpers<FormValues>) => {
    helpers.resetForm()
    console.log(values);

  }

  const handleCancelClick = () => {
    onClose()
  }



  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={formSchema}>
      
        
        <Form className={css.form}>
  <div className={css.formGroup}>
    <label htmlFor="title">Title</label>
            <Field id="title" type="text" name="title" className={css.input} />
            <ErrorMessage name="title" component={'p'}/>
    <span className={css.error} />
  </div>

  <div className={css.formGroup}>
    <label htmlFor="content">Content</label>
      <Field
      as="textarea"
      id="content"
      name="content"
      rows={8}
      className={css.textarea}
            />
            <ErrorMessage name="content" component={'p'}/>
    <span className={css.error} />
  </div>

  <div className={css.formGroup}>
    <label htmlFor="tag">Tag</label>
    <Field as='select' id="tag" name="tag" className={css.select}>
      <option value="Todo">Todo</option>
      <option value="Work">Work</option>
      <option value="Personal">Personal</option>
      <option value="Meeting">Meeting</option>
      <option value="Shopping">Shopping</option>
            </Field>
            <ErrorMessage name="tag" component={'p'}/>
    <span className={css.error} />
  </div>

  <div className={css.actions}>
    <button type="button" className={css.cancelButton} onClick={handleCancelClick}>
      Cancel
    </button>
    <button
      type="submit"
      className={css.submitButton}
      disabled={false}
    >
      Create note
    </button>
  </div>
      </Form>
      </Formik>

  )
}