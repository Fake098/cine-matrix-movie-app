import { FaFacebookF, FaInstagram, FaTwitter, FaLinkedin } from 'react-icons/fa'

import ContentWrapper from '../contentWrapper/ContentWrapper'

import './style.scss'

const Footer = () => {
  return (
    <footer className='footer'>
      <ContentWrapper>
        <ul className='menuItems'>
          <li className='menuItem'>Terms Of Use</li>
          <li className='menuItem'>Privacy-Policy</li>
          <li className='menuItem'>About</li>
          <li className='menuItem'>Blog</li>
          <li className='menuItem'>FAQ</li>
        </ul>
        <div className='infoText'>
          Discover a world of entertainment at our website, where a vast
          collection of movies and TV series awaits. Explore diverse genres and
          titles, each accompanied by detailed ratings to aid your selection.
          From thrilling blockbusters to captivating series, immerse yourself in
          a rich cinematic landscape tailored to your preferences.
        </div>
        <div className='socialIcons'>
          <span className='icon'>
            <FaFacebookF />
          </span>
          <span className='icon'>
            <FaInstagram />
          </span>
          <span className='icon'>
            <FaTwitter />
          </span>
          <span className='icon'>
            <FaLinkedin />
          </span>
        </div>
      </ContentWrapper>
    </footer>
  )
}

export default Footer
