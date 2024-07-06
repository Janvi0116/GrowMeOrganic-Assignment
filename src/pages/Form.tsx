import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { TextField, Button, Box, Snackbar, Alert } from "@mui/material";

function Form(): JSX.Element {
  const [name, setName] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [emailId, setEmailId] = useState<string>("");
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [alertMessage, setAlertMessage] = useState<string>("");
  const [necessaryInfoShowed, setNecessaryInfoShowed] = useState<boolean>(false);


  const navigate = useNavigate();
  const location = useLocation();

  // Destructuring the "state" key value
  const { state } = location as { state: { dataNeeded: boolean } | undefined };

  useEffect(() => {
    if (state && state.dataNeeded && !showAlert && !necessaryInfoShowed) {
      setAlertMessage("Please fill in the necessary information");
      setShowAlert(true);
      setNecessaryInfoShowed(true);
    }
  }, [state, showAlert, necessaryInfoShowed]);

  const handleSubmit = () => {
    if (!name || !phoneNumber || !emailId) {
      setAlertMessage("All fields are required");
      setShowAlert(true);
      return;
    }

    if (!/^[A-Za-z\s]+$/.test(name)) {
      setAlertMessage("Invalid name format");
      setShowAlert(true);
      return;
    }

    if (!/^\d{10}$/.test(phoneNumber)) {
      setAlertMessage("Phone number must be 10 digits");
      setShowAlert(true);
      return;
    }

    if (!/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(emailId)) {
      setAlertMessage("Invalid email format");
      setShowAlert(true);
      return;
    }

    localStorage.setItem(
      "userDetails",
      JSON.stringify({ name, phoneNumber, emailId })
    );
    navigate("/second");
  };

  return (
    <Box sx={{ p: 3 }}>
      <h1>Contact Form</h1>
      <form noValidate autoComplete="off">
        <Box mb={2}>
          <TextField
            fullWidth
            label="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            error={name !== "" && !/^[A-Za-z\s]+$/.test(name)}
            helperText={
              name !== "" && !/^[A-Za-z\s]+$/.test(name) ? "Invalid name format" : ""
            }
          />
        </Box>
        <Box mb={2}>
          <TextField
            fullWidth
            label="Phone Number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            error={phoneNumber !== "" && !/^\d{10}$/.test(phoneNumber)}
            helperText={
              phoneNumber !== "" && !/^\d{10}$/.test(phoneNumber)
                ? "Phone number must be 10 digits"
                : ""
            }
          />
        </Box>
        <Box mb={2}>
          <TextField
            fullWidth
            label="Email Id"
            value={emailId}
            onChange={(e) => setEmailId(e.target.value)}
            error={
              emailId !== "" &&
              !/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(emailId)
            }
            helperText={
              emailId !== "" &&
              !/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(emailId)
                ? "Invalid email format"
                : ""
            }
          />
        </Box>
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Submit
        </Button>
      </form>
      <Snackbar
        open={showAlert}
        autoHideDuration={2000}
        onClose={() => setShowAlert(false)}
      >
        <Alert onClose={() => setShowAlert(false)} severity="error">
          {alertMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default Form;
