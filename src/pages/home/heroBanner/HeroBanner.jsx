import React, { useEffect, useState } from 'react'
import './style.scss'
import { useNavigate } from 'react-router-dom'
import useFetch from '../../../hooks/useFetch'
import { useSelector } from 'react-redux'
import Img from '../../../components/lazyLoadImage/img'
import ContentWrapper from '../../../components/contentWrapper/ContentWrapper'

const HeroBanner = () => {
  const [background, setBackground] = useState('')
  const [query, setQuery] = useState('')
  const navigate = useNavigate()
  const { url } = useSelector((state) => state.home)

  const { data, loading } = useFetch('/movie/popular')
  useEffect(() => {
    const bg =
      url.backdrop +
      data?.results[Math.floor(Math.random() * 20)]?.backdrop_path
    setBackground(bg)
  }, [data])
  const searchQueryhandler = (e) => {
    if (e.key === 'Enter' && query.length > 0) {
      navigate(`/search/${query}`)
    }
  }
  return (
    <div className='heroBanner'>
      {!loading && (
        <div className='backdrop-img'>
          <Img src={background} />
        </div>
      )}
      <div className='opacity-layer'></div>
      <ContentWrapper>
        <div className='wrapper'>
          <div className='heroBannerContent'>
            <span className='title'>Welcome</span>
            <span className='subTitle'>
              Millions of movies, TV shows and people to discover. Explore now.
            </span>
            <div className='searchInput'>
              <input
                type='text'
                onChange={(e) => setQuery(e.target.value)}
                onKeyUp={searchQueryhandler}
                placeholder='Search for a movie or tv show...'
              />
              <button>Search</button>
            </div>
          </div>
        </div>
      </ContentWrapper>
    </div>
  )
}

export default HeroBanner
