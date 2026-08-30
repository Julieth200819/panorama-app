export function Loading({ label = 'Cargando registros…' }) {
  return (
    <div className="state" role="status">
      <div className="state__spinner" />
      <p>{label}</p>
    </div>
  )
}

export function ErrorState({ message, onRetry }) {
  return (
    <div className="state">
      <h3>No se pudo cargar la información</h3>
      <p>{message}</p>
      {onRetry && (
        <button className="btn btn--ghost" onClick={onRetry}>
          Reintentar
        </button>
      )}
    </div>
  )
}
