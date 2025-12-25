import { Route, Routes, useNavigate } from 'react-router-dom'
import './App.css'
import InfiniteScroll from './assets/InfiniteScroll/InfiniteScroll'

function App() {
  const navigate = useNavigate()

  const moveToInfiniteScrollPage = () => {
    navigate('/InfiniteScroll')
  }

  return (
    <>
      <button onClick={moveToInfiniteScrollPage}>
        무한 스크롤 구현 페이지로 이동하기
      </button>

      <Routes>
        <Route path="/InfiniteScroll" element={<InfiniteScroll />} />
      </Routes>
    </>
  )
}

export default App
