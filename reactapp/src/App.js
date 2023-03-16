import Home from './pages/Home'

import Shop from './pages/Shop'
// import Collection from '../src/Amy/pages/Collection'
import Bar from './Amy/components/Bar/index'
import Promotion from './Amy/components/Promotion/index'
import AppDrawer from './Amy/components/Drawer/index'
import { UIProvider } from './Amy/context/UI/index'
import { CartProvider } from './Amy/hooks/useCart'
import Cart from '../src/Amy/components/Cart'

import Hotel from './pages/Hotel'
import Mainphoto from './Elena/components/mainphoto/Mainphoto'
import HotelDetail from './Elena/pages/hotelDetail/HotelDetail'
import HotelList from './Elena/pages/hotelList/HotelList'
import HotelBooking from './Elena/pages/hotelBooking/HotelBooking'
import HotelPayment from './Elena/pages/hotelPayment/HotelPayment'
import HotelBookingSuccess from './Elena/pages/hotelBookingSuccess/HotelBookingSuccess'

import Activity from './pages/Activity'
import Collection from './pages/Collection'
import ActivityDetail from './Natalie/pages/ActivityDetail'
import ActivitySignUp from './Natalie/pages/ActivitySignUp'

import Members from './pages/Members'
import Edit from './Abby/components/Edit'
import Register from './Abby/pages/Register'
import NewPwd from './Abby/pages/NewPwd'
import MemberInfo from './Abby/pages/MemberInfo'
import ForgetPwd from './Abby/pages/ForgetPwd'

import React from 'react'
import Header from './components/headers/Headers'
import Footer from './components/Footer/index'
import { Routes, Route, Link } from 'react-router-dom'
import { useEffect } from 'react'
import { Container } from '@mui/material'
import { ThemeProvider } from '@mui/material/styles'
import { theme } from './styles/theme'

function App() {
  useEffect(() => {
    document.title = 'PawPaws - 寵物生活網'
  }, [])

  return (
    <>
      {/* React Material UI*/}
      <ThemeProvider theme={theme}>
        <Container
          // padding="0"
          disableGutters={true}
          maxWidth={false}
          sx={{ background: '#fff5ea', margin: '0' }}
        >
          <UIProvider>
            <CartProvider>
              <Promotion sx={{ position: 'fixed' }} />
              <Bar sx={{ position: 'fixed' }} />

              <main style={{ minHeight: 600 }}>
                <Routes>
                  {/* 設定路由 */}
                  {/* http://localhost:3000/home */}
                  <Route path="/" element={<Home />} />
                  <Route path="/home" element={<Home />} />

                  {/* ** Amy ** */}
                  {/* http://localhost:3000/shop */}
                  <Route path="/shop" element={<Shop />} />

                  {/* ** Elena ** */}
                  {/* http://localhost:3000/hotel */}
                  <Route path="/hotel" element={<Hotel />} />
                  <Route path="/hotel/hotellist" element={<HotelList />} />
                  <Route
                    path="/hotel/hoteldetail/:id?"
                    element={<HotelDetail />}
                  />
                  <Route
                    path="/hotel/hotelbooking/"
                    element={<HotelBooking />}
                  />

                  <Route
                    path="/hotel/hotelpayment/"
                    element={<HotelPayment />}
                  />
                  <Route
                    path="/hotel/hotelbookingsuccess/"
                    element={<HotelBookingSuccess />}
                  />

                  {/* ** Natalie ** */}
                  {/* http://localhost:3000/activity */}
                  <Route path="/activity" element={<Activity />} />
                  <Route
                    path="/activity/detail/:activity_id"
                    element={<ActivityDetail />}
                  />
                  <Route
                    path="/activity/signup/:activity_id"
                    element={<ActivitySignUp />}
                  />
                  <Route path="/collection" element={<Collection />} />

                  {/* ** Abby ** */}
                  {/* http://localhost:3000/members */}
                  <Route path="/members" element={<Members />} />
                  <Route path="/Register" element={<Register />} />
                  <Route
                    path="/Memberinfo/:orderTag?"
                    element={<MemberInfo />}
                  />
                  <Route path="/NewPwd" element={<NewPwd />} />
                  <Route path="/ForgetPwd" element={<ForgetPwd />} />

                  {/* http://localhost:3000/shopcart */}
                  {/* <Route path="/shopcart" element={<shopcart />} /> */}
                </Routes>
              </main>
              <Footer />
              <AppDrawer />
              <Cart />
            </CartProvider>
          </UIProvider>
        </Container>
      </ThemeProvider>
    </>
  )
}

export default App
