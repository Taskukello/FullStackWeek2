import React from 'react'
import axios from 'axios'
import SupportMethods from './SupportMethods'

const Person = ({person, filter, eventHandler}) => {
    if (SupportMethods.ifFiller(person.name, filter)){
    return (
      <tr/>
    )
    }
    return (
      <tr>
      <td>{person.name}</td>
      <td> {person.number}</td>
      </tr>
    )
  }
  
  


  export default Person
