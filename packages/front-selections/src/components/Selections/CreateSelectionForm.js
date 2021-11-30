import { useDispatch, useSelector } from 'react-redux'
import {useState} from "react";
import {createSelection} from "../../actions/selection-actions";
import {isObjectEmpty, isStringEmpty} from "../../utils/utils";
import { useForm } from "react-hook-form";
import { yupResolver } from
'@hookform/resolvers/yup';
import * as yup from "yup";

function CreateSelectionForm() {
  const dispatch = useDispatch()
  const [selectionName, setSelectionName] = useState("")
  const [selectionAuthor, setSelectionAuthor] = useState("")
  const [selectionEmail, setSelectionEmail] = useState("")

  const { register, handleSubmit, formState} = useForm({
    resolver: yupResolver(yup.object().shape({
      selectionName: yup.string().required(),
      selectionAuthor: yup.string().required(),
      selectionEmail: yup.string().required(),
     })),
  })
  const { errors } = formState;

  const onSubmit = async ({ selectionName, selectionAuthor, selectionEmail }) => {
      dispatch({type: 'CREATE_SELECTION', selection: {
        title: selectionName,
        author: selectionAuthor,
        email: selectionEmail
      }})
      setSelectionName("")
      setSelectionAuthor("")
      setSelectionEmail("")
  }

  return (
    <div className="create_selection_form_wrapper">
      <form className="create_selection_form row" onSubmit={handleSubmit(onSubmit)}>
        <div className="create_selection_input col-md-4" >
          <label htmlFor="selectionName" className="form-label">Selection Title</label>
          <input type="text" className="form-control"  {...register("selectionName")} />
          {errors.selectionName && <span className="form_error">This field is required</span>}
        </div>
        <div className="create_selection_input col-md-4">
          <label htmlFor="selectionAuthor" className="form-label">Selection Author</label>
          <input type="text" className="form-control" {...register("selectionAuthor")} />
          {errors.selectionAuthor && <span className="form_error">This field is required</span>}
        </div>
        <div className="create_selection_input col-md-4">
          <label htmlFor="selectionAuthor" className="form-label">E-mail</label>
          <input type="text" className="form-control" {...register("selectionEmail")}  />
          {errors.selectionEmail && <span className="form_error">This field is required</span>}
        </div>
        <div className="create_selection_form_add_btn_wrapper">
          <button type="submit" className="btn btn-primary">Create selection</button>
        </div>
      </form>
    </div>
  )
}

export default CreateSelectionForm