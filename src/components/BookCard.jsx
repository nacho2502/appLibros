function BookCard({ book }) {
  const coverId = book.cover_i
  const coverUrl = coverId
    ? `https://covers.openlibrary.org/b/id/${coverId}-M.jpg`
    : null

  const author = book.author_name ? book.author_name[0] : 'Autor desconocido'
  const year = book.first_publish_year ?? 'Año desconocido'

  return (
    <div>
      {coverUrl ? (
        <img src={coverUrl} alt={book.title} />
      ) : (
        <div style={{
          width: '128px',
          height: '193px',
          backgroundColor: '#2d2d2d',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '8px',
          textAlign: 'center',
        }}>
          <span style={{ fontSize: '32px' }}>📚</span>
          <p style={{ fontSize: '12px', color: '#aaa', marginTop: '8px' }}>
            {book.title}
          </p>
        </div>
      )}
      <h3>{book.title}</h3>
      <p>{author}</p>
      <p>{year}</p>
    </div>
  )
}

export default BookCard