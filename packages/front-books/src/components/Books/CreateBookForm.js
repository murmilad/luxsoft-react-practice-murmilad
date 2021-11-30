import {useState} from "react";
import {createBook} from "../../actions/book-actions";
import {useDispatch} from "react-redux";
import {isStringEmpty, isObjectEmpty} from "../../utils/utils"
import {Formik, Field, Form} from "formik"
import * as yup from "yup"

function CreateBookForm() {
  const dispatch = useDispatch()
  const [bookName, setBookName] = useState("")
  const [bookAuthor, setBookAuthor] = useState("")

  return (
    <Formik
      initialValues = {{
        bookName: '',
        bookAuthor: '',
      }}
      onSubmit ={ values => {
        dispatch({type: 'CREATE_BOOK', book: {
          title: values.bookName,
          author: values.bookAuthor
        }})
        setBookName("")
        setBookAuthor("")
      }}
      validationSchema = {
        yup.object().shape({
          bookName: yup.string().required(),
          bookAuthor: yup.string().required(),
        })
      }
    >
      <Form className="create_book_form row" >
      <div className="create_book_form_wrapper">
      <Field name="bookName">
      {({
      field,
      form: { touched, errors },
      meta,
      }) => (
          <div className="create_book_input col-md-6" >
          <label htmlFor="bookName" className="form-label">Book Title</label>
          <input className="form-control" {...field} />
          {meta.touched && meta.error && ( <span className="form_error">This field is required</span>)}
        </div>
      )}
      </Field>
      <Field name="bookAuthor">
      {({
      field,
      form: { touched, errors },
      meta,
      }) => (
          <div className="create_book_input col-md-6">
          <label htmlFor="bookAuthor" className="form-label">Book Author</label>
          <input className="form-control" {...field} />
          {meta.touched && meta.error && ( <span className="form_error">This field is required</span>)}
        </div>
      )}
      </Field>
      <div className="create_book_form_add_btn_wrapper">
            <button type="submit" className="btn btn-primary">Create book</button>
        </div>
        </div>
      </Form>
    </Formik>
  )
}

export default CreateBookForm