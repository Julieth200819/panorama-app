import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <section className="basic-hero">
      <div className="container basic-hero__inner">
        <h1>Panorama</h1>
        <p>
          Consulta usuarios y fotografías en un solo lugar, con listados
          paginados y una vista de detalle para cada registro.
        </p>
        <div className="basic-hero__actions">
          <Link to="/usuarios" className="btn btn--primary">
            Ver usuarios
          </Link>
          <Link to="/fotos" className="btn btn--ghost">
            Ver fotos
          </Link>
        </div>
      </div>
    </section>
  )
}
