function Search({ searchQuery, onSearch }) {
  return (
    <div className='flex flex-col gap-1.5'>
      <input
        className='search md:text-lg'
        type='text'
        placeholder='🔍️ Search note'
        value={searchQuery}
        onChange={(e) => onSearch(e.target.value)}
      />
    </div>
  )
}

export default Search
