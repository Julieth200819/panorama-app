import { Link } from 'react-router-dom'

export default function PhotoCard({ photo }) {
  const fallback = `https://picsum.photos/seed/${photo.id}/300/300`

  return (
    <Link to={`/fotos/${photo.id}`} className="card-photo">
      <img
        src={photo.thumbnailUrl}
        alt={photo.title}
        loading="lazy"
        onError={(e) => {
          if (e.target.src !== fallback) e.target.src = fallback
        }}
      />
      <div className="card-photo__overlay">#{photo.id} · álbum {photo.albumId}</div>
    </Link>
  )
}
