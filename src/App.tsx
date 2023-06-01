import {Box} from "@mui/material";
import RegistrationForm from "./RegistrationForm";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

function App() {
  return (
    <Box sx={{marginY: "40px"}}>
      <Typography variant="h3" sx={{textAlign: "center"}}>
        Form validation with Zod and React hook form
      </Typography>
      <Container maxWidth="xs" sx={{marginTop: "40px"}}>
        <RegistrationForm />
      </Container>
    </Box>
  );
}

export default App;
