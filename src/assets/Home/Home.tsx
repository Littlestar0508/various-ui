import { useNavigate } from 'react-router-dom'
import './Home.css'

function Home() {
  const navigation = useNavigate()

  const moveToInfiniteScrollPage = () => navigation('/InfiniteScroll')
  const moveToPaginationPage = () => navigation('/Pagination')
  const moveToChartJS = () => navigation('/ChartJS')

  return (
    <>
      <button onClick={moveToInfiniteScrollPage}>무한 스크롤 UI</button>
      <button onClick={moveToPaginationPage}>페이지네이션 UI</button>
      <button onClick={moveToChartJS}>Chart JS 예제</button>
    </>
  )
}

export default Home
