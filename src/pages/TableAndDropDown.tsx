import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { CircularProgress, Box, Typography, Alert } from "@mui/material";
import getUserData from "../api/getUserData";
import DepartmentList from "../components/DepartmentList";

type UserData = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

function TableAndDropDown(): JSX.Element {
  const [userData, setUserData] = useState<UserData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("userDetails")) {
      // fetch the data from API and show on screen
      getUserData()
        .then((finalData: UserData[]) => {
          setUserData(finalData);
        })
        .catch(() => {
          setError(true);
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      // redirect to the first page
      navigate("/", {
        state: {
          dataNeeded: true,
        },
      });
    }
  }, [navigate]);

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", flex: 1 },
    { field: "userId", headerName: "User ID", flex: 1 },
    { field: "title", headerName: "Title", flex: 2 },
    { field: "body", headerName: "Body", flex: 3 },
  ];

  return (
    <>
      <Box sx={{ p: 3 }}>
        {isLoading && (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100vh",
            }}
          >
            <CircularProgress />
          </Box>
        )}
        {error && (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100vh",
            }}
          >
            <Alert severity="error">Something went wrong</Alert>
          </Box>
        )}
        {!isLoading && !error && (
          <Box sx={{ height: 600, width: "100%" }}>
            <Typography variant="h4" gutterBottom>
              User Data
            </Typography>
            <DataGrid rows={userData} columns={columns} />
          </Box>
        )}
      </Box>
      <DepartmentList />
    </>
  );
}

export default TableAndDropDown;
