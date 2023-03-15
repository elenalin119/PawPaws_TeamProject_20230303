import React from 'react'
import VisibilityIcon from '@mui/icons-material/Visibility'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'

function Eyes({
  passwordType,
  setPasswordType,
  passwordIcon,
  setPasswordIcon,
}) {
  const handleToggle = () => {
    if (passwordType === 'password') {
      setPasswordType('text')
      setPasswordIcon(<VisibilityIcon />)
    } else {
      setPasswordType('password')
      setPasswordIcon(<VisibilityOffIcon />)
    }
  }

  return (
    <>
      <span className="show-password-icon" onClick={handleToggle}>
        {passwordIcon}
      </span>
    </>
  )
}

export default Eyes
