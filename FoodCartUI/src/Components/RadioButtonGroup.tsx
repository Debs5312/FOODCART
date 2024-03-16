import {
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormLabel,
} from "@mui/material";

interface Props {
  options: any[];
  onChange: (event: any) => void;
  selectedValue: string;
  title: string;
}

export default function RadioButtonGroup({
  options,
  onChange,
  selectedValue,
  title,
}: Props) {
  return (
    <FormControl component="fieldset">
      <FormLabel sx={{ p: 1 }}>{title}</FormLabel>
      <RadioGroup onChange={onChange} value={selectedValue}>
        {options.map(({ value, label }) => (
          <FormControlLabel
            value={value}
            control={<Radio />}
            label={label}
            key={value}
            sx={{ p: 1 }}
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
}
