import React from 'react';
import { Box, Typography, Grid, Paper, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    const navigate = useNavigate();
    return (
        <Box p={3}>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                <Typography variant="h5">Profile Information</Typography>
                <Button variant="outlined" onClick={() => navigate('/dashboard')}>
                    Back
                </Button>
            </Box>

            <Paper elevation={3} style={{ padding: '20px' }}>
                <Grid container spacing={2} mt={1}>
                    <Grid item xs={12}>
                        <Typography><strong>Username:</strong> {user?.username}</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography><strong>Email:</strong> {user?.email}</Typography>
                    </Grid>
                </Grid>
            </Paper>
        </Box>
    );
};

export default Profile;
