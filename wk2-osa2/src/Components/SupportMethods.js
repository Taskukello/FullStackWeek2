import React from 'react'
import axios from 'axios'


const ifFiller = (name, filter) => {
  if (name.toLowerCase().includes(filter.toLowerCase())){
  return false
 }
  return true
 }

 const findIndexByNameId = (id, persons) => {
  for (var i = 0; i < persons.length; i++){
    if (persons[i].name === id){
      return i
    }
      
  }
  return false
 }


 const ifContainsPerson = (person, persons) => {
  if (person.name === ""){
    return true
  }if (person.number === ""){
    return true
  }if (!findIndexByNameId(person.name, persons)){
    return false
  }else{
    if (window.confirm(`${person.id} On jo luettelossa, korvataanko vanha numero uudella?`)) {
      return person.id
    }
  }
  return true
}


  export default {ifFiller, findIndexByNameId, ifContainsPerson}