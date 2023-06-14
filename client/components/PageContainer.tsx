import { Container, Typography } from '@mui/material';
import * as React from 'react';

const PageContainer = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => {
  return (
    <Container sx={{ padding: 2 }}>
      <Typography variant="h5" component="h2" gutterBottom>
        {title}
      </Typography>
      {children}
    </Container>
  );
};

export default PageContainer;
