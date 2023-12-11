/* eslint-disable @typescript-eslint/no-explicit-any */
import { Alert, Box, Button } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import {
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";
import DialogTitle from "@mui/material/DialogTitle";
import * as yup from "yup";

import React, { useCallback, useEffect, useState } from "react";
import {
  CallbackSuccess,
  CareerEnum,
  ErrorType,
  JobEnum,
  Jobs,
} from "./user.type";
import { get, isEmpty } from "lodash";
import { useFetch } from "use-http";

const validationSchema = yup.object({
  name: yup.string().required("Name is required"),
  age: yup
    .number()
    .required("Age is required")
    .min(1, "Age must be at least 1")
    .max(120, "Age must be at most 120"),
  job: yup.string().required("Job is required"),
  career: yup.string().required("Career is required"),
});

const initialUserData = {
  name: "",
  age: 20,
  job: "",
  career: "",
};

export default function CreateUserModal({
  callbackSuccess,
}: {
  callbackSuccess: CallbackSuccess;
}) {
  const [formData, setFormData] = useState(initialUserData);

  const [error, setError] = useState<ErrorType>({});

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const { post } = useFetch("/api/users");

  const resetForm = useCallback(() => {
    setError({});
    setFormData(initialUserData);
  }, []);

  console.log(formData);

  useEffect(() => {
    resetForm();
  }, [resetForm]);

  const handleChange = (
    event: React.ChangeEvent<
      | HTMLInputElement
      | { name?: "name" | "age" | "job" | "career"; value: unknown }
    >
  ) => {
    const { name, value } = event.target;

    const dataChanged = { [name || ""]: value };
    if (name === "career") {
      switch (value) {
        case CareerEnum.RETIRED: {
          dataChanged.job = null;
          break;
        }
        default: {
          dataChanged.job = get(Jobs, `${value}[0]`);
        }
      }
    }

    setFormData((prevData) => ({
      ...prevData,
      ...dataChanged,
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      setError({});

      await validationSchema.validate(formData, {
        abortEarly: false,
      });

      const response = await post(formData);
      console.log(response);

      if (response === "OK") {
        resetForm();
        callbackSuccess && callbackSuccess();
        handleClose();
      } else {
        throw new Error(response.error || "Something went wrong!");
      }
    } catch (error: any) {
      const yupErrors: any = {};

      if (error.inner) {
        error.inner.forEach((err) => {
          if (!yupErrors[err.path]) {
            yupErrors[err.path] = err.message;
          }
        });

        setError(yupErrors);
        return;
      }

      setError({ common: error?.message });
      return;
    }
  };

  return (
    <>
      <Box sx={{ textAlign: "right", marginBottom: 2 }}>
        <Button variant="contained" onClick={handleOpen}>
          Create New User
        </Button>
      </Box>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Create New User</DialogTitle>
        <form onSubmit={handleSubmit}>
          {error?.common && <Alert severity="error">{error?.common}</Alert>}

          <DialogContent>
            <TextField
              fullWidth
              label="Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              error={!!error.name}
              helperText={error.name}
              margin="normal"
            />

            <TextField
              fullWidth
              label="Age"
              name="age"
              type="number"
              value={formData.age}
              onChange={handleChange}
              error={!!error.age}
              helperText={error.age}
              margin="normal"
            />

            <FormControl fullWidth margin="normal">
              <InputLabel>Career</InputLabel>
              <Select
                name="career"
                value={formData.career}
                onChange={handleChange}
                error={!!error.career}
                helperText={error.career}
              >
                {[
                  CareerEnum.STUDENT,
                  CareerEnum.WORKER,
                  CareerEnum.RETIRED,
                ].map((career: CareerEnum) => (
                  <MenuItem key={career} value={career}>
                    {career}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {!isEmpty(Jobs[formData.career as CareerEnum]) && (
              <FormControl fullWidth margin="normal">
                <InputLabel>Job</InputLabel>
                <Select
                  name="job"
                  value={formData.job}
                  onChange={handleChange}
                  error={!!error.job}
                  helperText={error.job}
                >
                  {Jobs[formData.career as CareerEnum].map((job: JobEnum) => (
                    <MenuItem key={job} value={job}>
                      {job}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}
          </DialogContent>

          <DialogActions sx={{ justifyContent: "space-between" }}>
            <Button onClick={handleClose}>Close</Button>
            <Button type="submit" variant="contained" color="primary" autoFocus>
              Create
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
}
