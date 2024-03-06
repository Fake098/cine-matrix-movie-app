import React, { useRef } from 'react'
import { useSelector } from 'react-redux'

import './style.scss'

import ContentWrapper from '../../../components/contentWrapper/ContentWrapper'
import Img from '../../../components/lazyLoadImage/Img'
import avatar from '../../../assets/avatar.png'
import {
  BsFillArrowLeftCircleFill,
  BsFillArrowRightCircleFill
} from 'react-icons/bs'

const Cast = ({ data, loading }) => {
  const { url } = useSelector((state) => state.home)
  const castContainer = useRef()
  const navigation = (dir) => {
    const container = castContainer.current

    const scrollAmount =
      dir === 'left'
        ? container.scrollLeft - (container.offsetWidth + 10)
        : container.scrollLeft + (container.offsetWidth + 10)

    container.scrollTo({
      left: scrollAmount,
      behavior: 'smooth'
    })
  }

  const skeleton = () => {
    return (
      <div className='skItem'>
        <div className='circle skeleton'></div>
        <div className='row skeleton'></div>
        <div className='row2 skeleton'></div>
      </div>
    )
  }
  return (
    <div className='castSection'>
      <ContentWrapper>
        <div
          style={{
            marginTop: '10px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '10px'
          }}
        >
          <div className='sectionHeading'>Top Cast</div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}
          >
            <BsFillArrowLeftCircleFill
              className='carouselLeftNav arrow'
              onClick={() => navigation('left')}
            />
            <BsFillArrowRightCircleFill
              className='carouselRightNav arrow'
              onClick={() => navigation('right')}
            />
          </div>
        </div>
        {!loading ? (
          <div className='listItems' ref={castContainer}>
            {data?.map((item) => {
              let imgUrl = item.profile_path
                ? url.profile + item.profile_path
                : avatar
              return (
                <div key={item.id} className='listItem'>
                  <div className='profileImg'>
                    <Img src={imgUrl} />
                  </div>
                  <div className='name'>{item.name}</div>
                  <div className='character'>{item.character}</div>
                </div>
              )
            })}
          </div>
        ) : (
          <div className='castSkeleton'>
            {skeleton()}
            {skeleton()}
            {skeleton()}
            {skeleton()}
            {skeleton()}
            {skeleton()}
          </div>
        )}
      </ContentWrapper>
    </div>
  )
}

export default Cast
