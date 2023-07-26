import { Box , Button } from "@mui/material";
import {Link} from 'react-router-dom'
import Header from "../../components/Header";
import BarChart from "../../components/BarChart";

const Bar = () => {
  return (
    <Box m="20px">
      <Header title="Bar Chart" subtitle="Simple Bar Chart" />
      <Button component={Link} to="/barform" color="secondary" variant="contained">
            Add Data 
      </Button>
      <Box height="75vh">
        <BarChart />
      </Box>
    </Box>
  );
};

export default Bar;
