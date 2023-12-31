/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react'

import { useNotes } from './context/NoteContext'

import { listNotes } from './lib/actions/list_notes_action'

import Search from './components/Search'
import Notes from './components/Notes'
import NoteForm from './components/Form'

function App() {
  // a custom hook that manages the state related to notes
  const { notes, initNotes } = useNotes()

  // note: represents the currently selected or edited note
  // openForm: A flag to determine whether the note form is open or closed

  const [note, setEditingNote] = useState({ id: '', title: '', text: '' })
  const [openForm, setOpenForm] = useState(false)

  // searchedNotes: Notes filtered based on the search query
  // searchQ: The current search query
  const [searchedNotes, setSearchedNotes] = useState([])
  const [searchQ, setSearchQ] = useState('')

  // fetchNotes: function to fetch notes from the server and initialize the notes state
  const fetchNotes = async () => {
    // listNotes is an asynchronous action to fetch notes
    const datas = await listNotes()

    initNotes(datas) // init notes, also update the hooks value for notes
  }

  // handleSearch: function to handle the search functionality
  const handleSearch = (query) => {
    setSearchQ(query)

    // filter notes based on the search query
    const searchedNotes = notes.filter((note) => {
      // join both title and the content of note for maximum search
      const joinedText = `${note.title} ${note.text}`.toLowerCase()

      return joinedText.includes(query.toLowerCase())
    })

    setSearchedNotes(searchedNotes)
  }

  // handleEditNote: function to handle editing a specific note
  const handleEditNote = (note) => {
    setEditingNote(note)
  }

  // openHandler: function to toggle the visibility of the note form when in mobile view
  const openHandler = () => {
    setOpenForm(!openForm)
  }

  // track the changes of note (note that will be edited)
  // this useEffect will automatically open the form when a note is being edited
  useEffect(() => {
    if (!note.id) return // if there is no note to be edited, then return

    setOpenForm(!openForm)
  }, [note])

  // fetch notes when the component mounts
  useEffect(() => {
    fetchNotes()
  }, [])

  return (
    <main className='relative grid lg:grid-cols-6 mx-5 lg:mx-10 2xl:mx-20'>
      <div className='h-screen overflow-y-scroll col-span-3 2xl:col-span-2 no-scrollbar'>
        <Search searchQuery={searchQ} onSearch={handleSearch} />
        <h1 className='font-semibold text-3xl py-6'>My Notes</h1>
        <div className='flex flex-col gap-4 mb-8'>
          <Notes
            searched={searchedNotes}
            notes={notes}
            onEdit={handleEditNote}
          />
        </div>
      </div>

      <div className='col-span-3 hidden lg:block 2xl:col-span-4 2xl:ml-14 py-8 2xl:py-10'>
        <NoteForm
          note={note}
          onEdit={handleEditNote}
          formOpened={openForm}
          closeFormOnMobile={openHandler}
        />
      </div>
      {openForm && (
        <div className='fixed lg:hidden top-0 left-0 h-screen w-full bg-white p-8'>
          <NoteForm
            note={note}
            onEdit={handleEditNote}
            formOpened={openForm}
            closeFormOnMobile={openHandler}
          />
        </div>
      )}
      <OpenForm opened={openForm} openHandler={openHandler} />
    </main>
  )
}

const OpenForm = ({ opened, openHandler }) => (
  <div
    className={`${
      opened ? 'hidden' : 'fixed'
    } lg:hidden bottom-6 right-6 z-[99999]`}
  >
    <div
      className={`${
        opened
          ? 'bg-rose-500 hover:bg-rose-600'
          : 'bg-neutral-800 hover:bg-neutral-700'
      } w-14 h-14 rounded-full`}
      onClick={openHandler}
    >
      <div className='w-full h-full grid place-items-center invert'>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='24'
          height='24'
          viewBox='0 0 24 24'
          fill='none'
          stroke='currentColor'
          strokeWidth='2'
          strokeLinecap='round'
          strokeLinejoin='round'
          className={`${opened ? 'transform rotate-45' : ''}`}
        >
          <line x1='12' y1='5' x2='12' y2='19'></line>
          <line x1='5' y1='12' x2='19' y2='12'></line>
        </svg>
      </div>
    </div>
  </div>
)

export default App
