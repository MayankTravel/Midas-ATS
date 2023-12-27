import React from 'react'

const FormLabel = (props : any) => {
  return (
    <>
     <label htmlFor={props.for} className="form-label">{props.labelname}</label>
    </>
  )
}

export default FormLabel