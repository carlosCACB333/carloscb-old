import React from 'react';
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext, DotGroup } from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';
import { SkipNextOutlined, SkipPreviousOutlined } from '@mui/icons-material';

import style from '../../styles/carrousel.module.css';
import { useTheme } from '@mui/material';
import { HygraphImg } from './HygraphImg';

interface Props {
  images: { url: string; id: string }[];
  sizes?: string;
}

export const Carrousel = ({ images, sizes }: Props) => {
  const { palette } = useTheme();

  return (
    <CarouselProvider naturalSlideWidth={16} naturalSlideHeight={9} totalSlides={images.length} infinite>
      <Slider>
        {images.map((image, idx) => (
          <Slide key={image.id} index={idx}>
            {/* <Image src={image.url} alt="project" layout="fill" /> */}
            <HygraphImg
              src={image.url}
              alt="project"
              ratio="16:9"
              fit="clip"
              sizes={sizes || '(max-width: 600px) 100vw, (max-width: 900px) 50vw, 40vw'}
              priority={idx === 0}
            />
          </Slide>
        ))}
      </Slider>

      <ButtonBack
        className={style.button}
        style={{
          position: 'absolute',
          top: '50%',
          backgroundColor: palette.primary.main,
        }}
      >
        <SkipPreviousOutlined />
      </ButtonBack>

      <ButtonNext
        className={style.button}
        style={{
          position: 'absolute',
          top: '50%',
          right: 0,
          backgroundColor: palette.primary.main,
        }}
      >
        <SkipNextOutlined />
      </ButtonNext>
      <DotGroup
        color="inherit"
        style={{
          textAlign: 'center',
        }}
      />
    </CarouselProvider>
  );
};
