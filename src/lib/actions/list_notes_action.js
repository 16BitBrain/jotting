import { db } from '../db'
import { collection, getDocs, query, orderBy } from 'firebase/firestore'

export const listNotes = async () => {
  try {
    const noteCollectionRef = collection(db, 'notes')

    const orderedQuery = query(noteCollectionRef, orderBy('date', 'desc'))

    const datas = await getDocs(orderedQuery)

    const notes = datas.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id.toString(),
    }))

    return notes
  } catch (e) {
    console.error('Failed to fetch all notes: ', e)
  }
}
