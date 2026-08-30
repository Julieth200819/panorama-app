import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="state">
      <span className="record-tag">error 404</span>
      <h3>Esta ruta no existe en el índice.</h3>
      <p>Revisa la dirección o vuelve al inicio.</p>
      <Link to="/" className="btn btn--primary">
        Volver al inicio
      </Link>
    </div>
  )
}
