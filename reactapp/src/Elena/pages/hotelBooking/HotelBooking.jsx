import React from 'react'
import './hotelBooking.css'
import StateBar from '../../../Elena/components/stateBar/StateBar'
import HotelBookingInfo from '../../components/hotelBookingInfo/HotelBookingInfo'
// import HotelConfirm from '../../components/hotelConfirm/HotelConfirm'

function HotelBooking() {
  return (
    <>
      <StateBar />
      <div className="hotelBookingContainer">
        <HotelBookingInfo />
        {/* <HotelConfirm /> */}
      </div>
    </>
  )
}

export default HotelBooking
