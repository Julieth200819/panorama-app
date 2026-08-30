import { useEffect, useMemo, useState } from 'react'
import { getUsers } from '../services/api'
import UserCard from '../components/UserCard'
import Pagination from '../components/Pagination'
import { Loading, ErrorState } from '../components/State'

const PAGE_SIZE = 6

export default function Users() {
  const [users, setUsers] = useState([])
  const [status, setStatus] = useState('loading')
  const [page, setPage] = useState(1)

  function load() {
    setStatus('loading')
    getUsers()
      .then((data) => {
        setUsers(data)
        setStatus('ready')
      })
      .catch(() => setStatus('error'))
  }

  useEffect(load, [])

  const totalPages = Math.max(1, Math.ceil(users.length / PAGE_SIZE))

  const visibleUsers = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE
    return users.slice(start, start + PAGE_SIZE)
  }, [users, page])

  return (
    <section className="section container">
      <div className="section__head">
        <div>
          <h2>Directorio de usuarios</h2>
        </div>
        <span className="record-tag">{users.length} registros</span>
      </div>

      {status === 'loading' && <Loading label="Cargando usuarios…" />}
      {status === 'error' && (
        <ErrorState message="No se pudo contactar al servidor. Verifica tu conexión." onRetry={load} />
      )}

      {status === 'ready' && (
        <>
          <div className="grid-users">
            {visibleUsers.map((user) => (
              <UserCard key={user.id} user={user} />
            ))}
          </div>

          <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />
        </>
      )}
    </section>
  )
}
