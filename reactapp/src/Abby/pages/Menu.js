import * as React from 'react'
import Button from '@mui/material/Button'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import { useNavigate } from 'react-router-dom'

export default function BasicMenu({ children }) {
  const navigate = useNavigate()
  const [anchorEl, setAnchorEl] = React.useState(null)
  const open = Boolean(anchorEl)
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        {children}
      </Button>
      {JSON.parse(localStorage.getItem('user')) === null ? (
        ""
      ) : (
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            'aria-labelledby': 'basic-button',
          }}
        >
          <MenuItem onClick={() => navigate('/memberInfo')}>會員中心</MenuItem>
          <MenuItem
            onClick={() => {
              // console.log(JSON.parse(localStorage.getItem('user')) === null)

              JSON.parse(localStorage.getItem('user')) === null
                ? navigate('/members')
                : navigate('/memberInfo/1')
            }}
          >
            訂單查詢
          </MenuItem>
          <MenuItem onClick={() => navigate('/collection')}>收藏清單</MenuItem>
          <MenuItem
            onClick={() => {
              navigate('/')
              localStorage.removeItem('token')
              localStorage.removeItem('user')
              localStorage.removeItem('email')
              localStorage.removeItem('googleAuth')
            }}
          >
            登出
          </MenuItem>
        </Menu>
      )}
    </div>
  )
}
