import { db } from '../db'
import { collection, addDoc } from 'firebase/firestore'

// for sanitizing user input
import DOMPurify from 'dompurify'

export const addNote = async (title, text) => {
  try {
    // sanitize the title and text using DOMPurify to prevent XSS attacks
    const sanitizedTitle = DOMPurify.sanitize(title).toString()
    const sanitizedText = DOMPurify.sanitize(text).toString()

    // create an object with sanitized data
    const noteData = {
      title: sanitizedTitle,
      text: sanitizedText,
      date: new Date(),
    }

    // add the noteData to the 'notes' collection in Firestore
    const docRef = await addDoc(collection(db, 'notes'), noteData)

    const note = {
      ...noteData,
      id: docRef.id.toString(), // the firebase doc id is an object, so it need to be changed into string
    }

    return note
  } catch (e) {
    console.error('Error adding note: ', e)
  }
}
