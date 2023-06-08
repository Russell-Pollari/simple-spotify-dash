import React, { useState, useEffect } from "react";

import { Container, Typography, Box, Button } from "@mui/material";

const Login = () => {
  const [authUrl, setAuthurl] = useState(null);

  useEffect(() => {
    fetch("/api/auth-url")
      .then((res) => res.json())
      .then((data) => {
        setAuthurl(data.url);
      });
  }, []);

  return (
    <Container>
      <Box>
        <Button href={authUrl}>Connect with Spotify</Button>
      </Box>
    </Container>
  );
};

export default Login;
