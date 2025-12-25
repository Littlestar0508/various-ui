import axios from 'axios'
import './InfiniteScroll.css'
import { useEffect, useRef, useState } from 'react'

type PictureList = {
  id: string
  author: string
  download_url: string
}

function InfiniteScroll() {
  const [imgList, setImgList] = useState<PictureList[]>([])
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const sentinelRef = useRef<HTMLDivElement | null>(null)

  const fetchMore = async () => {
    if (loading) return
    setLoading(true)
    try {
      const res = await axios.get<PictureList[]>(
        `https://picsum.photos/v2/list?page=${page}&limit=10`
      )
      setImgList((prev) => [...prev, ...res.data])
      setPage((p) => p + 1)
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    const el = sentinelRef.current
    if (!el) return

    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) fetchMore()
      },
      { rootMargin: '300px' }
    )

    io.observe(el)
    return () => io.disconnect()
  }, [page, loading])

  return (
    <div className="page">
      <h2>무한 스크롤</h2>

      <div className="grid">
        {imgList.map((img) => (
          <figure key={img.id}>
            <img
              src={`https://picsum.photos/id/${img.id}/300/200`}
              alt={img.author}
              loading="lazy"
            />
            <figcaption>{img.author}</figcaption>
          </figure>
        ))}
      </div>

      <div ref={sentinelRef} style={{ height: 1 }} />
      {loading && <p>불러오는 중...</p>}
    </div>
  )
}

export default InfiniteScroll
