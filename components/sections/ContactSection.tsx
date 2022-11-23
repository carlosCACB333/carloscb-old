import { Button, Card, CardContent, Grid, TextField } from '@mui/material';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { Contact } from '../../interface/contact';
import { contactResolver } from '../../resolvers';
import { SectionLayout } from '../Layout';

export const ContactSection = () => {
  const { t } = useTranslation('home');
  const [loading, setLoading] = useState(false);
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isValid },
  } = useForm<Contact>({ mode: 'all', resolver: contactResolver });

  const onSubmit = (data: Contact) => {
    setLoading(true);
    fetch('/api/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        toast.success(data.message || 'Gracias por contactarnos, pronto nos pondremos en contacto contigo');
        reset();
      })
      .catch((err) => {
        toast.error(err.message || 'Ocurrio un error al enviar el mensaje');
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <SectionLayout
      id="contact-section"
      component="section"
      title={t('contact.title')}
      detail={t('contact.description')}
      maxWidth="sm"
      sx={{
        marginBottom: '16rem',
      }}
    >
      <Card
        variant="outlined"
        sx={{
          bgcolor: 'transparent',
          border: 'none',
        }}
      >
        <CardContent component="form" onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={12}>
              <TextField
                data-aos="fade-up"
                fullWidth
                label={t('contact.form.name')}
                {...register('name')}
                error={!!errors.name}
                helperText={errors.name?.message}
              />
            </Grid>
            <Grid item xs={12} md={12}>
              <TextField
                data-aos="fade-up"
                fullWidth
                label={t('contact.form.phone')}
                {...register('phone')}
                error={!!errors.phone}
                helperText={errors.phone?.message}
              />
            </Grid>
            <Grid item xs={12} md={12}>
              <TextField
                data-aos="fade-up"
                fullWidth
                label={t('contact.form.email')}
                type="email"
                {...register('email')}
                error={!!errors.email}
                helperText={errors.email?.message}
              />
            </Grid>
            <Grid item xs={12} md={12}>
              <TextField
                data-aos="fade-up"
                fullWidth
                label={t('contact.form.affair')}
                {...register('affair')}
                error={!!errors.affair}
                helperText={errors.affair?.message}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                data-aos="fade-up"
                fullWidth
                label={t('contact.form.message')}
                {...register('message')}
                multiline
                minRows={4}
                error={!!errors.message}
                helperText={errors.message?.message}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                fullWidth
                type="submit"
                disabled={!isValid || loading}
                data-aos="fade-up"
                aria-label={t('contact.form.btn-send')}
              >
                {t('contact.form.btn-send')}
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </SectionLayout>
  );
};
