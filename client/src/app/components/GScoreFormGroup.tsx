import { Button, Stack, TextField } from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";

type FormValues = {
  sbd: string;
};

type GScroreFormProps = {
  setDetailContent: (content: string) => void;
};

export const GScroreForm: React.FC<GScroreFormProps> = ({
  setDetailContent,
}) => {
  const form = useForm<FormValues>({
    defaultValues: {
      sbd: "",
    },
  });
  const { register, handleSubmit, formState } = form;
  const { errors } = formState;

  const onSubmit = (data: FormValues) => {
    setDetailContent(`${data.sbd}`);
  };

  const sbdValidate = (value: string) => {
    const isValid = /^\d{8}$/.test(value);
    return isValid || "Số báo danh phải là 8 chữ số";
  };
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <Stack
          direction="row"
          spacing={3}
          sx={{
            alignItems: "flex-start",
          }}
        >
          <TextField
            label="Số báo danh"
            type="text"
            size="small"
            {...register("sbd", {
              required: "Số báo danh không được để trống",
              validate: sbdValidate,
            })}
            error={!!errors.sbd}
            helperText={errors.sbd?.message}
            sx={{
              "& .MuiInputBase-input": {
                height: "100%",
              },
            }}
          />
          <Button type="submit" variant="contained">
            Submit
          </Button>
        </Stack>
      </form>
    </>
  );
};

export default GScroreForm;
