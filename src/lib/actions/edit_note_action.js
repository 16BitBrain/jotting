import { db } from '../db'
import { doc, getDoc, updateDoc } from 'firebase/firestore'

// for sanitizing user input
import DOMPurify from 'dompurify'

export const editNote = async (noteId, newTitle, newText) => {
  try {
    // fetch the reference to the existing note document
    const noteRef = doc(db, 'notes', noteId)

    // retrieve the current state of the note document
    const noteDoc = await getDoc(noteRef)

    // check if the note document exists
    if (!noteDoc.exists()) {
      console.error('Note does not exist!')
      return null
    }

    // sanitize the new title and text using DOMPurify to prevent XSS attacks
    const sanitizedTitle = DOMPurify.sanitize(newTitle).toString()
    const sanitizedText = DOMPurify.sanitize(newText).toString()

    // update the note with the new sanitized title and text
    await updateDoc(noteRef, { title: sanitizedTitle, text: sanitizedText })

    // fetch the updated note to get the latest data
    const updatedNoteDoc = await getDoc(noteRef)

    // check if the updated note document exists
    if (updatedNoteDoc.exists()) {
      // create an object representing the updated note with the note ID and data
      const updatedNote = {
        id: noteId,
        ...updatedNoteDoc.data(),
      }

      return updatedNote
    } else {
      console.error('Note does not exist')
      return null
    }
  } catch (error) {
    console.error('Error updating note: ', error)
    return null
  }
}
