import axios from 'axios'
import './InfiniteScroll.css'
import { useEffect, useRef } from 'react'
import { useInfiniteQuery } from '@tanstack/react-query'

type Picture = {
  id: string
  author: string
  download_url: string
}

const LIMIT = 10

const fecthNextPicture = async ({ pageParam }: { pageParam: number }) => {
  const res = await axios.get<Picture[]>(
    `https://picsum.photos/v2/list?page=${pageParam}&limit=${LIMIT}`
  )

  return res.data
}

function InfiniteScroll() {
  const sentinelRef = useRef<HTMLDivElement | null>(null)

  const {
    data,
    error,
    isLoading,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = useInfiniteQuery({
    queryKey: ['picsum', LIMIT],
    queryFn: fecthNextPicture,
    initialPageParam: 1,
    getNextPageParam: (_lastPage, allPages) => allPages.length + 1,
    staleTime: 1000 * 60,
  })

  const pictureList = data?.pages.flat() ?? []

  useEffect(() => {
    const el = sentinelRef.current
    if (!el) return

    const io = new IntersectionObserver(
      (entries) => {
        const first = entries[0]
        if (!first?.isIntersecting) return
        if (!hasNextPage) return
        if (isFetchingNextPage) return

        fetchNextPage()
      },
      { rootMargin: '300px' }
    )

    io.observe(el)
    return () => io.disconnect()
  }, [fetchNextPage, hasNextPage, isFetchingNextPage])

  if (isLoading) return <p>처음 이미지 불러오는 중...</p>
  if (error) return <p>에러가 발생했어요.</p>

  return (
    <>
      <h2>무한 스크롤</h2>

      <div className="grid">
        {pictureList.map((img) => (
          <figure key={img.id}>
            <img
              src={`https://picsum.photos/id/${img.id}/200/200`}
              alt={img.author}
              loading="lazy"
            />
          </figure>
        ))}
      </div>
      <div ref={sentinelRef}></div>

      {isFetchingNextPage && <p>불러오는 중...</p>}
    </>
  )
}

export default InfiniteScroll
