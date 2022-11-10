import { Table, TableBody, TableCell, TableContainer, TableRow, Typography, useMediaQuery } from '@mui/material';
import Image from 'next/legacy/image';
import React, { useContext } from 'react';
import { AuthorContext } from '../../context';
import { SectionLayout } from '../Layout';
import Grid from '@mui/material/Unstable_Grid2';
import { getTheme } from '../../theme';
import { useTranslation } from 'react-i18next';

export const AboutSection = () => {
  const { author } = useContext(AuthorContext);
  const isMd = useMediaQuery(getTheme('dark').breakpoints.up('md'));
  const { t } = useTranslation('home');

  return (
    <SectionLayout id="about-section">
      <Grid container height="100%" spacing={4}>
        {isMd && (
          <Grid xs={12} md={6}>
            <Image
              src={author.photos.at(-1)?.url || ''}
              alt="Carlos Castillo Blas"
              layout="responsive"
              height={500}
              width={500}
              style={{ borderRadius: 16 }}
            />
          </Grid>
        )}

        <Grid xs={12} md={6}>
          <Typography variant="h1" marginY={2}>
            {t('about.title')}
          </Typography>
          <article dangerouslySetInnerHTML={{ __html: author.bio! }} />

          <TableContainer className="scroll" sx={{ marginTop: 2 }}>
            <Table sx={{ minWidth: 400 }} aria-label="Tabla simple" size="small">
              <TableBody>
                <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell sx={{ fontWeight: 'bold' }}>{t('about.user.name')}</TableCell>
                  <TableCell>{author.firstName + ' ' + author.lastName}</TableCell>
                </TableRow>
                <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell sx={{ fontWeight: 'bold' }}>{t('about.user.email')}</TableCell>
                  <TableCell>{author.email}</TableCell>
                </TableRow>
                <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell sx={{ fontWeight: 'bold' }}>{t('about.user.age')}</TableCell>
                  <TableCell>{new Date().getFullYear() - new Date(author.birth).getFullYear()}</TableCell>
                </TableRow>
                <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell sx={{ fontWeight: 'bold' }}>{t('about.user.phone')}</TableCell>
                  <TableCell>{author.phone}</TableCell>
                </TableRow>
                <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell sx={{ fontWeight: 'bold' }}>{t('about.user.profession')}</TableCell>
                  <TableCell>{author.profession}</TableCell>
                </TableRow>
                <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell sx={{ fontWeight: 'bold' }}>{t('about.user.university')}</TableCell>
                  <TableCell>{author.university}</TableCell>
                </TableRow>
                <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell sx={{ fontWeight: 'bold' }}>{t('about.user.cycle')}</TableCell>
                  <TableCell>{author.cycle}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </SectionLayout>
  );
};
