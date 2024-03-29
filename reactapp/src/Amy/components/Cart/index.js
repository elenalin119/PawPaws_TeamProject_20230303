import {
  Drawer,
  useMediaQuery,
  Box,
  Avatar,
  Typography,
  Divider,
  Paper,
  Button,
} from '@mui/material'
import { shades } from '../../../styles/theme'
import { useUIContext } from '../../context/UI'
import { useTheme } from '@mui/material/styles'
import Count from '../Count/index'
import { useCart } from '../../hooks/useCart'
import PetsIcon from '@mui/icons-material/Pets'
import axios from 'axios'


export default function Cart() {
  const {
    // cart,
    setShowCart,
    showCart,
  } = useUIContext()

  const cart = useCart().items
  const cartTotal = useCart().cart.cartTotal

  const theme = useTheme()
  const matches = useMediaQuery(theme.breakpoints.down('md'))

  //移除商品
  const { removeItem, clearCart } = useCart()
  const removeItemWithConfirmation = (itemId) => {
    const confirmed = window.confirm('確定移除此項商品？')
    if (confirmed) {
      removeItem(itemId)
    }
  }

  // console.log(cart)

  async function handleCheckout() {
    const obj = {
      cart: JSON.parse(localStorage.getItem('cart')),
      user: JSON.parse(localStorage.getItem('user')),
    }

    const result = await axios.post(
      `${process.env.REACT_APP_API_URL}/shop/checkout`,
      obj
    )

    if (result.data) {
      clearCart()
      alert(`訂購成功！可至會員中心查看訂單：）`)
      setShowCart(false)
    } else {
      alert('訂購失敗！請先登入')
    }
  }

  const cartContent = cart.map((item) => (
    <Box key={item.id}>
      <Box
        display="flex"
        sx={{ pt: 2, pb: 2 }}
        alignItems="start"
        justifyContent="space-between"
      >
        <Avatar src={item.image} sx={{ width: 96, height: 96, mr: 2 }} />
        <Box display="flex" flexDirection="column">
          <Typography variant="body1">{item.name}</Typography>
          {!matches && (
            <Typography variant="subtitle2">{item.description}</Typography>
          )}
        </Box>
        <Typography
          variant="body1"
          justifyContent="end"
          sx={{ color: shades.blue[500] }}
        >
          ${item.price}
        </Typography>
      </Box>
      {matches && (
        <Typography variant="subtitle2">{item.description}</Typography>
      )}
      <Box
        display="flex"
        sx={{ pt: 2 }}
        alignItems="start"
        justifyContent="space-between"
      >
        <Button
          variant="outlined"
          sx={{ color: shades.primary[500] }}
          startIcon={<PetsIcon sx={{ color: shades.primary[500] }} />}
          onClick={() => removeItemWithConfirmation(item.id)}
        >
          移除
        </Button>
        <Count id={item.id} quantity={item.quantity} />
        <Typography key={item.id}>
          小計: ${item.quantity * item.price}
        </Typography>
      </Box>
      <Divider variant="inset" />
    </Box>
  ))

  return (
    <Drawer
      open={showCart}
      onClose={() => setShowCart(false)}
      anchor="right"
      PaperProps={{
        sx: {
          width: matches ? '100%' : 550,
          background: shades.beige_dark[500],
        },
      }}
    >
      {/* 手機版調整 三元運算 */}
      {cart.length > 0 ? (
        <Box
          sx={{ p: 4 }}
          display="flex"
          justifyContent="center"
          flexDirection="column"
          alignItems="center"
        >
          <Typography variant="h5" color={shades.beige_dark[900]}>
            購物車
          </Typography>
          <Typography variant="body1" color={shades.beige_dark[700]}>
            {''} 全館免運～優惠期間至2023/12/31
          </Typography>
          <Paper
            elevation={0}
            sx={{
              mt: 2,
              width: '90%',
              padding: 4,
            }}
          >
            {cartContent}
            <Paper
              elevation={0}
              sx={{
                mt: 2,
                width: '90%',
                padding: 4,
              }}
            >
              <Typography
                sx={{ color: shades.blue[500] }}
                variant="body1"
                align="right"
              >
                商品合計: ${cartTotal}
              </Typography>
              <Typography
                sx={{ color: shades.orange_red[400] }}
                variant="body1"
                align="right"
              >
                運費: $0
              </Typography>
            </Paper>
          </Paper>
          <Button sx={{ mt: 4 }} variant="contained" onClick={handleCheckout}>
            前往結帳
          </Button>
        </Box>
      ) : (
        <Box
          sx={{ p: 4 }}
          display="flex"
          justifyContent="center"
          flexDirection="column"
          alignItems="center"
        >
          <Typography
            variant={matches ? 'h6' : 'h5'}
            color={shades.beige_dark[700]}
          >
            購物車是空的
          </Typography>
        </Box>
      )}
      <Button onClick={() => setShowCart(false)}>【繼續購物】</Button>
    </Drawer>
  )
}

//TODO

// 訂單編號-訂單狀態-訂購日期-訂單金額-付款方式-出貨狀態-會員ID >>>訂單查詢（指定會員id）
// SELECT * FROM `s_order` WHERE `s_order_user_id` = 1076;

// 商品流水號-訂單編號-商品名-商品圖片-商品數量-商品合計 >>>訂單明細（指定訂單編號id）
// SELECT * FROM `s_order_detail` WHERE `s_order_id`='167872153862858';

// 訂單編號-會員名稱-信箱-手機-地址-訂單金額 >>>訂購人資料(全部訂單)
// SELECT o.s_order_id,m.name,m.email,m.mobile,m.address,o.s_order_total FROM `s_order` AS o JOIN `members` AS m ON o.`s_order_user_id` = m.`sid` WHERE o.`s_order_user_id`;  
