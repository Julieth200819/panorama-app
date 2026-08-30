export default function Pagination({ currentPage, totalPages, onPageChange }) {
  if (totalPages <= 1) return null

  const windowSize = 1
  const pages = []

  for (let p = 1; p <= totalPages; p++) {
    const isEdge = p === 1 || p === totalPages
    const isNear = Math.abs(p - currentPage) <= windowSize
    if (isEdge || isNear) {
      pages.push(p)
    } else if (pages[pages.length - 1] !== '...') {
      pages.push('...')
    }
  }

  return (
    <nav className="pagination" aria-label="Paginación">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        aria-label="Página anterior"
      >
        ←
      </button>

      {pages.map((p, i) =>
        p === '...' ? (
          <span key={`e-${i}`} className="pagination__ellipsis">
            …
          </span>
        ) : (
          <button
            key={p}
            className={p === currentPage ? 'active' : ''}
            onClick={() => onPageChange(p)}
            aria-current={p === currentPage ? 'page' : undefined}
          >
            {p}
          </button>
        )
      )}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        aria-label="Página siguiente"
      >
        →
      </button>
    </nav>
  )
}
