import { useState } from 'react'
import Course from './components/Course'

const Note = ({note}) => {
    return (
        <div>
            {note.id} {note.content}
        </div>
    )
}

const App = (props) => {
    const [notes, setNotes] = useState([])
    const [newNote, setNewNote] = useState(
        'a new note...'
    )
    const [showAll, setShowAll] = useState(true)

    const addNote = (event) => {
        event.preventDefault()
        console.log('button clicked', event.target)

        const noteObject = {
            content: newNote,
            important: Math.random() < 0.5,
            id: notes.length + 1,
        }

        setNotes(notes.concat(noteObject))
        setNewNote('')
    }

    const handleNoteChange = (event) => {
        console.log(event.target.value)
        setNewNote(event.target.value)
    }

    const notesToShow = showAll
        ? notes
        : notes.filter(note => note.important)

    const courses = [
        {
            name: 'Half Stack application development',
            parts: [
                {
                  name: 'Fundamentals of React',
                  exercises: 10
                },
                {
                  name: 'Using props to pass data',
                  exercises: 7
                },
                {
                  name: 'State of a component',
                  exercises: 14
                },
                {
                  name: 'React and roll',
                  exercises: 43
                }
              ]
        }, 
        {
          name: 'Node.js',
          id: 2,
          parts: [
            {
              name: 'Routing',
              exercises: 3,
              id: 1
            },
            {
              name: 'Middlewares',
              exercises: 7,
              id: 2
            }
          ]
        }
    ]
    const course = {
        name: 'Half Stack application development',
        parts: [
            {
              name: 'Fundamentals of React',
              exercises: 10
            },
            {
              name: 'Using props to pass data',
              exercises: 7
            },
            {
              name: 'State of a component',
              exercises: 14
            },
            {
              name: 'React and roll',
              exercises: 43
            }
          ]
    }
  return (
    <div>
        <h1>Notes</h1>
        <div>
            <button onClick={() => setShowAll(!showAll)}>
                show {showAll ? 'important' : 'all'}
            </button>
        </div>
        <ul>
            {
                notesToShow.map(note =>
                    <Note key={note.id} note={note} />
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

        <h1>Web development curriculum</h1>
        {
            courses.map(course => 
                <Course course={course} key={course.name} />
            )
        }
    </div>
  )
}

export default App