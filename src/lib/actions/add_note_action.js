import { db } from '../db'
import { collection, addDoc } from 'firebase/firestore'

import DOMPurify from 'dompurify'

export const addNote = async (title, text) => {
  try {
    const sanitizedTitle = DOMPurify.sanitize(title).toString()
    const sanitizedText = DOMPurify.sanitize(text).toString()

    const noteData = {
      title: sanitizedTitle,
      text: sanitizedText,
      date: new Date(),
    }

    const docRef = await addDoc(collection(db, 'notes'), noteData)

    const note = {
      ...noteData,
      id: docRef.id.toString(),
    }

    return note
  } catch (e) {
    console.error('Error add note: ', e)
  }
}
