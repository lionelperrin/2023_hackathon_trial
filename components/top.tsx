import Link from "next/link"
import { signIn, signOut, useSession } from "next-auth/react"
import styles from "./top.module.css"

import  { Burger, Button, Center, Container, Group, Header, Menu, createStyles, rem } from "@mantine/core"
import { useDisclosure } from '@mantine/hooks';

const HEADER_HEIGHT = rem(60);
const useStyles = createStyles((theme) => ({
  inner: {
    height: HEADER_HEIGHT,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  links: {
    [theme.fn.smallerThan('sm')]: {
      display: 'none',
    },
  },

  burger: {
    [theme.fn.largerThan('sm')]: {
      display: 'none',
    },
  },

  link: {
    display: 'block',
    lineHeight: 1,
    padding: `${rem(8)} ${rem(12)}`,
    borderRadius: theme.radius.sm,
    textDecoration: 'none',
    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[7],
    fontSize: theme.fontSizes.sm,
    fontWeight: 500,

    '&:hover': {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
    },
  },

  linkLabel: {
    marginRight: rem(5),
  },
}));

interface HeaderActionProps {
  links: { href: string; label: string; }[];
  linkLabelClass: string;
}

const headerlinks = [
  { href: '/client', label: 'Client' },
  { href: '/server', label: 'Server' },
  { href: '/protected', label: 'protected' },
  { href: '/api-example', label: 'API' },
  { href: '/admin', label: 'admin' },
  { href: '/me', label: 'me' },
]

function HeaderLinks({ links, linkLabelClass }: HeaderActionProps ): any  {
  return links.map((l) => 
    <Link href={l.href} key={`${l.label.toLowerCase()}-key`} className={linkLabelClass} >{l.label}</Link>
  );
}

function HeaderMenuItems({ links, linkLabelClass }: HeaderActionProps ): any  {
  return links.map((l) => 
    <Menu.Item  key={`${l.label.toLowerCase()}-menukey`} ><Link href={l.href} className={linkLabelClass} >{l.label}</Link></Menu.Item>
  );
}

// The approach used in this component shows how to build a sign in and sign out
// component that works on pages which support both client and server side
// rendering, and avoids any flash incorrect content on initial page load.
export default function Top() {
  const { data: session, status } = useSession();
  const loading = status === "loading";
  const [opened, { toggle }] = useDisclosure(false);
  const { classes } = useStyles();

  return (
    <Header height={HEADER_HEIGHT}>
      <Container fluid className={classes.inner}>
        <Group>
          <Menu>
            <Menu.Target>
              <Burger opened={opened} onClick={toggle} className={classes.burger} size="sm" />
            </Menu.Target>
            <Menu.Dropdown>
              <HeaderMenuItems links={headerlinks} linkLabelClass={classes.linkLabel}></HeaderMenuItems>
            </Menu.Dropdown>
          </Menu>
        </Group>
        <Group spacing={10} className={classes.links}>
          <HeaderLinks links={headerlinks} linkLabelClass={classes.linkLabel}></HeaderLinks>
        </Group>
        <Group>
          {!session && (
            <>
              <Button component="a" href={`/api/auth/signin`} onClick={(e) => {
                  e.preventDefault()
                  signIn()
                }}>
                Sign in
              </Button>
            </>
          )}
          {session?.user && (
            <>
              {session.user.image && (
                <span
                  style={{ backgroundImage: `url('${session.user.image}')` }}
                  className={styles.avatar}
                />
              )}
              <span className={styles.signedInText}>
                <small>Signed in as</small>
                <br />
                <strong>{session.user.email ?? session.user.name}</strong>
              </span>
              <Button component="a" href={`/api/auth/signout`} onClick={(e) => {
                  e.preventDefault()
                  signOut()
                }}>
                Sign out
              </Button>
            </>
          )}
        </Group>
      </Container>
    </Header>
  )
}
