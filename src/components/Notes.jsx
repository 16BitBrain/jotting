import { useNotes } from '../context/NoteContext'

import { deleteNote } from '../lib/actions/delete_note_action'

export default function Notes({ searched, notes, onEdit }) {
  const { removeNote } = useNotes()

  const onDelete = async (noteId) => {
    await deleteNote(noteId).then(() => removeNote(noteId))
  }

  return (
    <>
      {searched.length > 0 ? (
        searched.map((note) => (
          <Card
            key={note.id}
            id={note.id}
            title={note.title}
            content={note.text}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))
      ) : (
        <>
          {notes.map((note) => (
            <Card
              key={note.id}
              id={note.id}
              title={note.title}
              content={note.text}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
          {notes.length < 1 && (
            <h1 className='font-semibold text-3xl text-center py-20'>
              Something isn't taking place <br /> it's just empty in here.
            </h1>
          )}
        </>
      )}
    </>
  )
}

const Card = ({ id, title, content, onEdit, onDelete }) => (
  <div className='flex flex-col gap-2.5 bg-[#f4f4f4] cursor-pointer hover:brightness-95 rounded p-3 2xl:p-5'>
    <div className='w-full grid grid-cols-4'>
      <div className='col-span-3'>
        <h1 className='font-semibold text-[1.05rem]'>{title}</h1>
      </div>
      <div className='flex items-center gap-2 ml-auto'>
        <div
          className='btn-edit'
          title='edit note'
          onClick={() => onEdit({ id: id, title: title, text: content })}
        >
          ✏️
        </div>
        <div
          className='btn-delete'
          title='delete note'
          onClick={() => onDelete(id)}
        >
          💥
        </div>
      </div>
    </div>
    <p>{content}</p>
  </div>
)
