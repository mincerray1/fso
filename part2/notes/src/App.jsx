import { useState, useEffect } from 'react'
import noteService from './services/notes'

const Note = ({note, toggleImportance}) => {
	const label = note.important
		? 'make not important' : 'make important'
	return (
			<li className='note'>
					{note.id} {note.content} <button onClick={toggleImportance}>{label}</button>
			</li>
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

const Footer = () => {
	const footerStyle = {
		color: 'green',
		fontStyle: 'italic',
		fontSize: 16
	}

	return (
		<div style={footerStyle}>
			<br />
			<em>
				Note app, Department of Computer Science, University of Helsinki 2024
			</em>

		</div>
	)
}

const App = () => {
    const [notes, setNotes] = useState(null)
    const [newNote, setNewNote] = useState('')
    const [showAll, setShowAll] = useState(true)
		const [notificationMessage, setNotificationMessage] = useState(null)
		const [notificationType, setNotificationType] = useState("success")

    // const hook = () => {
		// 	console.log('effect')
		// 	axios
		// 			.get('http://localhost:3001/notes')
		// 			.then(response => {
		// 					console.log('promise fulfilled')
		// 					setNotes(response.data)
		// 			})

    // }
    // // console.log('render', notes.length, 'notes')
		// useEffect(hook, [])

		useEffect(() => {
			console.log('effect')
			noteService
				.getAll()
				.then(initialNotes => {
					setNotes(initialNotes)
				})
		}, [])

		const setNotification = (message, type) => {
			setNotificationType(type)
			setNotificationMessage(message)

			setTimeout(() => {
				setNotificationMessage(null)
			}, 2000)
		}

		const toggleImportanceOf = (id) => {
			console.log(`importance of ${id} needs to be toggled`)
			const note = notes.find(n => n.id === id)
			const changedNote = { ...note, important: !note.important }

			noteService
				.update(id, changedNote)
				.then(returnedNote => {
					setNotification(`the note '${note.content}' importance flag has been updated`, "success")
					setNotes(notes.map(n => n.id !== id ? n : returnedNote))
				})
				.catch(error => {
					setNotification(`the note '${note.content}' was already deleted from the server`, "error")
					setNotes(notes.filter(n => n.id !== id))
				})
		}

    const addNote = (event) => {
        event.preventDefault()
        console.log('button clicked', event.target)

        const noteObject = {
            content: newNote,
            important: Math.random() < 0.5,
            // id: notes.length + 1,
        }

				noteService
					.create(noteObject)
					.then(returnedNote => {
						setNotification(`Added '${returnedNote.content}'`, "success")
						setNotes(notes.concat(returnedNote))
						setNewNote('')
					})
    }

    const handleNoteChange = (event) => {
        setNewNote(event.target.value)
    }

		if (!notes) {
			return null
		}

    const notesToShow = showAll
        ? notes
        : notes.filter(note => note.important)

  return (
    <div>
        <h1>Notes</h1>
				<Notification message={notificationMessage} notificationType={notificationType}/>
        <div>
            <button onClick={() => setShowAll(!showAll)}>
                show {showAll ? 'important' : 'all'}
            </button>
        </div>
        <ul>
            {
                notesToShow.map(note =>
                    <Note key={note.id} note={note} toggleImportance={() => toggleImportanceOf(note.id)} />
                )
            }
        </ul>
        <form onSubmit={addNote}>
            <input 
                value={newNote}
                onChange={handleNoteChange}
                />
            <button type="submit">save</button>
        </form>
				<Footer />
    </div>
  )
}

export default App