/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react'
import { ZodError } from 'zod'

import { useNotes } from '../context/NoteContext'

import { noteSchema } from '../lib/validation/note.validate'
import { addNote as createNote } from '../lib/actions/add_note_action'
import { editNote } from '../lib/actions/edit_note_action'

export default function NoteForm({
  note,
  onEdit,
  formOpened,
  closeFormOnMobile,
}) {
  const { addNote, commitNote } = useNotes()
  const defaultNote = {
    id: '',
    title: '',
    text: '',
  }

  const [formData, setFormData] = useState(defaultNote)
  const [errors, setErrors] = useState({})

  const cleanForm = () => {
    setFormData(defaultNote)
    setErrors({})
    onEdit(defaultNote)
  }

  const handleTitleChange = (e) => {
    const { name, value } = e.target
    const lines = value.split('\n')

    if (value.length > 50) {
      return
    }

    if (lines.length > 2) {
      const croppedValue = lines.slice(0, 2).join('\n')

      setFormData((prevData) => ({ ...prevData, [name]: croppedValue }))
    }

    if (lines.length <= 2) {
      setFormData((prevData) => ({ ...prevData, [name]: value }))
    }
  }

  const handleTextChange = (e) => {
    const { name, value } = e.target

    setFormData((prevData) => ({ ...prevData, [name]: value }))
  }

  const handleFormSubmit = async (e) => {
    e.preventDefault()

    if (formData.title === '' && formData.text === '') {
      return
    }

    try {
      noteSchema.parse(formData)

      if (!formData.id) {
        const note = await createNote(formData.title, formData.text)

        addNote(note)
      } else {
        const note = await editNote(formData.id, formData.title, formData.text)

        commitNote(note.id, note)
      }

      cleanForm()
    } catch (error) {
      if (error instanceof ZodError) {
        setErrors(
          error.errors.reduce(
            (acc, curr) => ({ ...acc, [curr.path[0]]: curr.message }),
            {}
          )
        )
      }
    }
  }

  useEffect(() => {
    if (!note.id) return

    // set the initial text in the form
    setFormData({ id: note.id, title: note.title, text: note.text })
  }, [note])

  return (
    <div className='relative lg:pl-14 2xl:px-14'>
      <form onSubmit={handleFormSubmit}>
        <div className='flex gap-6'>
          <div className='w-10 hidden 2xl:block'>
            <h3 className='font-semibold text-[#aaa] py-3'>Title</h3>
          </div>
          <div className='w-full flex flex-col gap-2'>
            <textarea
              type='title'
              id='title'
              name='title'
              value={formData.title}
              onChange={handleTitleChange}
              placeholder='Write down your ideas 💡'
              className='form-title'
            />
            {errors.title && (
              <p className='text-red-500 text-sm pb-2'>{errors.title}</p>
            )}
          </div>
        </div>

        <div className='flex gap-6'>
          <div className='w-10 hidden 2xl:block'>
            <h3 className='font-semibold text-[#aaa]'>Text</h3>
          </div>
          <div className='w-full flex flex-col gap-2'>
            <textarea
              type='text'
              id='text'
              name='text'
              onChange={handleTextChange}
              // onInput={handleTextChange}
              value={formData.text}
              placeholder='Sometimes, on Mondays ...'
              className='form-text note-scrollbar'
            />
            {errors.text && (
              <p className='text-red-500 text-sm pb-2'>{errors.text}</p>
            )}
          </div>
        </div>

        <div className='mt-10 2xl:ml-16 space-y-6'>
          <hr />
          <div className='flex justify-end gap-4'>
            {formData.id && (
              <button
                className='btn-form !bg-red-500 hover:!bg-red-600'
                onClick={() => {
                  cleanForm()
                  closeFormOnMobile()
                }}
              >
                <span>🙈 Cancel Editing</span>
              </button>
            )}
            {formOpened && !formData.id && (
              <button
                className='btn-form !bg-zinc-200 hover:!bg-zinc-300 !text-neutral-600'
                onClick={closeFormOnMobile}
              >
                Cancel
              </button>
            )}
            <button className='btn-form'>
              <span>{formData.id ? '✏️ Edit Note' : '➕ Add Note'}</span>
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}
