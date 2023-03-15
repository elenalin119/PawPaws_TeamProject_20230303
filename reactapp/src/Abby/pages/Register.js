import { useState } from 'react'
import './members.scss'
import { Link } from 'react-router-dom'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import md5 from 'md5'
import Swal from 'sweetalert2'
import AuthService from '../auth.service'
import Eyes from '../components/Eyes'

function Register() {
  const navigate = useNavigate()

  //密碼顯示的眼睛開關
  const [passwordType, setPasswordType] = useState('password')
  const [passwordIcon, setPasswordIcon] = useState(<VisibilityOffIcon />)

  const [passwordType2, setPasswordType2] = useState('password')
  const [passwordIcon2, setPasswordIcon2] = useState(<VisibilityOffIcon />)


  const [user, setUser] = useState({
    email: '',
    password: '',
    password2: '',
  })

  const handleReset = () => {
    setUser('')
  }

  // 用於記錄錯誤訊息之用
  const [fieldErrors, setFieldErrors] = useState({
    email: '',
    password: '',
    password2: '',
  })

  const handleFieldChange = (e) => {
    //以下依照通用三步驟原則來更新狀態
    setUser({ ...user, [e.target.name]: e.target.value })
  }
  const handleRegister = async (event) => {
    event.preventDefault()

    if (user.password !== user.password2) {
      setFieldErrors({
        ...fieldErrors,
        password: '請輸入相同的密碼',
        password2: '請輸入相同的密碼',
      })
      return
    }

    const { email, password } = user
    const encryption = md5(password)
    if (email === '' || password === '') return
    const response = await AuthService.register({
      email,
      password: encryption,
    })

    if (response.data.state) {
      Swal.fire({
        // position: 'top-end',
        icon: 'success',
        title: response.data.message,
        showConfirmButton: false,
        timer: 1500,
      }).then(() => {
        localStorage.setItem('email', email)
        // localStorage.setItem('user', JSON.stringify(response.data.userInfo))
        navigate('/members')
      })
    } else {
      Swal.fire({
        title: response.data.message,
        icon: 'error',
        showConfirmButton: false,
        timer: 1500,
      })
    }
  }

  const handleInvaild = (e) => {
    e.preventDefault()

    // 記錄錯誤訊息
    setFieldErrors({
      ...fieldErrors,
      [e.target.name]: e.target.validationMessage,
    })
  }

  // 當使用者回頭修正表單中任一欄位時，先清除此欄位的錯誤訊息
  const handleFormChange = (e) => {
    // 記錄錯誤訊息
    setFieldErrors({
      ...fieldErrors,
      [e.target.name]: '',
    })
  }

  return (
    <>
      <div className="container">
        <form
          onSubmit={handleRegister}
          onInvalid={handleInvaild}
          onChange={handleFormChange}
          onReset={handleReset}
        >
          <div className="form-area">
            <div className="form-header">
              <button type="button" className="registerBtn member-button">
                註冊
              </button>
              <Link to="/members">
                <button className="loginBtn member-button">登入</button>
              </Link>
            </div>

            <div className="form-body">
              <div>
                <div className="group-password">
                  <input
                    type="email"
                    name="email"
                    value={user.email}
                    onChange={handleFieldChange}
                    placeholder="請輸入email"
                    required
                  />
                  <span className="error">{fieldErrors.email}</span>
                  {/* <span className="error">{fieldErrors.password}</span> */}
                </div>
                <div className="group-password">
                  <input
                    type={passwordType}
                    name="password"
                    value={user.password}
                    onChange={handleFieldChange}
                    placeholder="請輸入密碼"
                    required
                    // 最少要輸入6個字元，最多10字元
                    minLength={6}
                    maxLength={10}
                  />
                  {/* <span className="show-password-icon" onClick={handleToggle}>
                    {passwordIcon}
                  </span> */}
                  <Eyes
                    passwordType={passwordType}
                    setPasswordType={setPasswordType}
                    passwordIcon={passwordIcon}
                    setPasswordIcon={setPasswordIcon}
                  ></Eyes>
                  <span className="error">{fieldErrors.password}</span>
                </div>
                <div className="group-password">
                  <input
                    type={passwordType2}
                    name="password2"
                    value={user.password2}
                    onChange={handleFieldChange}
                    placeholder="請再次確認密碼"
                    required
                  />
                  {/* <span className="show-password-icon" onClick={handleToggle2}>
                    {passwordIcon2}
                  </span> */}
                  <Eyes
                    passwordType={passwordType2}
                    setPasswordType={setPasswordType2}
                    passwordIcon={passwordIcon2}
                    setPasswordIcon={setPasswordIcon2}
                  ></Eyes>
                  <span className="error">{fieldErrors.password2}</span>
                </div>
              </div>
            </div>
            <div className="form-submit-area">
              <button type="reset" className="rewrite-btn twoBtns">
                重新填寫
              </button>
              <button type="submit" className="join-btn twoBtns">
                加入會員
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  )
}
export default Register
