import React, { useContext } from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import { IconButton, Link } from '@mui/material';
import {
  Code,
  ContactPhone,
  Facebook,
  Favorite,
  FolderSpecial,
  GitHub,
  Home,
  LinkedIn,
  WhatsApp,
} from '@mui/icons-material';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { AuthorContext } from '../../context';
import { useTranslation } from 'react-i18next';
import { Icon } from '../icons';

interface Props {}

export const SideMenu = ({}: Props) => {
  const router = useRouter();
  const { author } = useContext(AuthorContext);
  const { t } = useTranslation(['sideMenu']);

  const routes = [
    { name: t('home'), Icon: Home, href: '/' },
    { name: t('about'), Icon: Favorite, href: '/#about-section' },
    { name: t('skills'), Icon: Code, href: '/#skills-section' },
    { name: t('projects'), Icon: FolderSpecial, href: '/#projects-section' },
    { name: t('contact'), Icon: ContactPhone, href: '/#contact-section' },
  ];

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: '100%',
        paddingX: 4,
        paddingTop: 8,
        paddingBottom: 2,
      }}
    >
      <Box>
        <NextLink
          href="/"
          style={{
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <Icon name="logo" color="primary" sx={{ fontSize: '4em' }} />
        </NextLink>
        <br />
        <br />
        <List>
          {routes.map((route, idx) => (
            <ListItem key={route.name + idx}>
              <Link
                sx={{
                  py: 1,
                  display: 'flex',
                  alignItems: 'center',
                  fontWeight: router.asPath === route.href ? 'bold' : 'normal',
                  color: router.asPath === route.href ? 'primary.main' : 'text.secondary',
                }}
                component={NextLink}
                href={route.href || ''}
              >
                <ListItemIcon>{<route.Icon />}</ListItemIcon>
                {route.name.toUpperCase()}
              </Link>
            </ListItem>
          ))}
        </List>
      </Box>
      <Box
        sx={{
          display: 'flex',
          alignSelf: 'center',
        }}
      >
        <Link href={author?.facebook || ''} target="_blank">
          <IconButton>
            <Facebook color="secondary" />
          </IconButton>
        </Link>
        <Link href={`https://wa.me/51${author.phone}`} target="_blank">
          <IconButton>
            <WhatsApp color="secondary" />
          </IconButton>
        </Link>
        <Link href={author?.linkedin || ''} target="_blank">
          <IconButton>
            <LinkedIn color="secondary" />
          </IconButton>
        </Link>
        <Link href={author?.github || ''} target="_blank">
          <IconButton>
            <GitHub color="secondary" />
          </IconButton>
        </Link>
      </Box>
    </Box>
  );
};
