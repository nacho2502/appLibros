import { useState } from 'react'

const TABS = [
  { status: 'quiero_leer', icon: '🔖', label: 'Quiero leer' },
  { status: 'leyendo', icon: '📖', label: 'Leyendo' },
  { status: 'leído', icon: '✅', label: 'Leído' },
]

function MyLibrary({ library, onBack, onBookClick }) {
  const [activeTab, setActiveTab] = useState('quiero_leer')

  const filtered = library.library.filter(b => b.status === activeTab)

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <div className="max-w-6xl mx-auto px-6 py-10">

        <button
          onClick={onBack}
          className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-8"
        >
          ← Volver a la búsqueda
        </button>

        <h1 className="text-4xl font-bold text-center mb-8">📖 Mi Biblioteca</h1>

        <div className="flex justify-center gap-2 mb-10">
          {TABS.map(({ status, icon, label }) => {
            const count = library.library.filter(b => b.status === status).length
            return (
              <button
                key={status}
                onClick={() => setActiveTab(status)}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl border text-sm font-medium transition-all ${
                  activeTab === status
                    ? 'bg-blue-950 border-blue-500 text-blue-300'
                    : 'bg-gray-900 border-gray-700 text-gray-400 hover:border-gray-500'
                }`}
              >
                <span>{icon}</span>
                {label}
                <span className={`text-xs px-2 py-0.5 rounded-full ${
                  activeTab === status ? 'bg-blue-900 text-blue-300' : 'bg-gray-800 text-gray-500'
                }`}>
                  {count}
                </span>
              </button>
            )
          })}
        </div>

        {filtered.length === 0 ? (
          <div className="text-center text-gray-500 mt-20">
            <p className="text-5xl mb-4">📭</p>
            <p className="text-lg">No tienes libros aquí todavía</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {filtered.map((book) => {
              const coverUrl = book.cover_i
                ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
                : null
              const author = book.author_name ? book.author_name[0] : 'Autor desconocido'

              return (
                <div
                  key={book.key}
                  onClick={() => onBookClick(book)}
                  className="flex flex-col gap-2 cursor-pointer group"
                >
                  {coverUrl ? (
                    <img
                      src={coverUrl}
                      alt={book.title}
                      className="w-full rounded-lg shadow-lg group-hover:scale-105 transition-transform duration-200"
                    />
                  ) : (
                    <div className="w-full aspect-[2/3] bg-gray-800 rounded-lg flex flex-col items-center justify-center p-3 text-center group-hover:scale-105 transition-transform duration-200">
                      <span className="text-3xl">📚</span>
                      <p className="text-xs text-gray-400 mt-2 line-clamp-3">{book.title}</p>
                    </div>
                  )}
                  <div>
                    <p className="text-sm font-semibold leading-tight line-clamp-2">{book.title}</p>
                    <p className="text-xs text-gray-400 mt-1">{author}</p>
                    {book.rating && (
                        <p className="text-xs text-amber-400 mt-1 flex items-center gap-1">
                            {'★'.repeat(book.rating)}{'☆'.repeat(10 - book.rating)}
                            <span className="text-gray-400">{book.rating}/10</span>
                        </p>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}

export default MyLibrary