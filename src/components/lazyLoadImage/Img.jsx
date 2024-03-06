import { LazyLoadImage } from 'react-lazy-load-image-component'
import 'react-lazy-load-image-component/src/effects/blur.css'

const Img = ({ src, className }) => {
  return (
    <LazyLoadImage
      className={'posterImg' || ''}
      alt='image'
      effect='blur'
      src={src}
    />
  )
}

export default Img
