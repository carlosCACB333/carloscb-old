import { Avatar, Box, Button, Link, Typography, useMediaQuery } from '@mui/material';
import Image from 'next/legacy/image';
import React, { useContext } from 'react';
import { SectionLayout } from '../Layout/';
import circle from '../../assets/circle.png';
import styles from '../../styles/home.module.css';
import { AuthorContext, ThemeContext } from '../../context';
import { Icon } from '../icons';
import { getTheme } from '../../theme';
import { useTranslation } from 'react-i18next';
import { HygraphImg } from '../UI';

export const HomeSection = () => {
  const { mode } = useContext(ThemeContext);
  const { author } = useContext(AuthorContext);
  const isMd = useMediaQuery(getTheme('dark').breakpoints.up('md'));
  const { t } = useTranslation('home');
  return (
    <SectionLayout sx={{ position: 'relative', overflow: 'hidden' }} id="home-section">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          position: isMd ? 'absolute' : 'initial',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          justifyContent: 'center',
          marginY: '6rem',
        }}
      >
        <Avatar
          src={author.photos[0].url}
          variant="rounded"
          alt="Carlos Castillo Blas"
          sx={{ width: '10rem', height: '10rem' }}
          className="gradient"
        />
        <Box paddingY={4}>
          <Typography variant="h1" fontSize="3.5rem">
            {author.firstName + ' ' + author.lastName}
          </Typography>
          <Typography variant="h4" fontWeight="normal" textAlign="center">
            {author.detail}
          </Typography>
        </Box>
        <Box display="flex" gap={2}>
          <Button size="large" variant="outlined" href={author.cv?.url || '/'} target="_blank">
            {t('home.btn-cv')}
          </Button>
          <Button size="large" href="#about-section">
            {t('home.btn-about')}
          </Button>
        </Box>
      </Box>

      <Box>
        <Box
          className={styles.container}
          sx={{
            position: 'relative',
            maxWidth: 700,
            width: 'calc(100% - 8rem)',
            margin: '4rem auto',
          }}
        >
          <Image
            priority
            src={circle}
            alt="circle"
            layout="responsive"
            style={
              {
                // opacity: 0.8,
              }
            }
          />

          <Box
            sx={{
              position: 'absolute',
              left: '50%',
              top: 0,
              transform: 'translate(-50%, -50%)',
            }}
          >
            <Box className={styles.item}>
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
            <Box className={styles.item}>
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
            <Box className={styles.item}>
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
            <Box className={styles.item}>
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
          width: '8rem',
          height: '8rem',
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
          width: '8rem',
          height: '8rem',
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
          width: '8rem',
          height: '8rem',
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
          width: '8rem',
          height: '8rem',
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
