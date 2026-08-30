import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { getUserById } from '../services/api'
import { Loading, ErrorState } from '../components/State'

export default function UserDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [user, setUser] = useState(null)
  const [status, setStatus] = useState('loading')

  function load() {
    setStatus('loading')
    getUserById(id)
      .then((data) => {
        if (!data || !data.id) {
          setStatus('notfound')
          return
        }
        setUser(data)
        setStatus('ready')
      })
      .catch(() => setStatus('error'))
  }

  useEffect(load, [id])

  if (status === 'loading') return <Loading label={`Cargando usuario #${id}…`} />
  if (status === 'error')
    return <ErrorState message="No se pudo obtener este registro." onRetry={load} />
  if (status === 'notfound')
    return (
      <div className="state">
        <h3>Usuario no encontrado</h3>
        <p>No existe ningún registro con el id {id}.</p>
        <button className="btn btn--ghost" onClick={() => navigate('/usuarios')}>
          Volver al directorio
        </button>
      </div>
    )

  const initials = user.name
    .split(' ')
    .map((w) => w[0])
    .slice(0, 2)
    .join('')

  return (
    <section className="detail container">
      <div className="breadcrumb">
        <Link to="/usuarios">Usuarios</Link>
        <span>/</span>
        <span>#{user.id}</span>
      </div>

      <div className="detail-user">
        <div>
          <div className="detail-user__avatar">{initials}</div>
          <span className="record-tag">registro #{String(user.id).padStart(3, '0')}</span>
        </div>

        <div>
          <h1>{user.name}</h1>
          <p style={{ color: 'var(--accent)', fontFamily: 'var(--font-mono)', marginTop: 0 }}>
            @{user.username}
          </p>

          <div className="detail-user__grid">
            <div className="detail-user__field">
              <label>Correo</label>
              <div>{user.email}</div>
            </div>
            <div className="detail-user__field">
              <label>Teléfono</label>
              <div>{user.phone}</div>
            </div>
            <div className="detail-user__field">
              <label>Sitio web</label>
              <div>{user.website}</div>
            </div>
            <div className="detail-user__field">
              <label>Empresa</label>
              <div>{user.company?.name}</div>
            </div>
            <div className="detail-user__field">
              <label>Frase corporativa</label>
              <div>“{user.company?.catchPhrase}”</div>
            </div>
            <div className="detail-user__field">
              <label>Dirección</label>
              <div>
                {user.address?.street} {user.address?.suite}, {user.address?.city} (
                {user.address?.zipcode})
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
