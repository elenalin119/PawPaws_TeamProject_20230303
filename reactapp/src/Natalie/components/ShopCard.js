import React from 'react'
import '../styles/homecard.css'

function ShopCard() {
  return (
    <>
      <div className="allshopcards">
        <div className="cardbox">
          <img
            src="http://localhost:3001/images/Amy_img/products/01.twomeats-1-247x247.jpg"
            alt="貓用｜2種肉無膠主食罐"
          />
          <h5>貓用｜2種肉無膠主食罐</h5>
        </div>

        <div className="cardbox">
          <img
            src="http://localhost:3001/images/Amy_img/products/12.clovefish-1-1-247x247.jpg"
            alt="犬貓｜咔滋凍乾干貝小魚乾"
          />
          <h5>犬貓｜咔滋凍乾干貝小魚乾</h5>
        </div>

        <div className="cardbox">
          <img
            src="http://localhost:3001/images/Amy_img/products/07.dry_tag-247x247.jpg"
            alt="貓用｜98%鮮肉主食糧"
          />
          <h5>貓用｜98%鮮肉主食糧</h5>
        </div>

        <div className="cardbox">
          <img
            src="http://localhost:3001/images/Amy_img/products/17.bitemetoy-1-247x247.jpg"
            alt="貓用｜2種肉無膠主食罐"
          />
          <h5>犬用｜快樂漢堡 發聲玩具</h5>
        </div>

        <div className="cardbox">
          <img
            src="http://localhost:3001/images/Amy_img/products/19.catteaserwand-2-247x247.jpg"
            alt="貓用｜天使法杖×惡魔長鞭 逗貓棒"
          />
          <h5>貓用｜天使法杖×惡魔長鞭 逗貓棒</h5>
        </div>

        <div className="cardbox">
          <img
            src="http://localhost:3001/images/Amy_img/products/20.relax01_tag-247x247.jpg"
            alt="貓用｜費洛蒙紓壓豆腐砂"
          />
          <h5>貓用｜費洛蒙紓壓豆腐砂</h5>
        </div>
      </div>
    </>
  )
}

export default ShopCard
