import { Box ,Button} from "@mui/material";
import Header from "../../components/Header";
import LineChart from "../../components/LineChart";
import {Link} from 'react-router-dom'

const Line = () => {
  return (
    <Box m="20px">
      <Header title="Line Chart" subtitle="Simple Line Chart" />
      <Button component={Link} to="/lineform" color="secondary" variant="contained">
            Add Data 
      </Button>
      <Box height="75vh">
        <LineChart />
      </Box>
    </Box>
  );
};

export default Line;
