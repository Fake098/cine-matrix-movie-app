import React, { useRef, useState } from 'react'

import './style.scss'

import ContentWrapper from '../../../components/contentWrapper/ContentWrapper'
import VideoPopup from '../../../components/videoPopup/VideoPopup'
import { PlayIcon } from '../detailsBanner/playIcon'
import {
  BsFillArrowLeftCircleFill,
  BsFillArrowRightCircleFill
} from 'react-icons/bs'
import Img from '../../../components/lazyLoadImage/img'

const VideosSection = ({ data, loading }) => {
  const videosContainer = useRef()
  const [show, setShow] = useState(false)
  const [videoId, setVideoId] = useState(null)

  const navigation = (dir) => {
    const container = videosContainer.current

    const scrollAmount =
      dir === 'left'
        ? container.scrollLeft - (container.offsetWidth + 0)
        : container.scrollLeft + (container.offsetWidth + 0)

    container.scrollTo({
      left: scrollAmount,
      behavior: 'smooth'
    })
  }

  const loadingSkeleton = () => {
    return (
      <div className='skItem'>
        <div className='thumb skeleton'></div>
        <div className='row skeleton'></div>
        <div className='row2 skeleton'></div>
      </div>
    )
  }

  return (
    <>
      {data?.results?.length > 0 && (
        <div className='videosSection'>
          <ContentWrapper>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '10px'
              }}
            >
              <div className='sectionHeading'>Official Videos</div>
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
              <div className='videos' ref={videosContainer}>
                {data?.results?.map((video) => {
                  return (
                    <div
                      key={video.id}
                      className='videoItem'
                      onClick={() => {
                        setVideoId(video.key)
                        setShow(true)
                      }}
                    >
                      <div className='videoThumbnail'>
                        <Img
                          src={`https://img.youtube.com/vi/${video.key}/mqdefault.jpg`}
                        />
                        <PlayIcon />
                      </div>
                      <div className='videoTitle'>{video.name}</div>
                    </div>
                  )
                })}
              </div>
            ) : (
              <div className='videoSkeleton'>
                {loadingSkeleton()}
                {loadingSkeleton()}
                {loadingSkeleton()}
                {loadingSkeleton()}
              </div>
            )}
          </ContentWrapper>
          <VideoPopup
            show={show}
            setShow={setShow}
            videoId={videoId}
            setVideoId={setVideoId}
          />
        </div>
      )}
    </>
  )
}

export default VideosSection
