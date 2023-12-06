import React, { createContext, useContext, useState } from 'react'

const NotesContext = createContext()

export const NotesProvider = ({ children }) => {
  const [notes, setNotes] = useState([])

  const initNotes = (notes) => {
    setNotes(notes)
  }

  const addNote = (newNotes) => {
    setNotes((prevNotes) => [newNotes, ...prevNotes])
  }

  const removeNote = (notesId) => {
    setNotes((prevNotes) => prevNotes.filter((note) => note.id !== notesId))
  }

  const commitNote = (notesId, updatedNote) => {
    setNotes((prevNotes) => {
      // update the note with id with updated data
      const updatedNotes = prevNotes.map((note) =>
        note.id === notesId ? updatedNote : note
      )

      return updatedNotes
    })
  }

  return (
    <NotesContext.Provider
      value={{ notes, initNotes, addNote, removeNote, commitNote }}
    >
      {children}
    </NotesContext.Provider>
  )
}

// create a hook to access the context
export const useNotes = () => {
  return useContext(NotesContext)
}
