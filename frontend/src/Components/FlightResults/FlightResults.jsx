import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { 
    Paper, 
    Typography, 
    Grid, 
    Button, 
    Container, 
    Box, 
    Divider, 
    Chip,
    Card,
    CardContent
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import FlightLandIcon from '@mui/icons-material/FlightLand';
import AirplanemodeActiveIcon from '@mui/icons-material/AirplanemodeActive';
import EventIcon from '@mui/icons-material/Event';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import EventSeatIcon from '@mui/icons-material/EventSeat';
import './FlightResults.css';

const FlightResults = () => {
    const { state } = useLocation();
    const flights = state?.flights || [];
    const navigate = useNavigate();
    const searchParams = state?.searchParams || {}; 

    const formatDate = (dateString) => {
        try {
            const date = new Date(dateString);
            return date.toLocaleDateString('en-US', { 
                weekday: 'short', 
                month: 'short', 
                day: 'numeric', 
                year: 'numeric' 
            });
        } catch (e) {
            return dateString;
        }
    };

    return (
        <Container className="flight-results-container">
            <Box className="header-section">
                <Box className="header-top">
                    <Typography variant="h4" className="page-title">
                        <AirplanemodeActiveIcon className="title-icon" />
                        Matching Flights
                    </Typography>
                    
                    <Button
                        variant="outlined"
                        startIcon={<ArrowBackIcon sx={{ color: '#1565c0' }} />}
                        onClick={() => navigate('/searchflights')}
                        className="back-button"
                        sx={{
                            color: '#1565c0',
                            borderColor: '#1565c0',
                            '&:hover': {
                                backgroundColor: 'rgba(21, 101, 192, 0.1)',
                                borderColor: '#1565c0'
                            },
                            '& .MuiButton-startIcon': {
                                color: '#1565c0'
                            }
                        }}
                    >
                        Back
                    </Button>
                </Box>
                
                {searchParams.source && searchParams.destination && (
                    <Box className="search-summary">
                        <Chip 
                            icon={<FlightTakeoffIcon />} 
                            label={searchParams.source} 
                            color="primary" 
                            variant="outlined"
                            className="route-chip"
                        />
                        <Box className="route-line"></Box>
                        <Chip 
                            icon={<FlightLandIcon />} 
                            label={searchParams.destination} 
                            color="primary" 
                            variant="outlined"
                            className="route-chip"
                        />
                        {searchParams.date && (
                            <Chip 
                                icon={<EventIcon />} 
                                label={formatDate(searchParams.date)} 
                                variant="outlined"
                                className="date-chip"
                            />
                        )}
                    </Box>
                )}
            </Box>
            
            <Box className="results-count">
                <Typography variant="subtitle1">
                    {flights.length} {flights.length === 1 ? 'flight' : 'flights'} found
                </Typography>
            </Box>
            
            {flights.length === 0 ? (
                <Card className="no-results-card">
                    <CardContent>
                        <Typography variant="h6" align="center">No flights available for your search criteria.</Typography>
                    </CardContent>
                </Card>
            ) : (
                flights.map((flight, index) => (
                    <Paper key={index} className="flight-card" elevation={3}>
                        <Box className="flight-number-box">
                            <Typography variant="h6" className="flight-number">
                                {flight.flightno}
                            </Typography>
                        </Box>
                        
                        <Grid container spacing={3} className="flight-details">
                            <Grid item xs={12} md={4}>
                                <Box className="route-info">
                                    <Typography variant="h6" className="source-text">{flight.source}</Typography>
                                    <Box className="flight-path">
                                        <Box className="dot source-dot"></Box>
                                        <Box className="flight-line"></Box>
                                        <AirplanemodeActiveIcon className="plane-icon" />
                                        <Box className="flight-line"></Box>
                                        <Box className="dot destination-dot"></Box>
                                    </Box>
                                    <Typography variant="h6" className="destination-text">{flight.destination}</Typography>
                                </Box>
                            </Grid>
                            
                            <Grid item xs={12} md={5}>
                                <Box className="time-info">
                                    <Box className="info-item">
                                        <EventIcon className="info-icon" />
                                        <Typography><strong>Date:</strong> {formatDate(flight.date)}</Typography>
                                    </Box>
                                    <Box className="info-item">
                                        <AccessTimeIcon className="info-icon" />
                                        <Typography><strong>Time:</strong> {flight.start_time} - {flight.end_time}</Typography>
                                    </Box>
                                    <Box className="info-item">
                                        <EventSeatIcon className="info-icon" />
                                        <Typography>
                                            <strong>Available Seats:</strong> 
                                            <Chip 
                                                label={flight.total_seats} 
                                                color={flight.total_seats > 10 ? "success" : "warning"} 
                                                size="small" 
                                                className="seats-chip"
                                            />
                                        </Typography>
                                    </Box>
                                </Box>
                            </Grid>
                            
                            <Grid item xs={12} md={3} className="action-section">
                                <Button 
                                    variant="contained"
                                    className="book-button"
                                    onClick={() => {
                                        localStorage.setItem("selectedFlight", JSON.stringify(flight));
                                        navigate('/bookingpage');
                                    }}
                                >
                                    Book Now
                                </Button>
                            </Grid>
                        </Grid>
                    </Paper>
                ))
            )}
        </Container>
    );
};

export default FlightResults;
