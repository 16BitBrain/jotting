import { db } from '../db'
import { doc, getDoc, updateDoc } from 'firebase/firestore'

import DOMPurify from 'dompurify'

export const editNote = async (noteId, newTitle, newText) => {
  try {
    // fetch the existing note
    const noteRef = doc(db, 'notes', noteId)
    const noteDoc = await getDoc(noteRef)

    if (!noteDoc.exists()) {
      console.error('note does not exist!')
      return null
    }

    const sanitizedTitle = DOMPurify.sanitize(newTitle).toString()
    const sanitizedText = DOMPurify.sanitize(newText).toString()

    // update the note with the new text
    await updateDoc(noteRef, { title: sanitizedTitle, text: sanitizedText })

    // fetch the updated note to get the latest data
    const updatedNoteDoc = await getDoc(noteRef)

    if (updatedNoteDoc.exists()) {
      const updatedNote = {
        id: noteId,
        ...updatedNoteDoc.data(),
      }

      return updatedNote
    } else {
      console.error('note does not exist')
      return null
    }
  } catch (error) {
    console.error('Error updating note: ', error)
    return null
  }
}
