import { Link } from 'react-router-dom'

export default function UserCard({ user }) {
  const initials = user.name
    .split(' ')
    .map((w) => w[0])
    .slice(0, 2)
    .join('')

  return (
    <Link to={`/usuarios/${user.id}`} className="card-user">
      <span className="card-user__id">#{String(user.id).padStart(3, '0')}</span>
      <div className="card-user__avatar">{initials}</div>
      <h3>{user.name}</h3>
      <p className="card-user__handle">@{user.username}</p>
      <div className="card-user__meta">
        <span>{user.email}</span>
        <span>{user.company?.name}</span>
        <span>{user.address?.city}</span>
      </div>
    </Link>
  )
}
