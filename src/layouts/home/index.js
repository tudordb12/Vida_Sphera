import React from 'react';
import { Container, Grid } from '@mui/material';
import Sidebar from 'components/Sidebar'; // Assuming you have a Sidebar component
import Header from 'components/Header';

const NewPage = () => {
  return (
    <div>
      <Sidebar />
      <Header />
      <Container>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <h1>New Page</h1>
            <p>This is your new page layout.</p>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default NewPage;