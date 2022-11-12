import { Avatar, Box, Button, Typography, useMediaQuery } from '@mui/material';
import Image from 'next/image';
import React, { useContext } from 'react';
import { SectionLayout } from '../Layout/';
import circle from '../../assets/circle.png';
import { AuthorContext, ThemeContext } from '../../context';
import { Icon } from '../icons';
import { getTheme } from '../../theme';
import { useTranslation } from 'react-i18next';

const iconSize = ['5rem', '6em', '7rem', '8rem'];
const px = ['2.5rem', '3em', '3.5rem', '4rem'];

export const HomeSection = () => {
  const { t } = useTranslation('home');
  const { mode } = useContext(ThemeContext);
  const { author } = useContext(AuthorContext);
  const isNotMd = useMediaQuery(getTheme('dark').breakpoints.up('md'));
  return (
    <SectionLayout sx={{ position: 'relative', overflow: 'hidden', paddingTop: 0 }} component="section" id="">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          position: isNotMd ? 'absolute' : 'initial',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          justifyContent: 'center',
          marginTop: isNotMd ? 0 : '4rem',
        }}
      >
        <Avatar
          src={author.photos[0].url}
          variant="rounded"
          alt="Carlos Castillo Blas"
          sx={{ width: '10rem', height: '10rem' }}
          className="gradient"
          data-aos="zoom-in"
        />
        <Box paddingY={4}>
          <Typography variant="h1" fontSize="3.5rem" data-aos="zoom-in">
            {author.firstName + ' ' + author.lastName}
          </Typography>
          <Typography variant="h4" fontWeight="normal" textAlign="center" data-aos="zoom-in">
            {author.detail}
          </Typography>
        </Box>
        <Box display="flex" gap={2}>
          <Button size="large" variant="outlined" href={author.cv?.url || '/'} target="_blank" data-aos="zoom-in">
            {t('home.btn-cv')}
          </Button>
          <Button size="large" href="#about-section" data-aos="zoom-in">
            {t('home.btn-about')}
          </Button>
        </Box>
      </Box>

      <Box paddingX={px}>
        <Box
          className="rotate-container"
          sx={{
            position: 'relative',
            maxWidth: 700,
            margin: '4rem auto',
            marginTop: isNotMd ? '4rem' : '8rem',
          }}
        >
          <Image
            priority
            src={circle}
            alt="circle"
            style={{
              width: '100%',
              height: '100%',
            }}
          />

          <Box
            sx={{
              position: 'absolute',
              left: '50%',
              top: 0,
              transform: 'translate(-50%, -50%)',
            }}
          >
            <Box className="rotate-item">
              <FrontItem isDark={mode === 'dark'} />
            </Box>
          </Box>

          <Box
            sx={{
              position: 'absolute',
              left: '100%',
              top: '50%',
              transform: 'translate(-50%, -50%)',
            }}
          >
            <Box className="rotate-item">
              <BacktItem isDark={mode === 'dark'} />
            </Box>
          </Box>

          <Box
            sx={{
              position: 'absolute',
              left: 0,
              top: '50%',
              transform: 'translate(-50%, -50%)',
            }}
          >
            <Box className="rotate-item">
              <IaItem isDark={mode === 'dark'} />
            </Box>
          </Box>

          <Box
            sx={{
              position: 'absolute',
              left: '50%',
              top: '100%',
              transform: 'translate(-50%, -50%)',
            }}
          >
            <Box className="rotate-item">
              <DbItem isDark={mode === 'dark'} />
            </Box>
          </Box>
        </Box>
      </Box>
    </SectionLayout>
  );
};
const IaItem = ({ isDark }: { isDark: boolean }) => {
  return (
    <Box position="relative">
      <Avatar
        className={isDark ? 'gradient' : 'gradient-light'}
        sx={{
          width: iconSize,
          height: iconSize,
        }}
      >
        <Icon
          name="ia"
          sx={{
            fontSize: '4rem',
            color: 'text.primary',
          }}
        />
      </Avatar>
      <Avatar
        className={isDark ? 'gradient' : 'gradient-light'}
        sx={{
          position: 'absolute',
          bottom: 0,
          right: 0,
        }}
      >
        <Icon
          name="python"
          sx={{
            color: 'text.primary',
          }}
        />
      </Avatar>

      <Avatar
        className={isDark ? 'gradient' : 'gradient-light'}
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
        }}
      >
        <Icon
          name="tensorflow"
          sx={{
            color: 'text.primary',
          }}
        />
      </Avatar>
    </Box>
  );
};
const DbItem = ({ isDark }: { isDark: boolean }) => {
  return (
    <Box position="relative">
      <Avatar
        className={isDark ? 'gradient' : 'gradient-light'}
        sx={{
          width: iconSize,
          height: iconSize,
        }}
      >
        <Icon
          name="sql"
          sx={{
            fontSize: '3rem',
            color: 'text.primary',
          }}
        />
      </Avatar>
      <Avatar
        className={isDark ? 'gradient' : 'gradient-light'}
        sx={{
          position: 'absolute',
          bottom: 0,
          right: 0,
        }}
      >
        <Icon
          name="mongodb"
          sx={{
            color: 'text.primary',
          }}
        />
      </Avatar>

      <Avatar
        className={isDark ? 'gradient' : 'gradient-light'}
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          color: 'text.primary',
          fontSize: '1rem',
        }}
      >
        SQL
      </Avatar>
    </Box>
  );
};
const BacktItem = ({ isDark }: { isDark: boolean }) => {
  return (
    <Box position="relative">
      <Avatar
        className={isDark ? 'gradient' : 'gradient-light'}
        sx={{
          width: iconSize,
          height: iconSize,
        }}
      >
        <Icon
          name="backend"
          sx={{
            fontSize: '4rem',
            color: 'text.primary',
          }}
        />
      </Avatar>
      <Avatar
        className={isDark ? 'gradient' : 'gradient-light'}
        sx={{
          position: 'absolute',
          bottom: 0,
          right: 0,
          color: 'text.primary',
        }}
      >
        dj
      </Avatar>

      <Avatar
        className={isDark ? 'gradient' : 'gradient-light'}
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
        }}
      >
        <Icon
          name="node"
          sx={{
            color: 'text.primary',
          }}
        />
      </Avatar>
    </Box>
  );
};
const FrontItem = ({ isDark }: { isDark: boolean }) => {
  return (
    <Box position="relative">
      <Avatar
        className={isDark ? 'gradient' : 'gradient-light'}
        sx={{
          width: iconSize,
          height: iconSize,
        }}
      >
        <Icon
          name="frontend"
          sx={{
            fontSize: '4rem',
            color: 'text.primary',
          }}
        />
      </Avatar>
      <Avatar
        className={isDark ? 'gradient' : 'gradient-light'}
        sx={{
          position: 'absolute',
          bottom: 0,
          right: 0,
        }}
      >
        <Icon
          name="typescript"
          sx={{
            color: 'text.primary',
          }}
        />
      </Avatar>

      <Avatar
        className={isDark ? 'gradient' : 'gradient-light'}
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
        }}
      >
        <Icon
          name="react"
          sx={{
            color: 'text.primary',
          }}
        />
      </Avatar>
    </Box>
  );
};
