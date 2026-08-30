import { useEffect, useState } from 'react'
import { getPhotos } from '../services/api'
import PhotoCard from '../components/PhotoCard'
import Pagination from '../components/Pagination'
import { Loading, ErrorState } from '../components/State'

const PAGE_SIZE = 24

export default function Photos() {
  const [photos, setPhotos] = useState([])
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(1)
  const [status, setStatus] = useState('loading')

  function load(targetPage) {
    setStatus('loading')
    getPhotos({ page: targetPage, limit: PAGE_SIZE })
      .then(({ data, total }) => {
        setPhotos(data)
        setTotal(total)
        setStatus('ready')
      })
      .catch(() => setStatus('error'))
  }

  useEffect(() => {
    load(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [page])

  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE))

  return (
    <section className="section container">
      <div className="section__head">
        <div>
          <h2>Bitácora fotográfica</h2>
        </div>
        <span className="record-tag">{total.toLocaleString('es')} registros</span>
      </div>

      {status === 'loading' && <Loading label={`Cargando página ${page}…`} />}
      {status === 'error' && (
        <ErrorState message="No se pudo contactar al servidor. Verifica tu conexión." onRetry={() => load(page)} />
      )}

      {status === 'ready' && (
        <>
          <div className="grid-photos">
            {photos.map((photo) => (
              <PhotoCard key={photo.id} photo={photo} />
            ))}
          </div>

          <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />
        </>
      )}
    </section>
  )
}
