import React from 'react'
import './hotelConfirm.css'
import { Link, useNavigate } from 'react-router-dom'

function HotelConfirm(props) {
  const navigate = useNavigate()
  const { hotel } = props
  return (
    <>
      <div className="searchItem">
        <img
          src={'http://localhost:3000/images/Elena_img/' + hotel.h_photos}
          alt=""
          className="siImg"
        />
        <div className="siDesc">
          <h1 className="siTitle">{hotel.h_name}</h1>
          <span className="siCity">{hotel.h_city}</span>
          <span className="siDistance">離市中心{hotel.h_distance}m</span>
          <span className="siTaxi0p">免費機場接駁</span>
          <span className="siSubtitle">冷氣套房</span>
          <span className="siFeatures">一大床 • 獨立衛浴 • minibar</span>
          <span className="siCancelOp">免費取消</span>
          <span className="siCance10pSubtitle">
            您可以稍後取消,請放心預訂！
          </span>
        </div>
        <div className="siDetails">
          {hotel.h_rating && (
            <div className="siRating">
              <span>超讚</span>
              <button>{hotel.h_rating}</button>
            </div>
          )}
          <div className="siDetailTexts">
            <span className="siPrice">NTD${hotel.h_cheapestPrice}</span>
            <span className="siTaxOp">含稅價</span>
            <button
              className="siCheckButton"
              onClick={() => {
                navigate(`/hotel/hoteldetail/${hotel.h_id}`)
              }}
            >
              預訂
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default HotelConfirm
