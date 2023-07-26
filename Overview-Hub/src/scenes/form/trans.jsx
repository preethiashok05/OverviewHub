import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import { server } from '../../utils/apiRoutes'
//import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";

const TransForm = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const handleFormSubmit = (values , {resetForm}) => {
    const config = {     
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(values)
    }
    fetch(`${server}/transactions/addtransaction`,config)
    .then(res => res.json())
    .then(data => console.log(data))
    .catch(error => {
      console.log(error);
    });
    resetForm({values:''});
  };

  return (
    <Box m="20px">
      <Header title="ADD Transaction DATA" />

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
                label="txId"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.txId}
                name="txId"
                error={!!touched.txId && !!errors.txId}
                helperText={touched.txId && errors.txId}
                sx={{ gridColumn: "span 4" }}
              />
            
               <TextField
                fullWidth
                variant="filled"
                type="number"
                label="User"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.user}
                name="user"
                error={!!touched.user && !!errors.user}
                helperText={touched.user && errors.user}
                sx={{ gridColumn: "span 2" }}
              />
               <TextField
                fullWidth
                variant="filled"
                type="String"
                label="date"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.date}
                name="date"
                error={!!touched.date && !!errors.date}
                helperText={touched.date && errors.date}
                sx={{ gridColumn: "span 2" }}
              />
               <TextField
                fullWidth
                variant="filled"
                type="number"
                label="cost"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.cost}
                name="cost"
                error={!!touched.cost && !!errors.cost}
                helperText={touched.cost && errors.cost}
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


const initialValues = {
    txId:"",
    user: "",
    date: "",
    cost:""
};

export default TransForm;
