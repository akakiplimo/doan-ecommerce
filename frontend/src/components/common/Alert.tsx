import { Alert as MuiAlert, Snackbar } from "@mui/material";

interface AlertProps {
  open: boolean;
  message: string;
  severity?: "error" | "warning" | "info" | "success";
  onClose: () => void;
}

const Alert = ({ open, message, severity, onClose }: AlertProps) => {
  return (
    <Snackbar
      open={open}
      autoHideDuration={6000}
      onClose={onClose}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
    >
      <MuiAlert
        elevation={6}
        variant="filled"
        onClose={onClose}
        severity={severity || "info"}
      >
        {message}
      </MuiAlert>
    </Snackbar>
  );
};

export default Alert;
