import React from 'react'

export const Alert = ({ alert }) => {
  if (!alert) {
    return null
  }
  return (
    <div class="alert alert-success" role="alert">
      Added to favorites
    </div>
  )
}


export default Alert;