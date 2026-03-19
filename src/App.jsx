import { useState } from 'react'
import SearchBar from './components/SearchBar'
import BookCard from './components/BookCard'

function App() {
  const [books, setBooks] = useState([])
  const [loading, setLoading] = useState(false)

  async function handleSearch(query) {
    setLoading(true)
    const response = await fetch(
      `https://openlibrary.org/search.json?q=${query}&limit=12`
    )
    const data = await response.json()
    setBooks(data.docs)
    setLoading(false)
  }

  return (
    <div>
      <h1>Mi app de libros</h1>
      <SearchBar onSearch={handleSearch} />
      {loading && <p>Buscando...</p>}
      <div>
        {books.map((book) => (
          <BookCard key={book.key} book={book} />
        ))}
      </div>
    </div>
  )
}

export default App