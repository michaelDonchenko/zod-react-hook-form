import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import {useCallback} from "react";
import {useForm, Controller} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {RegistrationSchemaType, registrationSchema} from "./schema";

const RegistrationForm = () => {
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<RegistrationSchemaType>({
    mode: "all",
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      birthday: undefined,
      gender: undefined,
      termsAndConditions: false,
    },
    resolver: zodResolver(registrationSchema),
  });

  const onSubmit = useCallback((values: RegistrationSchemaType) => {
    window.alert(JSON.stringify(values, null, 4));
  }, []);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box sx={{display: "flex", flexDirection: "column", gap: "15px", marginBottom: "15px"}}>
        <Controller
          name="name"
          control={control}
          render={({field}) => (
            <TextField
              error={!!errors.name}
              label="Name"
              type="text"
              variant="outlined"
              helperText={errors.name?.message}
              {...field}
            />
          )}
        />
        <Controller
          name="email"
          control={control}
          render={({field}) => (
            <TextField
              error={!!errors.email}
              label="Email"
              type="text"
              variant="outlined"
              helperText={errors.email?.message}
              {...field}
            />
          )}
        />
        <Controller
          name="password"
          control={control}
          render={({field}) => (
            <TextField
              error={!!errors.password}
              label="Password"
              type="password"
              variant="outlined"
              helperText={errors.password?.message}
              {...field}
            />
          )}
        />
        <Controller
          name="confirmPassword"
          control={control}
          render={({field}) => (
            <TextField
              error={!!errors.confirmPassword}
              label="Confirm Password"
              type="password"
              variant="outlined"
              helperText={errors.confirmPassword?.message}
              {...field}
            />
          )}
        />
        <Controller
          name="birthday"
          control={control}
          render={({field}) => (
            <>
              <InputLabel error={!!errors.birthday} id="date">
                Age
              </InputLabel>
              <TextField
                {...field}
                id="date"
                type="date"
                variant="outlined"
                error={!!errors.birthday}
                helperText={errors.birthday?.message}
              />
            </>
          )}
        />
        <Controller
          name="gender"
          control={control}
          render={({field}) => (
            <FormControl error={!!errors.gender}>
              <InputLabel id="gender">Gender</InputLabel>
              <Select {...field} labelId="gender" id="gender" label="Age" variant="outlined">
                <MenuItem value={"male"}>Male</MenuItem>
                <MenuItem value={"female"}>Female</MenuItem>
              </Select>
              {errors.gender && <FormHelperText>{errors.gender.message}</FormHelperText>}
            </FormControl>
          )}
        />
        <Controller
          name="termsAndConditions"
          control={control}
          render={({field}) => (
            <FormControl error={!!errors.termsAndConditions} variant="outlined">
              <FormControlLabel
                {...field}
                control={<Checkbox {...field} />}
                label="Accept terms and conditions"
              />
              {errors.termsAndConditions && (
                <FormHelperText>{errors.termsAndConditions.message}</FormHelperText>
              )}
            </FormControl>
          )}
        />
      </Box>
      <Button variant="contained" type="submit">
        Submit
      </Button>
    </form>
  );
};

export default RegistrationForm;
