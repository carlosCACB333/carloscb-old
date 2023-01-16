import { SkipNextOutlined, SkipPreviousOutlined } from '@mui/icons-material';
import { Box, useTheme } from '@mui/material';
import { ButtonBack, ButtonNext, CarouselProvider, DotGroup, Slide, Slider } from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';
import style from '../../styles/carrousel.module.css';
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
                fit="scale"
                alt={`Project image ${idx}`}
                aspRatio={16 / 9}
                priority={idx === 0}
                loading={idx === 0 ? 'eager' : 'lazy'}
                sizes="(max-width: 600px) 80vw, (max-width: 900px) 40vw, 30vw"
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
                marginY: '1rem',
              }}
            >
              {Array.from({ length: totalSlides || 0 }, (_, i) => (
                <div
                  key={i}
                  className={style.dot}
                  style={{ backgroundColor: currentSlide === i ? palette.primary.main : palette.primary.light }}
                  onClick={() => {
                    console.log('click');
                  }}
                ></div>
              ))}
            </Box>
          )}
        ></DotGroup>
      </CarouselProvider>
    </Box>
  );
};
