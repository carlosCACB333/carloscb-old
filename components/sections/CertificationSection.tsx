import React from 'react';
import { SectionLayout } from '../Layout';
import { Certification } from '../../graphql/generated/graphql';
import { useTranslation } from 'react-i18next';
import { ArrowRightAltOutlined } from '@mui/icons-material';
import { Button } from '@mui/material';
import Link from 'next/link';
import Grid from '@mui/material/Unstable_Grid2';
import { CertificationCard } from '../certification/CertificationCard';

interface Props {
  certifications: Certification[];
}
export const CertificationSection = ({ certifications }: Props) => {
  const { t } = useTranslation(['home', 'common']);
  console.log(certifications);

  return (
    <SectionLayout
      id="certifications-section"
      component="section"
      maxWidth="xl"
      title={t('home:certifications.title')}
      detail={t('home:certifications.description')}
    >
      <Grid container spacing={1}>
        {certifications.map((cert) => (
          <Grid key={cert.id} xs={12} md={6} lg={4} sx={{ aspectRatio: '5/4' }} data-aos="zoom-in">
            <CertificationCard certification={cert} />
          </Grid>
        ))}
      </Grid>
      <Link
        href="/certification"
        style={{
          textDecoration: 'none',
        }}
      >
        <Button
          sx={{
            marginTop: 2,
          }}
          variant="text"
          color="primary"
          endIcon={<ArrowRightAltOutlined />}
        >
          {t('common:btn.show-all')}
        </Button>
      </Link>
    </SectionLayout>
  );
};
