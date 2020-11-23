import React from 'react';
import Typography from '@material-ui/core/Typography/Typography';
import Container from '@material-ui/core/Container/Container';

import './Header.css';

function Header() {
  return (
    <header>
      <Container maxWidth="md">
        <Typography variant="h3" component="h1">
          SpaceX launch finder
        </Typography>
      </Container>
    </header>
  );
}

export default Header;