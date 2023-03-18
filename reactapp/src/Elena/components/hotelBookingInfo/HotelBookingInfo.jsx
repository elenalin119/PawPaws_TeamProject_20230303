import { React, useEffect, useState } from 'react'
import './hotelBookingInfo.css'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import { Link } from 'react-router-dom'
import cities from '../../../Abby/pages/cityData/cities'
import districts from '../../../Abby/pages/cityData/districts'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import Swal from 'sweetalert2'
import { auth, provide } from '../../../pages/config/firebase'
import { signOut, GoogleAuthProvider } from 'firebase/auth'

export default function HotelBookingInfo() {
  const navigate = useNavigate()

  //設定城市.區域地址
  const [city, setCity] = useState(cities[0])
  const [district, setDistrict] = useState(districts['城市'][0])

  const handleCityChange = async (value) => {
    await setCity(value)
    await setDistrict(districts[value][0])
  }

  const handleDistrictChange = async (value) => {
    await setDistrict(value)
  }

  //儲存編輯頁面的 input value
  const [email, setEmail] = useState('')
  const [year, setYear] = useState('')
  const [month, setMonth] = useState('')
  const [day, setDay] = useState('')
  const [userName, setUserName] = useState('')
  const [mobile, setMobile] = useState('')
  const [address3, setAddress3] = useState('')

  //月份選單
  const makeOptions = (min, max) => {
    const options = []

    for (let i = min; i < max + 1; i++) {
      options.push(i)
    }
    return options
  }

  async function handleSubmit(e) {
    e.preventDefault()

    let user = {}
    const local = localStorage.getItem('user')

    try {
      if (local) {
        user = JSON.parse(local)
      }
    } catch (ex) {}

    const birthday = new Date(user.birthday)
    //城市與區域地址之間+逗號
    let addressAll = []
    if (user.address) {
      addressAll = user.address.split(',')
    }

    const fullAddress = `${city === '城市' ? '' : city},${
      district === '區域' ? '' : district
    },${address3}`

    let isSameData =
      user.name === userName &&
      user.mobile === mobile &&
      user.birthday === `${year}-${month}-${day}` &&
      user.address === fullAddress

    const data = {
      name: userName,
      email,
      birthday: `${year}-${month}-${day}`,
      mobile: mobile,
      address: fullAddress,
    }

    if (!isSameData) {
      const response = await axios.put(
        `${process.env.REACT_APP_API_URL}/members/update`,
        data
      )

      localStorage.setItem('user', JSON.stringify(data))

      //編輯成功
      if (response.data.state) {
        Swal.fire({
          // position: 'top-end',
          icon: 'success',
          title: response.data.message,
          showConfirmButton: false,
          timer: 1500,
        }).then(() => {
          // localStorage.setItem('email', response.data.userInfo.email)
          localStorage.setItem('user', JSON.stringify(response.data.userInfo))
        })
        //
      } else {
        Swal.fire({
          title: response.data.message,
          showConfirmButton: false,
          timer: 1500,
        })
        // setAlert({ state: true, message: response.data.message })
      }
    } else {
      Swal.fire('您沒有修改資料')
    }
  }

  //編輯會員頁面-資料自動代入欄位
  useEffect(() => {
    showUserOriginalInfo(false)
  }, [])

  function showUserOriginalInfo(isCancel) {
    let user = {}
    const local = localStorage.getItem('user')

    try {
      if (local) {
        user = JSON.parse(local)
      }
    } catch (ex) {}

    const birthday = new Date(user.birthday)

    let addressAll = []
    if (user.address) {
      addressAll = user.address.split(',')
      handleCityChange(addressAll[0])
      handleDistrictChange(addressAll[1])
    } else {
      handleCityChange('城市')
    }

    setEmail(user.email || '')
    setUserName(user.name || '')
    setMobile(user.mobile || '')
    if (user.birthday !== '1899-11-29T16:00:00.000Z') {
      setYear(birthday.getFullYear() || '')
      setMonth(birthday.getMonth() + 1 || '')
      setDay(birthday.getDate() || '')
    }

    if (addressAll[0]) {
      handleCityChange(addressAll[0])
    }
    if (addressAll[1]) {
      console.log('addressAll[1]', addressAll[1])
      setTimeout(() => {
        handleDistrictChange(addressAll[1])
      }, 100)
    }
    setAddress3(addressAll[2] || '')

    if (isCancel) {
      Swal.fire('已回復原始資料')
    }
  }

  return (
    <>
      <div className="hotelBookingInfoContainer">
        <div className="hotelBookingMember">
          <form onSubmit={(e) => handleSubmit(e)}>
            <div className="form-area-edit">
              <div className="form-body">
                <div className="profileArea">
                  <div className="profileName">
                    <AccountCircleIcon />
                    {email}
                  </div>
                </div>

                <div className="group">
                  <input
                    type="text"
                    name="UserName"
                    id="UserName"
                    value={userName}
                    placeholder="請輸入姓名"
                    onChange={(e) => setUserName(e.target.value)}
                  />
                  {/** 
              <div className="group">
                <input type="text" name="email" id="email" placeholder="請輸入email" required />
              </div>
              */}
                  <div className="group">
                    <select
                      value={year}
                      onChange={(e) => {
                        setYear(e.target.value)
                        // 為了避免再次選年or月，要先清空日的選擇state
                        // setDay('')
                      }}
                    >
                      <option>我的出生年</option>
                      {makeOptions(1940, 2015).map((v, i) => {
                        return (
                          <option key={v} value={v}>
                            {v}
                          </option>
                        )
                      })}
                    </select>
                    <select
                      value={month}
                      onChange={(e) => {
                        setMonth(e.target.value)
                      }}
                    >
                      <option>月份</option>
                      {makeOptions(1, 12).map((v, i) => {
                        return (
                          <option key={v} value={v}>
                            {v}
                          </option>
                        )
                      })}
                    </select>
                    <select
                      value={day}
                      onChange={(e) => setDay(e.target.value)}
                    >
                      <option>日期</option>
                      {year !== '' &&
                        month !== '' &&
                        makeOptions(1, new Date(year, month, 0).getDate()).map(
                          (v, i) => {
                            return (
                              <option key={v} value={v}>
                                {v}
                              </option>
                            )
                          }
                        )}
                    </select>
                  </div>
                  <div className="group">
                    <input
                      value={mobile}
                      type="text"
                      name="mobile"
                      id="mobile"
                      placeholder="請輸入手機號碼"
                      onChange={(e) => setMobile(e.target.value)}
                    />
                  </div>
                  <div className="group">
                    <select
                      onChange={(e) => handleCityChange(e.target.value)}
                      value={city}
                    >
                      {cities.length > 0 &&
                        cities.map((c, i) => {
                          const jsx = (
                            <option key={i} value={c} disabled hidden>
                              {c}
                            </option>
                          )

                          const jsx2 = (
                            <option key={i} value={c}>
                              {c}
                            </option>
                          )
                          return i === 0 ? jsx : jsx2
                        })}
                    </select>
                    <select
                      onChange={(e) => handleDistrictChange(e.target.value)}
                      value={district}
                    >
                      {districts &&
                        districts[city].length > 0 &&
                        districts[city].map((d, i) => {
                          return (
                            <option key={i} value={d}>
                              {d}
                            </option>
                          )
                        })}
                    </select>
                    <div className="group">
                      <input
                        value={address3}
                        type="text"
                        placeholder="請輸入詳細地址"
                        onChange={(e) => setAddress3(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
        <div className="hotelBookingHotel">
          <hotelForm>
            <div className="hotelFormContainer">
              <div className="hotelFormImg">
                <img
                  src="http://localhost:3000/images/Elena_img/hotel1.jpg"
                  alt=""
                  className="hbiImg"
                />
              </div>
              <div className="hotelFormDetail">
                <h4>您的入住資訊</h4>
                <div>入住時間: 2023年3月22日(三)</div>
                <div>退房時間: 2023年3月23日(四)</div>
                <div>飯店名稱: 台北君悅酒店</div>
                <div>飯店地址: 110台北市信義區松壽路2號</div>
                <div>房型: 雙人房（一大床）一間</div>
                <p></p>
                <div>
                  入住人數:
                  <div>成人: 2 人</div>
                  <div>兒童: 2 人</div>
                  <div>寵物: 1 位</div>
                </div>
                <div>價格: NT$ 9,800元 (含稅價)</div>
              </div>
            </div>
          </hotelForm>
          <button
            className="hotelBookingInfoBtn"
            onClick={() => {
              navigate(`/hotel/hotelpayment`)
            }}
          >
            確認預訂
          </button>
        </div>
      </div>
    </>
  )
}
