import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { getPhotoById } from '../services/api'
import { Loading, ErrorState } from '../components/State'

export default function PhotoDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [photo, setPhoto] = useState(null)
  const [status, setStatus] = useState('loading')

  function load() {
    setStatus('loading')
    getPhotoById(id)
      .then((data) => {
        if (!data || !data.id) {
          setStatus('notfound')
          return
        }
        setPhoto(data)
        setStatus('ready')
      })
      .catch(() => setStatus('error'))
  }

  useEffect(load, [id])

  if (status === 'loading') return <Loading label={`Cargando foto #${id}…`} />
  if (status === 'error')
    return <ErrorState message="No se pudo obtener esta fotografía." onRetry={load} />
  if (status === 'notfound')
    return (
      <div className="state">
        <h3>Fotografía no encontrada</h3>
        <p>No existe ningún registro con el id {id}.</p>
        <button className="btn btn--ghost" onClick={() => navigate('/fotos')}>
          Volver a la bitácora
        </button>
      </div>
    )

  const fallback = `https://picsum.photos/seed/${photo.id}/600/600`

  return (
    <section className="detail container">
      <div className="breadcrumb">
        <Link to="/fotos">Fotos</Link>
        <span>/</span>
        <span>#{photo.id}</span>
      </div>

      <div className="detail-photo">
        <img
          src={photo.url}
          alt={photo.title}
          onError={(e) => {
            if (e.target.src !== fallback) e.target.src = fallback
          }}
        />
        <div clsassName="detail-photo__info">
          <span className="record-tag">registro #{String(photo.id).padStart(4, '0')}</span>
          <h1 style={{ marginTop: 14 }}>{photo.title}</h1>

          <div className="detail-user__grid" style={{ marginTop: 24 }}>
            <div className="detail-user__field">
              <label>Álbum</label>
              <div>#{photo.albumId}</div>
            </div>
            <div className="detail-user__field">
              <label>Miniatura</label>
              <div>{photo.thumbnailUrl}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
