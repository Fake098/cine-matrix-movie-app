import React, { useState, useEffect } from 'react'
import { HiOutlineSearch } from 'react-icons/hi'
import { SlMenu } from 'react-icons/sl'
import { VscChromeClose } from 'react-icons/vsc'
import { useNavigate, useLocation } from 'react-router-dom'

import './style.scss'

import ContentWrapper from '../contentWrapper/ContentWrapper'
import logo from '../../assets/cinematrix.png'

const Header = () => {
  const [show, setShow] = useState('top')
  const [lastScrollY, setLastScrollY] = useState(0)
  const [mobileMenu, setMobileMenu] = useState(false)
  const [query, setQuery] = useState('')
  const [showSearch, setShowSearch] = useState('')
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location])

  const controlNavBar = () => {
    if (window.scrollY > 200) {
      if (window.scrollY > lastScrollY && !mobileMenu) {
        setShow('hide')
      } else {
        setShow('show')
      }
    } else setShow('top')
    setLastScrollY(window.scrollY)
  }

  useEffect(() => {
    window.addEventListener('scroll', controlNavBar)
    return () => {
      window.removeEventListener('scroll', controlNavBar)
    }
  }, [lastScrollY])

  const openSearch = () => {
    setMobileMenu(false)
    setShowSearch(true)
  }
  const openMobileMenu = () => {
    setMobileMenu(true)
    setShowSearch(false)
  }

  const searchQueryhandler = (e) => {
    if (e.key === 'Enter' && query.length > 0) {
      navigate(`/search/${query}`)
      setTimeout(() => {
        setShowSearch(false)
        setQuery('')
      }, 1000)
    }
  }

  const navigationHandler = (type) => {
    type === 'movie' ? navigate('/explore/movie') : navigate('/explore/tv')
    setMobileMenu(false)
  }

  return (
    <header className={`header ${mobileMenu ? 'mobileView' : ''} ${show}`}>
      <ContentWrapper>
        <div className='logo' onClick={() => navigate('/')}>
          <img src={logo} width={200} alt='logo' />
        </div>
        <ul className='menuItems'>
          <li
            className='menuItem hover-underline-animation'
            onClick={() => navigationHandler('movie')}
          >
            Movies
          </li>
          <li
            className='menuItem hover-underline-animation'
            onClick={() => navigationHandler('tv')}
          >
            TV Shows
          </li>
          <li className='menuItem'>
            <HiOutlineSearch onClick={openSearch} />
          </li>
        </ul>
        <div className='mobileMenuItems'>
          <HiOutlineSearch onClick={openSearch} />
          {mobileMenu ? (
            <VscChromeClose onClick={() => setMobileMenu(false)} />
          ) : (
            <SlMenu onClick={openMobileMenu} />
          )}
        </div>
        {showSearch && (
          <div className='searchBar'>
            <ContentWrapper>
              <div className='searchInput'>
                <input
                  type='text'
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyUp={searchQueryhandler}
                  placeholder='Search for a movie or tv show...'
                />
                <VscChromeClose onClick={() => setShowSearch(false)} />
              </div>
            </ContentWrapper>
          </div>
        )}
      </ContentWrapper>
    </header>
  )
}

export default Header
