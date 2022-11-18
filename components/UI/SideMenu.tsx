import React, { useContext, useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import { IconButton, Link } from '@mui/material';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';

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
  const { t } = useTranslation('common');
  const routes = [
    { name: t('side.home'), Icon: Home, id: '' },
    { name: t('side.about'), Icon: Favorite, id: 'about-section' },
    { name: t('side.skills'), Icon: Code, id: 'skills-section' },
    { name: t('side.projects'), Icon: FolderSpecial, id: 'projects-section' },
    { name: t('side.certifications'), Icon: VerifiedUserIcon, id: 'certifications-section' },
    { name: t('side.contact'), Icon: ContactPhone, id: 'contact-section' },
  ];
  const [active, setActive] = useState(routes[0].id);
  const { asPath } = useRouter();
  const { author } = useContext(AuthorContext);

  useEffect(() => {
    const sections = document.querySelectorAll('section');
    const onScroll = (): void => {
      const scrollY = window.scrollY;
      sections.forEach((section) => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 200;
        const sectionId = section.getAttribute('id') || '';

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          setActive(sectionId);
        }
      });
    };

    window.addEventListener('scroll', onScroll);

    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  useEffect(() => {
    const id = asPath.replace('/', '').replace('#', '');
    setActive(id);
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  }, [asPath]);

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
          <Icon
            name="logo"
            color="primary"
            sx={{
              fontSize: '4em',
            }}
          />
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
                  fontWeight: active === route.id ? 'bold' : 'normal',
                  color: active == route.id ? 'primary.main' : 'text.secondary',
                }}
                component={NextLink}
                href={route.id ? `/#${route.id}` : '/'}
              >
                <ListItemIcon>{<route.Icon />}</ListItemIcon>
                {route.name.toUpperCase()}
              </Link>
            </ListItem>
          ))}
        </List>
      </Box>
      {author && (
        <Box
          sx={{
            display: 'flex',
            alignSelf: 'center',
          }}
        >
          <Link href={author.facebook || ''} target="_blank">
            <IconButton aria-label="facebook">
              <Facebook color="secondary" />
            </IconButton>
          </Link>
          <Link href={`https://wa.me/51${author.phone}`} target="_blank">
            <IconButton aria-label="whatsapp">
              <WhatsApp color="secondary" />
            </IconButton>
          </Link>
          <Link href={author.linkedin || ''} target="_blank">
            <IconButton aria-label="linkedin">
              <LinkedIn color="secondary" />
            </IconButton>
          </Link>
          <Link href={author.github || ''} target="_blank">
            <IconButton aria-label="github">
              <GitHub color="secondary" />
            </IconButton>
          </Link>
        </Box>
      )}
    </Box>
  );
};
