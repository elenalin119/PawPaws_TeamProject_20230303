import {
  Dialog,
  DialogTitle,
  DialogContent,
  Slide,
  Box,
  IconButton,
  useMediaQuery,
  Typography,
  Button,
} from '@mui/material'
import { shades } from '../../../styles/theme'
import CloseIcon from '@mui/icons-material/Close'
import styled from '@emotion/styled'
import { useTheme } from '@mui/material/styles'
import { Product, ProductImage } from '../../../styles/Product/index'
import Count from '../Count/index'
import FacebookIcon from '@mui/icons-material/Facebook'
import TwitterIcon from '@mui/icons-material/Twitter'
import InstagramIcon from '@mui/icons-material/Instagram'
import FavoriteIcon from '@mui/icons-material/Favorite'

function SlideTransition(props) {
  return <Slide direction="down" {...props} />
}

const ProductDetailWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  padding: theme.spacing(4),
}))

const ProductDetailInfoWrapper = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  maxWidth: 500,
  lineHeight: 1.5,
}))

export default function ProductDetail({ open, onClose, product }) {
  const theme = useTheme()
  const matches = useMediaQuery(theme.breakpoints.down('md'))

  return (
    <Dialog
      TransitionComponent={SlideTransition}
      variant="permanent"
      open={open}
      fullScreen
    >
      <DialogTitle sx={{ background: shades.secondary[500] }}>
        <Box
          display="flex"
          alignItems="center"
          justifyContent={'space-between'}
        >
          {/* 商品標題 */}　{product.name}
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>
      <DialogContent sx={{ background: '#fff5ea' }}>
        <ProductDetailWrapper
          display={'flex'}
          flexDirection={matches ? 'column' : 'row'}
        >
          <Product sx={{ mr: 4 }}>
            <ProductImage src={product.image2} />
          </Product>
        </ProductDetailWrapper>
        <ProductDetailInfoWrapper>
          {/* <Typography variant="subtitle">編號: 123</Typography> */}
          {/* <Typography variant="subtitle">庫存量: 5 在庫</Typography> */}
          <Typography sx={{ lineHeight: 2 }} variant="h6">
            {product.name2}
          </Typography>
          <Typography variant="body">
            {product.description}
            <br></br>
            {product.description2}
            <br></br>
          </Typography>
          <Typography variant="body">{product.description3}</Typography>
          <Box
            sx={{ mt: 4 }}
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <Typography
              sx={{ lineHeight: 2, color: shades.blue[500] }}
              variant="h6"
            >
              ${product.price}
            </Typography>
            <Count />
            <Button variant="contained">加購物車</Button>
          </Box>
          <Box
            display="flex"
            alignItems="center"
            sx={{ mt: 4, color: shades.beige_dark[800] }}
          >
            <FavoriteIcon sx={{ mr: 2 }} />
            加入願望清單
          </Box>
          <Box
            sx={{
              mt: 4,
              color: shades.beige_dark[800],
            }}
          >
            <FacebookIcon />
            <TwitterIcon sx={{ pl: 2 }} />
            <InstagramIcon sx={{ pl: 2 }} />
          </Box>
        </ProductDetailInfoWrapper>
      </DialogContent>
    </Dialog>
  )
}
