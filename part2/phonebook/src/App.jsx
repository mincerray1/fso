import { useState, useEffect } from 'react'
import phonebookService from './services/phonebook'

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

const Persons = ({persons, handleDeleteOf}) => {
	return (
		<div>
			{
				persons.map(person => 
					<PersonDetail key={person.name} person={person} handleDelete={() => handleDeleteOf(person.id, person.name)}/>
				)
			}
		</div>
	)
}

const PersonDetail = ({person, handleDelete}) => {
	return (
			<div>
				{person.name}: {person.number} <button onClick={handleDelete}>delete</button>
			</div>
	)
}

const Notification = ({ message, notificationType }) => {
	if (message === null) {
		return null
	}

	return (
		<div className={notificationType}>
			{message}
		</div>
	)
}

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNumber] = useState('')
  const [filter, setFilter] = useState('')
	const [notificationMessage, setNotificationMessage] = useState(null)
	const [notificationType, setNotificationType] = useState("success")

	useEffect(() => {
		console.log('effect')
		phonebookService.getAll()
			.then(initialPhonebook => {
				setPersons(initialPhonebook)
			})
	}, [])

	const addPerson = (event) => {
		event.preventDefault()
		phonebookService
			.find(newName)
			.then(found => {
				console.log('found', found)
				if (found) {
					if (confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
						const changedPerson = {
							...found, 
							number: newNumber,
						}
	
						phonebookService
							.update(found.id, changedPerson)
							.then(returnedPerson => {
								setNotification(`Updated '${returnedPerson.name}'`, "success")
								setPersons(persons.map(p => p.id !== found.id ? p : returnedPerson))
								setNewName('')
								setNumber('')
							})
							.catch(error => {
								setNotification(error.response.data.error, "error")
								// setNotification(error.error, "error")
							})
					}
				}
				else {
					const personObject = {
						name: newName,
						number: newNumber,
					}
					phonebookService
						.create(personObject)
						.then(returnedPerson => {
							setNotification(`Added '${returnedPerson.name}'`, "success")
							setPersons(persons.concat(returnedPerson))
							setNewName('')
							setNumber('')
						})
						.catch(error => {
							setNotification(error.response.data.error, "error")
							// setNotification(error.error, "error")
						})
				}
			}).catch(error => {
				setNotification(error.response.data.error, "error")
				// setNotification(error.error, "error")
			})
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

	const handleDeleteOf = (id, name) => {
		phonebookService
			.remove(id)
			.then(() => {
				setNotification(`Deleted ${name} successfully`, "success")
				setPersons(persons.filter(person => person.id !== id))
			})
			.catch(() => {
				setNotification(`the person ${name} was already deleted from the server`, "error")
				setPersons(persons.filter(person => person.id !== id))
			})
	}

	const setNotification = (message, type) => {
		setNotificationType(type)
		setNotificationMessage(message)

		setTimeout(() => {
			setNotificationMessage(null)
		}, 2000)
	}

	const personsToShow = persons.filter(person => person.name.toLocaleLowerCase().includes(filter.toLocaleLowerCase()))
	console.log(personsToShow)
  return (
    <div>
      <h1>Phonebook</h1>
			<Notification message={notificationMessage} notificationType={notificationType}/>
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
      <Persons persons={personsToShow} handleDeleteOf={handleDeleteOf}/>
    </div>
  )
}

export default App