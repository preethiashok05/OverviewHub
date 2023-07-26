import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import { server } from '../../utils/apiRoutes'
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";

const PieForm = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const handleFormSubmit = (values , {resetForm}) => {
    console.log('submitted');
    const config = {     
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(values)
    }
    fetch(`${server}/pie/addpie`,config)
    .then(res => res.json())
    .then(data => console.log(data))
    .catch(error => {
      console.log(error);
    });
    resetForm({values:''});
  };

  return (
    <Box m="20px">
      <Header title="Add Pie Data" />

      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        validationSchema={checkoutSchema}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
        }) => (
          <form onSubmit={handleSubmit}>
            <Box
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
              }}
            >
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Label"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.label}
                name="label"
                error={!!touched.label && !!errors.label}
                helperText={touched.label && errors.label}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Value"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.value}
                name="value"
                error={!!touched.value && !!errors.value}
                helperText={touched.value && errors.value}
                sx={{ gridColumn: "span 2" }}
              />
               <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Color (Enter it in HSL format)"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.color}
                name="color"
                error={!!touched.color && !!errors.color}
                helperText={touched.color && errors.color}
                sx={{ gridColumn: "span 2" }}
              />
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                Submit
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

const checkoutSchema = yup.object().shape({
  label: yup.string().required("required"),
  value: yup.string().required("required"),
  color: yup.string().required("required"),
});
const initialValues = {
    label:"",
    value:"",
    color:""
};

export default PieForm;
