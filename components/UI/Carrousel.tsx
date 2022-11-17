import React from 'react';
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext, DotGroup, Dot } from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';
import { SkipNextOutlined, SkipPreviousOutlined } from '@mui/icons-material';

import style from '../../styles/carrousel.module.css';
import { Box, useTheme } from '@mui/material';
import { HygraphImg } from './HygraphImg';

interface Props {
  images: { url: string; id: string }[];
  sizes?: string;
}

export const Carrousel = ({ images, sizes }: Props) => {
  const { palette } = useTheme();

  return (
    <Box position="relative">
      <CarouselProvider naturalSlideWidth={16} naturalSlideHeight={9} totalSlides={images.length} infinite>
        <Slider>
          {images.map((image, idx) => (
            <Slide key={image.id} index={idx}>
              <HygraphImg
                src={image.url}
                alt="project"
                aspRatio={16 / 9}
                sizes={sizes || '(max-width: 600px) 100vw, (max-width: 900px) 50vw, 40vw'}
                priority={idx === 0}
              />
            </Slide>
          ))}
        </Slider>

        <ButtonBack
          className={style.button}
          style={{
            color: 'inherit',
            position: 'absolute',
            top: '50%',
            left: '1%',
            backgroundColor: palette.primary.main,
          }}
        >
          <SkipPreviousOutlined />
        </ButtonBack>

        <ButtonNext
          className={style.button}
          style={{
            color: 'inherit',
            position: 'absolute',
            top: '50%',
            right: '1%',
            backgroundColor: palette.primary.main,
          }}
        >
          <SkipNextOutlined />
        </ButtonNext>
        <DotGroup
          renderDots={({ currentSlide, totalSlides }) => (
            <Box
              sx={{
                display: 'flex',
                gap: '0.5rem',
                justifyContent: 'center',
                marginTop: '1rem',
              }}
            >
              {Array.from({ length: totalSlides || 0 }, (_, i) => (
                <Dot
                  key={i}
                  slide={i}
                  className={style.dot}
                  style={{ backgroundColor: currentSlide === i ? palette.primary.main : palette.primary.light }}
                />
              ))}
            </Box>
          )}
        ></DotGroup>
      </CarouselProvider>
    </Box>
  );
};
