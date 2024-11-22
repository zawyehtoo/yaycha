import { Box, Button, TextField, Typography, Alert } from "@mui/material";

import { postUser } from "../libs/fetcher";
import { useApp } from "../ThemeApp";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "react-query";

export default function Register() {
  const { setGlobalMsg } = useApp();
  const nameInput = useRef();
  const usernameInput = useRef();
  const bioInput = useRef();
  const passwordInput = useRef();

  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = () => {
    const name = nameInput.current.value;
    const username = usernameInput.current.value;
    const bio = bioInput.current.value;
    const password = passwordInput.current.value;

    if (!name || !username || !password) {
      setError("name, username and password required");
      return false;
    }

    create.mutate({ name, username, bio, password });
  };

  const create = useMutation(async (data) => postUser(data), {
    onError: async () => {
      setError("Cannot create account");
    },
    onSuccess: async user => {
      setGlobalMsg("account created");
      navigate("/login");
    },
  });
  return (
    <Box>
      <Typography variant="h3">Register</Typography>

      {error && (
        <Alert severity="warning" sx={{ mt: 2 }}>
          {error}
        </Alert>
      )}

      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 1,
            mt: 2,
          }}
        >
          <TextField placeholder="Name" fullWidth inputRef={nameInput} />
          <TextField
            placeholder="Username"
            fullWidth
            inputRef={usernameInput}
          />
          <TextField placeholder="Bio" fullWidth inputRef={bioInput} />
          <TextField
            type="password"
            placeholder="Password"
            fullWidth
            inputRef={passwordInput}
          />
          <Button type="submit" variant="contained" fullWidth>
            Register
          </Button>
        </Box>
      </form>
    </Box>
  );
}
