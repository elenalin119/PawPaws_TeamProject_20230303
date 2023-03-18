import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import SlideWord from '../Natalie/components/SlideWord'
import Slide from '../Natalie/components/Slide'
import FeaturedProperties from '../Elena/components/featuredProperties/FeaturedProperties'
import ShopCard from '../Natalie/components/ShopCard'

function Home() {
  return (
    <>
      <SlideWord />
      <HomePicture>
        <img src="../images/Natalie_img/pawpaws.png" alt="pawpaws" />
      </HomePicture>
      <SlideWord />
      {/* 商城 */}
      <Htitle>
        <h1>Pets Shop</h1>
        <p>寵物商城</p>
      </Htitle>
      <Line>
        <hr />
      </Line>
      <Picture>
        <img src="../images/Natalie_img/hp01.jpg" alt="AC06" />
      </Picture>
      <ShopCard />
      <Btn>
        <Link to={'/shop'}>
          <button>看更多>></button>
        </Link>
      </Btn>
      {/* 旅館 */}
      <Htitle>
        <h1>Pets Hotels</h1>
        <p>寵物住宿</p>
      </Htitle>
      <Line>
        <hr />
      </Line>
      <Picture>
        <img src="../images/Natalie_img/hp5.jpg" alt="hp05" />
      </Picture>
      <FeaturedProperties />
      <Btn>
        <Link to={`/hotel`}>
          <button>看更多>></button>
        </Link>
      </Btn>
      <Line>
        <hr />
      </Line>
      {/* 寵物活動 */}
      <Htitle>
        <h1>Pets Activity</h1>
        <p>寵物活動</p>
      </Htitle>
      <Picture>
        <img src="../images/Natalie_img/hp6.jpg" alt="hp05" />
      </Picture>
      <Slide />
      <Btn>
        <Link to={`/activity`}>
          <button>看更多>></button>
        </Link>
      </Btn>
    </>
  )
}

const Htitle = styled.div`
  position: absolute;
  z-index: 1; /* 將文字元素的z-index設為較高的值，讓它們疊在圖像上面 */
  color: #ffffff;
  margin: 138px auto;
  text-align: center;
  width: 100%;
  min-width: 100px;
  letter-spacing: 2px;
  h1 {
    font-weight: bolder;
  }
  p {
    font-size: 24px;
    font-weight: bolder;
  }
`
const Line = styled.div`
  hr {
    border: none;
    border-top: 3px solid #ffb544;
  }
`

const HomePicture = styled.div`
  margin: 0;
  position: relative;
  width: 100%;
  height: 80%;
  img {
    display: inline-block;
    object-fit: cover;
    object-position: center center;
    width: 100%;
    max-height: 600px;
    overflow: hidden;
  }
`

const Picture = styled.div`
  width: 100%;
  height: 100%;
  margin-bottom: 2rem;
  img {
    position: relative;
    filter: brightness(0.7);
    object-fit: cover;
    object-position: center center;
    width: 100%;
    max-height: 300px;
    overflow: hidden;
  }
`

const Btn = styled.div`
  margin-top: 2rem;
  display: flex;
  justify-content: center;
  button {
    color: #ffb544;
    background: none;
    padding: 10px;
    border: 2px solid #ffb544;
    border-radius: 15px;
  }
`
export default Home
