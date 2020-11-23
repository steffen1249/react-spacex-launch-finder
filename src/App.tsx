import React from 'react';
import Container from '@material-ui/core/Container/Container';
import Header from './components/Header/Header';
import LatestLaunch from './components/LatestLaunch/LatestLaunch';
import AllLaunches from './components/AllLaunches/AllLaunches';

import './App.css';

function App() {
  return (
    <div className="App">
      <Header />
      <Container
        maxWidth="md"
        className="latest-launch"
      >
        <LatestLaunch />
        <AllLaunches />
      </Container>
    </div>
  );
}

export default App;
