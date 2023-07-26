import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import { server } from '../../utils/apiRoutes'
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";

const BarForm = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const handleFormSubmit = (values , {resetForm}) => {
    const config = {     
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(values)
    }
    fetch(`${server}/bar/addbar`,config)
    .then(res => res.json())
    .then(data => console.log(data))
    .catch(error => {
      console.log(error);
    });
    resetForm({values:''});
  };

  return (
    <Box m="20px">
      <Header title="ADD BAR DATA" subtitle="Add the fast food data of different countries"/>

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
                label="Country"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.country}
                name="country"
                error={!!touched.country && !!errors.country}
                helperText={touched.country && errors.country}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="number"
                label="Hot Dog"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.hotdog}
                name="hotdog"
                error={!!touched.hotdog && !!errors.hotdog}
                helperText={touched.hotdog && errors.hotdog}
                sx={{ gridColumn: "span 2" }}
              />
               <TextField
                fullWidth
                variant="filled"
                type="number"
                label="Burger"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.burger}
                name="burger"
                error={!!touched.burger && !!errors.burger}
                helperText={touched.burger && errors.burger}
                sx={{ gridColumn: "span 2" }}
              />
               <TextField
                fullWidth
                variant="filled"
                type="number"
                label="Kebab"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.kebab}
                name="kebab"
                error={!!touched.kebab && !!errors.kebab}
                helperText={touched.kebab && errors.kebab}
                sx={{ gridColumn: "span 2" }}
              />
               <TextField
                fullWidth
                variant="filled"
                type="number"
                label="Donut"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.donut}
                name="donut"
                error={!!touched.donut && !!errors.donut}
                helperText={touched.donut && errors.donut}
                sx={{ gridColumn: "span 2" }}
              />
               <TextField
                fullWidth
                variant="filled"
                type="number"
                label="Others"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.others}
                name="others"
                error={!!touched.others && !!errors.others}
                helperText={touched.others && errors.others}
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
    country: yup.string().required("required")
});
const initialValues = {
  country:"",
  hotdog:0,
  burger:0,
  kebab:0,
  donut:0,
  others:0,
};

export default BarForm;
