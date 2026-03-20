import { useState } from 'react'
import SearchBar from './components/SearchBar'
import BookCard from './components/BookCard'
import BookDetail from './components/BookDetail'
import MyLibrary from './components/MyLibrary'
import useLibrary from './hooks/useLibrary'

function App() {
  const [books, setBooks] = useState([])
  const [loading, setLoading] = useState(false)
  const [selectedBook, setSelectedBook] = useState(null)
  const [showLibrary, setShowLibrary] = useState(false)
  const library = useLibrary()

  async function handleSearch(query) {
    setLoading(true)
    const response = await fetch(
      `https://openlibrary.org/search.json?q=${query}&limit=12`
    )
    const data = await response.json()
    setBooks(data.docs)
    setLoading(false)
  }

  if (selectedBook) {
    return (
      <BookDetail
        book={selectedBook}
        onBack={() => setSelectedBook(null)}
        library={library}
      />
    )
  }

  if (showLibrary) {
    return (
      <MyLibrary
        library={library}
        onBack={() => setShowLibrary(false)}
        onBookClick={(book) => {
          setShowLibrary(false)
          setSelectedBook(book)
        }}
      />
    )
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <div className="max-w-6xl mx-auto px-6 py-10">

        <div className="flex items-center justify-between mb-2">
          <div className="w-36" />
          <h1 className="text-4xl font-bold text-center">📚 Mi App de Libros</h1>
          <div className="w-36 flex justify-end">
            <button
              onClick={() => setShowLibrary(true)}
              className="flex items-center gap-2 bg-gray-800 hover:bg-gray-700 border border-gray-700 text-gray-300 text-sm font-medium px-4 py-2 rounded-lg transition-colors"
            >
              📖 Mi Biblioteca
              {library.library.length > 0 && (
                <span className="bg-blue-600 text-white text-xs px-2 py-0.5 rounded-full">
                  {library.library.length}
                </span>
              )}
            </button>
          </div>
        </div>

        <p className="text-center text-gray-400 mb-8">Busca cualquier libro del mundo</p>
        <SearchBar onSearch={handleSearch} />
        {loading && (
          <p className="text-center text-gray-400 mt-12">Buscando...</p>
        )}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 mt-10">
          {books.map((book) => (
            <BookCard
              key={book.key}
              book={book}
              onClick={() => setSelectedBook(book)}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default App