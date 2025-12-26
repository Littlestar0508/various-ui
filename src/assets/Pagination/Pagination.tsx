import axios from 'axios'
import './Pagination.css'
import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'

type Picture = {
  id: string
  author: string
  download_url: string
}

const LIMIT = 12

const fetchPictureList = async (page: number) => {
  const res = await axios.get<Picture[]>(
    `https://picsum.photos/v2/list?page=${page}&limit=${LIMIT}`
  )

  return res.data
}

function Pagination() {
  const [page, setPage] = useState(1)

  const { data, isLoading, isFetching, error } = useQuery({
    queryKey: ['picsum', page, LIMIT],
    queryFn: () => fetchPictureList(page),
    staleTime: 1000 * 30,
    placeholderData: (prev) => prev,
  })

  if (isLoading) return <p>로딩 중 ...</p>
  if (error) return <p>오류 발생</p>

  return (
    <>
      <h2>페이지네이션</h2>

      <div className="gridPagination">
        {data?.map((img) => (
          <figure key={img.id}>
            <img
              src={`https://picsum.photos/id/${img.id}/300/200`}
              alt={img.author}
            />
          </figure>
        ))}
      </div>

      <div style={{ display: 'flex', gap: 8, marginTop: 16 }}>
        <button
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          disabled={page === 1}
        >
          이전
        </button>
        <span> page : {page}</span>

        <button onClick={() => setPage((p) => p + 1)}>다음</button>

        {isFetching && <p>불러오는 중...</p>}
      </div>
    </>
  )
}

export default Pagination
