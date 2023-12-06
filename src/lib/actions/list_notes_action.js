import { db } from '../db'
import { collection, getDocs, query, orderBy } from 'firebase/firestore'

export const listNotes = async () => {
  try {
    // reference to the 'notes' collection in Firestore
    const noteCollectionRef = collection(db, 'notes')

    // create a query to fetch notes ordered by the 'date' field in descending order
    const orderedQuery = query(noteCollectionRef, orderBy('date', 'desc'))

    // get the documents based on the query
    const datas = await getDocs(orderedQuery)

    // map the documents to an array of note objects with added IDs
    const notes = datas.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id.toString(),
    }))

    return notes
  } catch (e) {
    console.error('Failed to fetch all notes: ', e)
  }
}
