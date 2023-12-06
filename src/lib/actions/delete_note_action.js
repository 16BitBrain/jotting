import { db } from '../db'
import { doc, deleteDoc } from 'firebase/firestore'

export const deleteNote = async (noteId) => {
  try {
    await deleteDoc(doc(db, 'notes', noteId))
  } catch (e) {
    console.error('Failed to delete note: ', e)
  }
}
