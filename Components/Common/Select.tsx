import * as React from "react";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import {
  Checkbox,
  ListItemText,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export default function Select_Comp(props: any) {
  const { data, input, label, multiple, onChange, onBlur, name, value } = props;
  const [personName, setPersonName] = React.useState<string[]>([]);
  const handleChange = (event: SelectChangeEvent<typeof personName>) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  return (
    <div>
      <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id="demo-multiple-checkbox-label">{label}</InputLabel>
        <Select
          labelId="demo-multiple-checkbox-label"
          id="demo-multiple-checkbox"
          multiple={multiple}
          value={value}
          onChange={onChange}
          input={input}
          renderValue={(selected: any) =>
            multiple == true ? selected.join(", ") : selected
          }
          MenuProps={MenuProps}
          name={name}
          onBlur={onBlur}
        >
          {data.map((name: any) => {
            const data = typeof name == "object" ? name.name : name;
            return (
              <MenuItem key={name} value={name}>
                {multiple == true ? (
                  <Checkbox checked={value.indexOf(data) > -1} />
                ) : null}
                <ListItemText primary={data} />
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </div>
  );
}
