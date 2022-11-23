import Grid from '@mui/material/Unstable_Grid2';
import { GetStaticProps } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useRouter } from 'next/router';
import React, { useCallback, useState } from 'react';
import { CertificationCard } from '../../components/certification/CertificationCard';
import { Meta } from '../../components/common';
import { SectionLayout } from '../../components/Layout';
import { ProgressBar } from '../../components/UI';
import { Certification, GetCertificationsDocument, Stage } from '../../graphql';
import { useObserver } from '../../hooks/useObserver';
import { client } from '../../utils/apolloClient';

interface Props {
  certifications: Certification[];
}

const FIRST = 16;

const CertificatePage = ({ certifications: c }: Props) => {
  const [certifications, setCertifications] = useState(c);
  const skipRef = React.useRef(FIRST);
  const { t } = useTranslation('certification');
  const { isPreview } = useRouter();

  const loadMore = useCallback(async () => {
    const { data } = await client.query({
      query: GetCertificationsDocument,
      variables: { first: FIRST, skip: skipRef.current, stage: isPreview ? Stage.Draft : Stage.Published },
    });
    setCertifications((prev) => [...prev, ...(data.certifications as Certification[])]);

    if (data.certifications.length < FIRST) {
      return false;
    }
    skipRef.current += FIRST;
    return true;
  }, [isPreview]);

  const { moreRef } = useObserver(loadMore);

  return (
    <SectionLayout maxWidth="xl" title={t('title')} detail={t('description')}>
      <Meta title={t('title')} description={t('description')} />

      <Grid container spacing={1}>
        {certifications.map((certification, idx) => (
          <Grid key={certification.id} xs={12} sm={6} md={4} lg={3} sx={{ aspectRatio: '5/4' }} data-aos="zoom-in">
            <CertificationCard certification={certification} idx={idx} />
          </Grid>
        ))}
      </Grid>

      <div ref={moreRef}>
        <ProgressBar />
      </div>
    </SectionLayout>
  );
};

export default CertificatePage;

export const getStaticProps: GetStaticProps = async ({ locale, preview }) => {
  const i18n = await serverSideTranslations(locale || 'es', ['common', 'certification']);
  const { data } = await client.query({
    query: GetCertificationsDocument,
    variables: {
      first: FIRST,
      skip: 0,
      stage: preview ? Stage.Draft : Stage.Published,
    },
  });

  return {
    props: {
      ...i18n,
      certifications: data.certifications,
    },
    revalidate: 3600,
  };
};
