import { useState } from 'react'
import { useForm } from "react-hook-form";
import { yupResolver } from
'@hookform/resolvers/yup';
import * as yup from "yup";
import { useQuery, useMutation } from '@apollo/client'
import { ADD_SELECTION_MUTATION, GET_ALL_SELECTIONS } from './graphql'
import { errorVar } from '../../cache';

function CreateSelectionForm() {

  const [createSelection, {  }] = useMutation(ADD_SELECTION_MUTATION, {
    refetchQueries: [
      {
      query: GET_ALL_SELECTIONS,
      },
    ],
    onError: (event) => errorVar(event.message) 
  })

  const { register, handleSubmit, formState, setValue} = useForm({
    resolver: yupResolver(yup.object().shape({
      selectionName: yup.string().required(),
      selectionAuthor: yup.string().required(),
      selectionEmail: yup.string().required(),
     })),
  })
  const { errors } = formState;

  const onSubmit = async ({ selectionName, selectionAuthor, selectionEmail }) => {
    createSelection({ variables: {selection: {
      title: selectionName,
      author: selectionAuthor,
      email: selectionEmail
    }}})
    setValue("selectionName", "")
    setValue("selectionAuthor", "")
    setValue("selectionEmail", "")
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