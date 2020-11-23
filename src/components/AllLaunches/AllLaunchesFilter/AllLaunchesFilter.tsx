import React from "react";
import Menu from "@material-ui/core/Menu/Menu";
import Button from "@material-ui/core/Button/Button";
import MenuItem from "@material-ui/core/MenuItem/MenuItem";
import Checkbox from "@material-ui/core/Checkbox/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel/FormControlLabel";

import './AllLaunchesFilter.css';

interface ILaunchPadCheckbox {
  id: string;
  name: string;
  isChecked: boolean;
}

interface IFilterItemProps {
  launchPadCheckbox: ILaunchPadCheckbox
  onChangeFilter: (event: React.ChangeEvent<{}>, checked: boolean) => void
}

interface ILaunchesFilterProps {
  launchPadCheckboxes: ILaunchPadCheckbox[],
  onChangeFilter: (event: React.ChangeEvent<{}>, checked: boolean) => void
}

function FilterItem({ launchPadCheckbox, onChangeFilter }: IFilterItemProps) {
  return (
    <MenuItem className="filter__menu-item" disableGutters key={launchPadCheckbox.id}>
      <FormControlLabel
        className="filter__control"
        name={launchPadCheckbox.name}
        onChange={onChangeFilter}
        control={<Checkbox />}
        checked={launchPadCheckbox.isChecked}
        label={launchPadCheckbox.name}
      />
    </MenuItem>
  );
}

function AllLaunchesFilter({ launchPadCheckboxes, onChangeFilter }: ILaunchesFilterProps) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const onClickFilterButton = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const onCloseMenu = () => {
    setAnchorEl(null);
  };

  return (
    <React.Fragment>
      <Button onClick={onClickFilterButton}>
        Filter by launchpad
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={onCloseMenu}
      >
        {launchPadCheckboxes.map((launchPadCheckbox) => FilterItem({launchPadCheckbox, onChangeFilter}))}
      </Menu>
    </React.Fragment>
  );
}

export default AllLaunchesFilter;
