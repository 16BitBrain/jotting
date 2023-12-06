import React, { createContext, useContext, useState } from 'react'

// create a new context
const NotesContext = createContext()

// create a provider component to wrap the application with the context
export const NotesProvider = ({ children }) => {
  // state to manage the notes
  const [notes, setNotes] = useState([])

  // function to initialize notes
  const initNotes = (notes) => {
    setNotes(notes)
  }

  // function to add a new note
  const addNote = (newNote) => {
    setNotes((prevNotes) => [newNote, ...prevNotes])
  }

  // function to remove a note by its ID
  const removeNote = (noteId) => {
    setNotes((prevNotes) => prevNotes.filter((note) => note.id !== noteId))
  }

  // function to update a note by its ID
  const commitNote = (noteId, updatedNote) => {
    setNotes((prevNotes) =>
      prevNotes.map((note) => (note.id === noteId ? updatedNote : note))
    )
  }

  // provide the context values to the children components
  return (
    <NotesContext.Provider
      value={{ notes, initNotes, addNote, removeNote, commitNote }}
    >
      {children}
    </NotesContext.Provider>
  )
}

// create a hook to access the context values
export const useNotes = () => {
  return useContext(NotesContext)
}
