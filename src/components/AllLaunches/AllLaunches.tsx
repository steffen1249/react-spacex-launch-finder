import axios from 'axios';
import Grid from '@material-ui/core/Grid/Grid';
import LaunchCard from '../LaunchCard/LaunchCard';
import React, { Fragment, useEffect, useState } from "react"
import Typography from '@material-ui/core/Typography/Typography';
import CircularProgress from '@material-ui/core/CircularProgress/CircularProgress';

import AllLaunchesSort from "./AllLaunchesSort/AllLaunchesSort";
import AllLaunchesFilter from "./AllLaunchesFilter/AllLaunchesFilter";

import './AllLaunches.css';

interface IAllLaunchesState {
  name: string;
  details: string;
  links: {
    patch: {
      small: string | null;
      large: string | null;
    };
  };
  date_utc: string;
  id: string;
  launchpad: string;
}

interface ILaunchPadCheckbox {
  id: string;
  name: string;
  isChecked: boolean;
}

export enum EnumSortValue {
  DateDesc = 'Date descending',
  DateAsc = 'Date ascending',
  NameAsc = 'Name ascending',
  NameDesc = 'Name descending'
}

function AllLaunches() {
  const defaultSortValues = [
    EnumSortValue.DateDesc,
    EnumSortValue.DateAsc,
    EnumSortValue.NameAsc,
    EnumSortValue.NameDesc
  ];
  const defaultSortValue = defaultSortValues[0];

  const [allLaunches, setAllLaunches] = useState<IAllLaunchesState[]>([]);
  const [launchPadCheckboxes, setlaunchPadCheckboxes] = useState<ILaunchPadCheckbox[]>([]);
  const [sortSelectedValue, setSortSelectedValue] = useState(defaultSortValue);
  const [launchesDisplayed, setLaunchesDisplayed] = useState<IAllLaunchesState[]>([]);

  useEffect(() => {
    const fetchAllLaunches = async () => {
      const launchesPromise = axios('https://api.spacexdata.com/v4/launches');
      const launchPadsPromise = axios('https://api.spacexdata.com/v4/launchpads');

      const [launchesResponse, launchPadsResponse] = await Promise.all([launchesPromise, launchPadsPromise]);
      setAllLaunches(launchesResponse.data);

      const launchPadCheckboxes: ILaunchPadCheckbox[] = launchPadsResponse.data.map((launchPad: any) => ({
        id: launchPad.id,
        name: launchPad.name,
        isChecked: false
      }));
      setlaunchPadCheckboxes(launchPadCheckboxes);
    };

    fetchAllLaunches();
  }, []);

  useEffect(() => {
    const onlyCheckedLaunchPads = launchPadCheckboxes.filter((launchPadCheckbox) => launchPadCheckbox.isChecked);

    // If no launch pads are checked, sort all launches and show those
    if (!onlyCheckedLaunchPads.length) {
      const sortedLaunches = sortLaunches(allLaunches, defaultSortValue);
      setLaunchesDisplayed(sortedLaunches);
      return;
    }

    const filteredLaunches = allLaunches.filter((launch) => onlyCheckedLaunchPads.some(launchPad => launchPad.id === launch.launchpad));

    const sortedLaunches = sortLaunches(filteredLaunches, defaultSortValue);
    setLaunchesDisplayed(sortedLaunches);
  }, [allLaunches, launchPadCheckboxes, defaultSortValue]);
  
  const onChangeSort = (event: React.ChangeEvent<{ value: unknown }>) => {
    const selectedValue = event.target.value as EnumSortValue;
    setSortSelectedValue(selectedValue);
    const sortedLaunches = sortLaunches(launchesDisplayed, selectedValue);
    setLaunchesDisplayed(sortedLaunches);
  };

  const onChangeFilter = (event: React.ChangeEvent<{}>) => {
    const changedTarget = event.target as HTMLInputElement
    const checkBoxIndex = launchPadCheckboxes.findIndex((launchPadCheckbox) => launchPadCheckbox.name === changedTarget.name);

    const copyOfCheckboxes = [...launchPadCheckboxes];
    copyOfCheckboxes[checkBoxIndex] = {
      ...copyOfCheckboxes[checkBoxIndex],
      isChecked: changedTarget.checked
    };

    setlaunchPadCheckboxes(copyOfCheckboxes);
  }

  const sortLaunches = (data: IAllLaunchesState[], sortSelectedValue: string) => {
    let sortedLaunches = [...data];

    switch (sortSelectedValue) {
      case EnumSortValue.DateDesc:
      default:
        sortedLaunches = sortedLaunches.sort((a, b) => b.date_utc.localeCompare(a.date_utc, 'en', { sensitivity: 'base' }))
        break;
      case EnumSortValue.DateAsc:
        sortedLaunches = sortedLaunches.sort((a, b) => a.date_utc.localeCompare(b.date_utc, 'en', { sensitivity: 'base' }))
        break;
      case EnumSortValue.NameAsc:
        sortedLaunches = sortedLaunches.sort((a, b) => a.name.localeCompare(b.name, 'en', { sensitivity: 'base' }))
        break;
      case EnumSortValue.NameDesc:
        sortedLaunches = sortedLaunches.sort((a, b) => b.name.localeCompare(a.name, 'en', { sensitivity: 'base' }))
        break;
    }

    return sortedLaunches;
  }

  return (
    <Fragment>
      <Typography
        variant="h5"
        component="h2"
      >
        All launches
      </Typography>
      <Grid container>
        <Grid item xs={3}>
          <AllLaunchesSort
            sortValues={defaultSortValues}
            sortSelectedValue={sortSelectedValue}
            onChangeSort={onChangeSort}
          />
        </Grid>
        <Grid item xs={9}>
          <AllLaunchesFilter
            launchPadCheckboxes={launchPadCheckboxes}
            onChangeFilter={onChangeFilter}
          />
        </Grid>
      </Grid>
      <Grid
        container
        spacing={2}
      >
        { launchesDisplayed.length ?
          launchesDisplayed.map((launch) => (
            <Grid
              key={launch.id}
              item
              xs={4}
            >
              <LaunchCard
                name={launch.name}
                details={launch.details}
                imageSrc={launch.links.patch.small}
                date_utc={launch.date_utc}
              />
            </Grid>
          ))
          :
          <CircularProgress />
        }
      </Grid>
    </Fragment>
  )
}

export default AllLaunches;