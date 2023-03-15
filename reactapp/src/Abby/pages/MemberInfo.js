import { useState, useRef, useEffect } from 'react'
import Edit from '../components/Edit'
import Order from '../components/OrderList/Order'

export default function MemberInfo() {
  const [page, setPage] = useState(0)
  const [windowWidth, setWindowWidth] = useState(window.innerWidth)

  useEffect(() => {
    const handleWindowResize = () => {
      setWindowWidth(window.innerWidth)
    }

    window.addEventListener('resize', handleWindowResize)

    return () => {
      window.removeEventListener('resize', handleWindowResize)
    }
  }, [])

  return (
    <>
      <div className="container">
        <div
          className="userFormHeader"
          style={
            windowWidth >= 768
              ? page === 0
                ? { width: '600px' }
                : { width: '1200px' }
              : { width: 'auto' }
          }
        >
          <button
            className={`member-button ${page === 0 ? ' active' : ''}`}
            onClick={() => setPage(0)}
          >
            個人資訊
          </button>
          <button
            className={`member-button ${page === 1 ? ' active' : ''}`}
            onClick={() => setPage(1)}
          >
            訂單查詢
          </button>
        </div>
        {page === 0 && <Edit />}
        {page === 1 && <Order />}
      </div>
    </>
  )
}
