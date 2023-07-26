import { Box, Typography, useTheme ,Button ,Checkbox } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
//import { data } from "../../data/mockData";
import Header from "../../components/Header";

import { server } from '../../utils/apiRoutes';
import React , { useState , useEffect} from 'react';

const Invoices = () => {

  const [data, setdata] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);

  //Fetch transactions data when the dashboard renders
  useEffect( () => {
    var mount = true;
    if(mount === true)
    { 
        const config = {     
          method: 'GET',
        }
        fetch(`${server}/invoice/getdata`,config)
        .then(res => res.json())
        .then(data => {
          setdata(data);
        })
        .catch(error => {
          console.log(error);
        });
    }
    return () => {mount = false};
  }, []);

  //handle CheckBox
  const handleCheckboxChange = (event, rowId) => {
    if (event.target.checked) {
      setSelectedRows((prevSelectedRows) => [...prevSelectedRows, rowId]);
    } else {
      setSelectedRows((prevSelectedRows) =>
        prevSelectedRows.filter((id) => id !== rowId)
      );
    }
  };

  //Delete selected rows and update the data
  const handleDeleteSelectedRows = () => {
    selectedRows.forEach((rowId) => {
      fetch(`${server}/invoice/deletedata/${rowId}`, {
        method: 'DELETE',
      })
        .then((response) => {
          if (response.ok) {
            console.log('Row deleted successfully');
            // Remove the deleted row from the data state
            setdata((prevData) => prevData.filter((row) => row.id !== rowId));
          } else {
            console.error('Error deleting row:', response.statusText);
          }
        })
        .catch((error) => {
          console.error('Error deleting row:', error);
        });
    });
  };
  
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const columns = [
    { field: "id", headerName: "ID" },
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "phone",
      headerName: "Phone Number",
      flex: 1,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
    },
    {
      field: "cost",
      headerName: "Cost",
      flex: 1,
      renderCell: (params) => (
        <Typography color={colors.greenAccent[500]}>
          ${params.row.cost}
        </Typography>
      ),
    },
    {
      field: "date",
      headerName: "Date",
      flex: 1,
    },
    // adding checkbox to handle the row data
    {
      field: 'checkbox',
      headerName: 'Delete',
      width: 80,
      renderCell: (params) => (
        <Checkbox
          color="primary"
          checked={selectedRows.includes(params.row.id)}
          onChange={(event) => handleCheckboxChange(event, params.row.id)}
        />
      ),
    },
  ];

  return (
    <Box  m="20px">
      <Header title="INVOICES" subtitle="List of Invoice Balances" />
      <Box
        m="40px 0 0 0"
        gap="30px"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
        }}
      >
        <Button
          variant="contained"
          color="secondary" 
          onClick={handleDeleteSelectedRows}
          disabled={selectedRows.length === 0}
        >
          Delete Selected Rows
        </Button>
        <DataGrid  rows={data} columns={columns} />
     </Box>
    </Box>
  );
};

export default Invoices;
