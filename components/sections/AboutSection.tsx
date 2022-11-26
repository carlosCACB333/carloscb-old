import { Typography, useMediaQuery } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Author } from '../../graphql/generated/graphql';
import { getTheme } from '../../theme';
import { Md } from '../common';
import { SectionLayout } from '../Layout';
import { HygraphImg } from '../UI/HygraphImg';
interface Props {
  author: Author;
}
export const AboutSection: FC<Props> = ({ author }) => {
  const isMd = useMediaQuery(getTheme('dark').breakpoints.up('md'));
  const { t } = useTranslation('home');

  return (
    <SectionLayout id="about-section" component="section">
      <Grid container spacing={2}>
        {isMd && (
          <Grid
            xs={12}
            md={6}
            sx={{
              aspectRatio: '1/1',
            }}
            data-aos="fade-right"
          >
            <HygraphImg
              className="gradient"
              src={author.photos.at(-1)?.url || ''}
              alt={author.firstName + ' ' + author.lastName}
              aspRatio={1}
              style={{
                borderRadius: 15,
                objectFit: 'cover',
                objectPosition: 'top',
              }}
              sizes="(max-width: 900px) 20vw, 40vw"
            />
          </Grid>
        )}

        <Grid xs={12} md={6}>
          <Typography variant="h1" marginY={2} data-aos="fade-up">
            {t('about.title')}
          </Typography>
          <div data-aos="fade-up">
            <Md>{author.bio || ''}</Md>
          </div>
          <br />
          <Grid container spacing={1} className="scroll">
            <Grid xs={4}>
              <Typography sx={{ margin: 0 }} variant="subtitle1" marginY={2} data-aos="fade-up">
                {t('about.user.name')}
              </Typography>
            </Grid>
            <Grid xs={8}>
              <Typography sx={{ margin: 0 }} variant="body1" marginY={2} data-aos="fade-up">
                {author.firstName + ' ' + author.lastName}
              </Typography>
            </Grid>

            <Grid xs={4}>
              <Typography sx={{ margin: 0 }} variant="subtitle1" marginY={2} data-aos="fade-up">
                {t('about.user.email')}
              </Typography>
            </Grid>
            <Grid xs={8}>
              <Typography sx={{ margin: 0 }} variant="body1" marginY={2} data-aos="fade-up">
                {author.email}
              </Typography>
            </Grid>

            <Grid xs={4}>
              <Typography sx={{ margin: 0 }} variant="subtitle1" marginY={2} data-aos="fade-up">
                {t('about.user.age')}
              </Typography>
            </Grid>
            <Grid xs={8}>
              <Typography sx={{ margin: 0 }} variant="body1" marginY={2} data-aos="fade-up">
                {new Date().getFullYear() - new Date(author.birth).getFullYear()}
              </Typography>
            </Grid>

            <Grid xs={4}>
              <Typography sx={{ margin: 0 }} variant="subtitle1" marginY={2} data-aos="fade-up">
                {t('about.user.phone')}
              </Typography>
            </Grid>
            <Grid xs={8}>
              <Typography sx={{ margin: 0 }} variant="body1" marginY={2} data-aos="fade-up">
                {author.phone}
              </Typography>
            </Grid>
            <Grid xs={4}>
              <Typography sx={{ margin: 0 }} variant="subtitle1" marginY={2} data-aos="fade-up">
                {t('about.user.profession')}
              </Typography>
            </Grid>
            <Grid xs={8}>
              <Typography sx={{ margin: 0 }} variant="body1" marginY={2} data-aos="fade-up">
                {author.profession}
              </Typography>
            </Grid>

            <Grid xs={4}>
              <Typography sx={{ margin: 0 }} variant="subtitle1" marginY={2} data-aos="fade-up">
                {t('about.user.university')}
              </Typography>
            </Grid>

            <Grid xs={8}>
              <Typography sx={{ margin: 0 }} variant="body1" marginY={2} data-aos="fade-up">
                {author.university}
              </Typography>
            </Grid>
            <Grid xs={4}>
              <Typography sx={{ margin: 0 }} variant="subtitle1" marginY={2} data-aos="fade-up">
                {t('about.user.cycle')}
              </Typography>
            </Grid>
            <Grid xs={8}>
              <Typography sx={{ margin: 0 }} variant="body1" marginY={2} data-aos="fade-up">
                {author.cycle}
              </Typography>
            </Grid>
            <Grid xs={4}>
              <Typography sx={{ margin: 0 }} variant="subtitle1" marginY={2} data-aos="fade-up">
                {t('about.user.address')}
              </Typography>
            </Grid>
            <Grid xs={8}>
              <Typography sx={{ margin: 0 }} variant="body1" marginY={2} data-aos="fade-up">
                {author.address}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </SectionLayout>
  );
};
