import { useState, useEffect } from 'react'

function BookDetail({ book, onBack }) {
  const [details, setDetails] = useState(null)
  const [pages, setPages] = useState(null)
  const [loading, setLoading] = useState(true)

  const coverId = book.cover_i
  const coverUrl = coverId
    ? `https://covers.openlibrary.org/b/id/${coverId}-L.jpg`
    : null

  const authors = book.author_name ? book.author_name.join(', ') : 'Autor desconocido'
  const year = book.first_publish_year ?? 'Desconocido'
  const publishers = book.publisher ? book.publisher.slice(0, 3).join(', ') : 'Desconocido'
  const languages = book.language ? book.language.slice(0, 5).join(', ').toUpperCase() : 'Desconocido'
  const subjects = book.subject ? book.subject.slice(0, 8) : []

  useEffect(() => {
    async function fetchDetails() {
      try {
        const [worksRes, editionsRes] = await Promise.all([
          fetch(`https://openlibrary.org${book.key}.json`),
          fetch(`https://openlibrary.org${book.key}/editions.json?limit=10`)
        ])
        const worksData = await worksRes.json()
        const editionsData = await editionsRes.json()

        setDetails(worksData)

        const pagesFound = editionsData.entries
          ?.map(e => e.number_of_pages)
          .find(p => p != null)

        setPages(
          book.number_of_pages_median
          ?? pagesFound
          ?? 'Desconocido'
        )
      } catch (error) {
        console.error('Error fetching details:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchDetails()
  }, [book.key])

  const description = details?.description
    ? typeof details.description === 'string'
      ? details.description
      : details.description.value
    : null

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <div className="max-w-5xl mx-auto px-6 py-10">

        <button
          onClick={onBack}
          className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-8"
        >
          ← Volver a resultados
        </button>

        <div className="flex flex-col md:flex-row gap-10">

          <div className="flex-shrink-0">
            {coverUrl ? (
              <img
                src={coverUrl}
                alt={book.title}
                className="w-48 rounded-lg shadow-xl"
              />
            ) : (
              <div className="w-48 h-72 bg-gray-800 rounded-lg flex flex-col items-center justify-center p-4 text-center">
                <span className="text-5xl">📚</span>
                <p className="text-xs text-gray-400 mt-3">{book.title}</p>
              </div>
            )}
          </div>

          <div className="flex flex-col gap-6 flex-1">

            <div>
              <h1 className="text-3xl font-bold leading-tight">{book.title}</h1>
              <p className="text-xl text-gray-300 mt-2">{authors}</p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              <div className="bg-gray-800 rounded-lg p-4">
                <p className="text-xs text-gray-400 mb-1">Año de publicación</p>
                <p className="text-lg font-semibold">{year}</p>
              </div>
              <div className="bg-gray-800 rounded-lg p-4">
                <p className="text-xs text-gray-400 mb-1">Páginas</p>
                <p className="text-lg font-semibold">
                  {loading ? '...' : pages}
                </p>
              </div>
              <div className="bg-gray-800 rounded-lg p-4">
                <p className="text-xs text-gray-400 mb-1">Editorial</p>
                <p className="text-sm font-semibold">{publishers}</p>
              </div>
              <div className="bg-gray-800 rounded-lg p-4">
                <p className="text-xs text-gray-400 mb-1">Idiomas disponibles</p>
                <p className="text-sm font-semibold">{languages}</p>
              </div>
            </div>

            {subjects.length > 0 && (
              <div>
                <p className="text-xs text-gray-400 mb-2">Géneros y temáticas</p>
                <div className="flex flex-wrap gap-2">
                  {subjects.map((subject, index) => (
                    <span
                      key={index}
                      className="bg-blue-900 text-blue-200 text-xs px-3 py-1 rounded-full"
                    >
                      {subject}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div>
              <p className="text-xs text-gray-400 mb-2">Sinopsis</p>
              {loading ? (
                <p className="text-gray-500 text-sm">Cargando sinopsis...</p>
              ) : description ? (
                <p className="text-gray-300 text-sm leading-relaxed">{description}</p>
              ) : (
                <p className="text-gray-500 text-sm">No hay sinopsis disponible para este libro.</p>
              )}
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}

export default BookDetail