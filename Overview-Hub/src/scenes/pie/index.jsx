import Header from "../../components/Header";
import {Link} from 'react-router-dom'
import PieChart from "../../components/PieChart";
import { Box, Button} from "@mui/material";
const Pie = () => {
  return (
    <Box m="20px">
      <Header title="Pie Chart" subtitle="Simple Pie Chart" />
      <Button component={Link} to="/pieform" color="secondary" variant="contained">
            Add Data 
      </Button>
      <Box height="75vh">
        <PieChart />
      </Box>
    </Box>
  );
};

export default Pie;
