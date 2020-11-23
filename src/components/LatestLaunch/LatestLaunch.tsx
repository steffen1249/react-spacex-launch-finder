import React, { Fragment, useEffect, useState } from "react"
import Typography from '@material-ui/core/Typography/Typography';
import Grid from '@material-ui/core/Grid/Grid';
import CircularProgress from '@material-ui/core/CircularProgress/CircularProgress';
import axios from 'axios';
import LaunchCard from '../LaunchCard/LaunchCard';

interface ILatestLaunchState {
  name: string,
  details: string,
  links: {
    patch: {
      small: string | null,
      large: string | null
    }
  },
  date_utc: string
}

function LatestLaunch() {
  const [latestLaunch, setLatestLaunch] = useState<ILatestLaunchState>();

  useEffect(() => {
    const fetchLatestLaunch = async () => {
      const response = await axios('https://api.spacexdata.com/v4/launches/latest');
      setLatestLaunch(response.data);
    };

    fetchLatestLaunch();
  }, []);

  return (
    <Fragment>
      <Typography
        variant="h5"
        component="h2"
      >
        Latest launch
      </Typography>
      <Grid
        container
        justify="center"
      >
        <Grid
          item
          xs={6}
        >
          { latestLaunch ?
            <LaunchCard
              name={latestLaunch.name}
              details={latestLaunch.details}
              imageSrc={latestLaunch.links.patch.small}
              date_utc={latestLaunch.date_utc}
            />
            :
            <CircularProgress />
          }
        </Grid>
      </Grid>
    </Fragment>
  )
}

export default LatestLaunch;
