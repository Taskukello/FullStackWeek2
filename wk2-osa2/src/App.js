import React from 'react';
import Person from './Components/Person'
import personService from './services/persons'
import SupportMethods from './Components/SupportMethods'
import Notification from './Components/Notification'

//Olin kipeä viime viikon ja se näkyy koodissa. Tuli hieman kiire
//HUOM id = nimi
class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      persons: [],
      newName: '',
      newNumber: '',
      filter: '',
      notification: null,
      error: null
    }
    console.log('constructor')
  }

  componentWillMount() {
    personService
      .getAll()
      .then(response => {
        this.setState({ persons: response.data })
      })
  }


  //Handler Methods
  handleFilterChange = (event) => {
    this.setState({ filter: event.target.value })
  }

  handleNameChange = (event) => {
    this.setState({ newName: event.target.value })
  }

  handleNumberChange = (event) => {
    this.setState({ newNumber: event.target.value })
  }

  handleDeletingPerson = (event) => {
    event.preventDefault()
    const id = event.target.id
    if (window.confirm(`poistetaanko ${id}`)) {
      personService.deleteId(id)
        .then(responseData => {
          this.setState({
            persons: this.state.persons.filter(person => person.id !== id),
            notification: `henkilö poistettiin onnistuneesti!`
          })
          setTimeout(() => {
            this.setState({ notification: null })
          }, 3000)
        })
    }
  }
  //End of Handlers
  //AddPerson Methdos
  addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: this.state.newName,
      number: this.state.newNumber,
      id: this.state.newName
    }
    var personsList = this.state.persons.concat(personObject)
    var checker = SupportMethods.ifContainsPerson(personsList[personsList.length - 1], this.state.persons)

    if (checker !== true) {
      if (checker !== false) {
        personsList[SupportMethods.findIndexByNameId(checker, this.state.persons)] = personObject
        personsList.pop()
        personService
          .update(checker, personObject)
          .then(response => {
            this.setState({
              persons: personsList,
              newPerson: '',
              notification: `Puhelinnumero vaihettiin onnistuneesti henkilöltä: ${checker}`
              
            })
            setTimeout(() => {
              this.setState({ notification: null })
            }, 3000)
          })
          .catch(error => {
            this.setState({
              error: `henkilön tiedot ollaan valitettavasti jo poistettu.`,
              persons:  this.state.persons.filter(person => checker !== person.id)
            })
            setTimeout(() => {
              this.setState({ error: null })
            }, 3000)
          })

      } else {
        personService
          .create(personObject)
          .then(response => {
            this.setState({
              persons: this.state.persons.concat(response.data),
              newPerson: '',
              notification: `Henkilö lisättiin onnistuneesti!`

            })
            setTimeout(() => {
              this.setState({ notification: null })
            }, 3000)
          })
      }          
    }else{
        this.setState({
          error: `nimi tai puhelinnumero on tyhjä!`,
          persons: this.state.persons
        })
        setTimeout(() => {
          this.setState({error: null})
        }, 5000)
    }
  }



  addForm = () => {
    return (
      <form onSubmit={this.addPerson}>
        <div>
          Nimi: <input
            value={this.state.newName}
            onChange={this.handleNameChange}
          />
        </div>
        <div>
          Numero: <input
            value={this.state.newNumber}
            onChange={this.handleNumberChange}
          />
        </div>
        <button type="submit">Lisää</button>
      </form>
    )
  }
  //End of Add person Methods
  //HTML METHODS

  Person = ({ person }) => {
    if (SupportMethods.ifFiller(person.name, this.state.filter)) {
      return (
        <tr />
      )
    }
    return (
      <tr>
        <td>{person.name}</td>
        <td> {person.number}</td>
        <td>
          <button onClick={this.handleDeletingPerson} type="submit" id={person.id}>poista</button>
        </td>
      </tr>
    )
  }

  filter_input = ({ renderValue, renderOnChange }) => {
    return (
      <div>
        rajaa näytettäviä <input
          value={renderValue}
          onChange={renderOnChange}
        />
      </div>
    )
  }

  // END OF HTML METHODS
  render() {
    return (
      <div>
        <h2>Puhelinluettelo</h2>
        <Notification.Error message={this.state.error}/>
        <Notification.Notification message={this.state.notification}/>
        <div>
        </div>
        <div>
          <this.filter_input rendervalue={this.state.filter} renderOnChange={this.handleFilterChange} />
        </div>
        <this.addForm />
        <h2>Numerot</h2>
        <div>
          <table>
            <tbody>
              {this.state.persons.map(person => <this.Person key={person.name} person={person} />)}
            </tbody>
          </table>
        </div>
      </div>
    )
  }
}

export default App
