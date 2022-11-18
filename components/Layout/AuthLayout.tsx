import { Card, CardContent, Box, Typography, Button, Divider, Link as MuiLink, Container } from '@mui/material';
import Link from 'next/link';
import React, { PropsWithChildren } from 'react';

interface Props extends PropsWithChildren {
  isLogin?: boolean;
}

export const AuthLayout = ({ children, isLogin }: Props) => {
  return (
    <Container
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}
    >
      <Card sx={{ maxWidth: 420, p: 2 }}>
        <CardContent>
          <Box
            sx={{
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
              marginBottom: 2,
            }}
          >
            <Typography variant="h2">Telegram</Typography>
            <Box>
              <Typography gutterBottom variant="h1" color="primary">
                Hola, Bienvenido
              </Typography>
              <Typography variant="caption" fontSize="16px" gutterBottom textAlign="center">
                {isLogin ? 'Inicia sesión para continuar' : 'Registrate para continuar'}
              </Typography>
            </Box>

            <Button variant="outlined" fullWidth aria-label="google login">
              Iniciar sesión con Google
            </Button>
            <Box
              sx={{
                alignItems: 'center',
                display: 'flex',
              }}
            >
              <Divider sx={{ flexGrow: 1 }} />

              <Button
                variant="outlined"
                sx={{
                  mx: 2,
                }}
                disabled
                aria-label="or"
              >
                O
              </Button>

              <Divider sx={{ flexGrow: 1 }} />
            </Box>
            <Typography variant="subtitle1" sx={{ textAlign: 'center' }}>
              {isLogin ? 'Iniciar sesión con tu email y password' : 'Registrate con tu email y password'}
            </Typography>
          </Box>
          {children}
          <Divider />
          {isLogin ? (
            <Typography component="span" variant="body2" sx={{ textAlign: 'center' }}>
              ¿Aún no tienes una cuenta?
              <Link href="/auth/signup">
                <MuiLink component="span"> Registrate</MuiLink>
              </Link>
            </Typography>
          ) : (
            <Typography variant="body2" sx={{ textAlign: 'center' }}>
              ¿Ya tienes una cuenta?
              <Link href="/auth/login">
                <MuiLink component="span"> Inicia sesión</MuiLink>
              </Link>
            </Typography>
          )}
        </CardContent>
      </Card>
    </Container>
  );
};
