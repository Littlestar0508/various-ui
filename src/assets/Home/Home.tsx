import { useNavigate } from 'react-router-dom'
import './Home.css'

function Home() {
  const navigation = useNavigate()

  const moveToInfiniteScrollPage = () => navigation('/InfiniteScroll')

  return (
    <>
      <button onClick={moveToInfiniteScrollPage}>무한 스크롤 UI</button>
    </>
  )
}

export default Home
