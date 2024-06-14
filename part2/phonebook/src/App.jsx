import { useState, useEffect } from 'react'
import axios from 'axios'

const Filter = (props) => {
	return (
		<div>
			filter shown with <input onChange={props.handleFilterChange} value={props.filter}/>
		</div>
	)
}

const PersonForm = (props) => {
	return (
		<form onSubmit={props.addPerson}>
			<div>
				name: <input onChange={props.handleNameChange} value={props.newName}/>
			</div>
			<div>
				number: <input onChange={props.handleNumberChange} value={props.newNumber}/>
			</div>
			<div>
				<button type="submit">add</button>
			</div>
		</form>
	)
}

const Persons = ({persons}) => {
	return (
		<div>
			{
				persons.map(person => 
					<PersonDetail key={person.name} person={person}/>
				)
			}
		</div>
	)
}

const PersonDetail = ({person}) => {
	return (
		<>
			<div>{person.name}: {person.number}</div>
		</>
	)
}

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNumber] = useState('')
  const [filter, setFilter] = useState('')

	useEffect(() => {
		console.log('effect')
		axios
			.get('http://localhost:3001/persons')
			.then(response => {
				console.log('promise fulfilled')
				setPersons(response.data)
			})
	}, [])

	const addPerson = (event) => {
		event.preventDefault()

		const found = persons.find((element) => element.name == newName)

		if (found) {
			alert(`${newName} is already added to phonebook`)
		}
		else {
			const personObject = {
				name: newName,
				number: newNumber,
			}
			setPersons(persons.concat(personObject))
			setNewName('')
			setNumber('')
		}
	}

	const handleNameChange = (event) => {
		setNewName(event.target.value)
	}

	const handleNumberChange = (event) => {
		setNumber(event.target.value)
	}

	const handleFilterChange = (event) => {
		setFilter(event.target.value)
	}

	const personsToShow = persons.filter(person => person.name.toLocaleLowerCase().includes(filter.toLocaleLowerCase()))
	console.log(personsToShow)
  return (
    <div>
      <h2>Phonebook</h2>
			<div>
        <Filter handleFilterChange={handleFilterChange} filter={filter} />
			</div>
			<h3>add a new</h3>
				<PersonForm  
					addPerson={addPerson} 
					handleNameChange={handleNameChange}
					handleNumberChange={handleNumberChange}
					newName={newName}
					newNumber={newNumber}
					/>
      <h2>Numbers</h2>
      <Persons persons={personsToShow}/>
    </div>
  )
}

export default App