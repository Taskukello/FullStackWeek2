import React from 'react'
import axios from 'axios'
import SupportMethods from './SupportMethods'
import './note.css'

const Error = ({ message }) => {
  if (message === null) {
    return null
  }
  return (
    <div className="error">
      {message}
    </div>
  )
}

const Notification = ({ message }) => {
  if (message === null) {
    return null
  }
  return (
    <div className="notification">
      {message}
    </div>
  )
}
  


  export default {Notification, Error}
