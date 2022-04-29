import React, {useState, useEffect} from 'react'

const initialFormValues = {
  title: '',
  description: ''
}



const TodoForm = ({ todoAdd, todoEdit, todoUpdate, setTodoEdit }) => {

  const [formValues, setFormValues] = useState(initialFormValues)
  const {title, description} = formValues
  const {error, setError} = useState(null)
  const {successMessage, setSuccessMessage} = useState (null)

  useEffect(() => {
    if (todoEdit) {
      setFormValues(todoEdit)
    }
    else {
      setFormValues(initialFormValues)
    }

  },[todoEdit])

  const handleInputChange = (e) => { //controla en cambio en cada de los input del formulario
    const changeFormValues = {
      ...formValues,
      [e.target.name] : e.target.value  
    }

    setFormValues(changeFormValues)
  }

  const handleSubmit = () => {
    e.preventDefault()

    if(title.trim() === ''){
      setError('Debes indicar un título')
      return
    }
    if (description.trim() === '') {
      setError('Debes indiar una Descripción')
      return
    }

    if (todoEdit) {
      //Actualizando
      todoUpdate(formValues)
      setSuccessMessage('Actualizado Correctamente')
    } else {
      todoAdd(formValues)
      setSuccessMessage('Agregado Correctamente')
    }

    setFormValues(initialFormValues);
        
    setTimeout(() => {
      setSuccessMessage(null)
    }, 2000)
    
    setError(null); 
  
  }

  return (
    <div>
      <h1>{ todoEdit ? 'Editar Tarea' : 'Nueva Tarea' }</h1>

      {
        todoEdit && 
          <button 
            onClick={() => setTodoEdit(null)}
            className='btn btn-sm btn-warning'>
              Caneclar Edición1
          </button>
      }
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          placeholder='Título'
          className='form-control'
          value={title}
          name="title"
          onChange={handleInputChange}
        />
        <textarea 
          placeholder='Descripcion' 
          className='form-control mt-2'
          value={description}
          name="description"
          onChange={handleInputChange}
        >

        </textarea>
        <button 
          className='btn btn-primary btn-block mt-2'
        >
          { todoEdit ? 'Actualizar Tarea' : 'Agregar Tarea' }
        </button>
      </form>

      {
        error 
        ? (
            <div className='alert alert-danger mt-2'>
              {error}
            </div>
          ) : (
            null
          )
      }
      {
         successMessage && (
           <div className='alert alert-success mt-2 '>
             {successMessage}
           </div>
         )
      }

    </div>
  )
}

export default TodoForm