import React from "react";
import Box from "@material-ui/core/Box/Box";
import Select from "@material-ui/core/Select/Select";
import MenuItem from "@material-ui/core/MenuItem/MenuItem";
import { EnumSortValue } from "../AllLaunches";
import { SelectInputProps } from "@material-ui/core/Select/SelectInput";

interface IAllLaunchesSortProps {
  sortValues: EnumSortValue[],
  sortSelectedValue: EnumSortValue,
  onChangeSort: SelectInputProps['onChange']
}

function AllLaunchesSort({ sortValues, sortSelectedValue, onChangeSort }: IAllLaunchesSortProps) {
  return (
    <React.Fragment>
      <Box display="flex" mr={1} alignSelf="center">Sort by</Box>
      <Select
        value={sortSelectedValue}
        onChange={onChangeSort}
      >
        { sortValues.map((sortValue) => <MenuItem value={sortValue}>{sortValue}</MenuItem>)}
      </Select>
    </React.Fragment>
  );
}

export default AllLaunchesSort;
