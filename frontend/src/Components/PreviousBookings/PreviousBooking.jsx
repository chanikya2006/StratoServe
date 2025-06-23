import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemText,
  Divider,
  Button,
  CircularProgress,
  useTheme,
  useMediaQuery,
  Chip,
  Grid
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import styles from './PreviousBooking.styles';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import FlightLandIcon from '@mui/icons-material/FlightLand';
import FlightIcon from '@mui/icons-material/Flight';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import PersonIcon from '@mui/icons-material/Person';
import EventIcon from '@mui/icons-material/Event';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import AirplaneTicketIcon from '@mui/icons-material/AirplaneTicket';
import GroupIcon from '@mui/icons-material/Group';
import EventSeatIcon from '@mui/icons-material/EventSeat';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import EmojiFlagsIcon from '@mui/icons-material/EmojiFlags';

const PreviousBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = JSON.parse(localStorage.getItem('user'));
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  useEffect(() => {
    if (!user) {
      navigate('/');
      return;
    }

    const fetchBookings = async () => {
      try {
        const res = await fetch(`http://localhost:5000/bookings`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ username: user.username })
        });

        const data = await res.json();

        if (data && Array.isArray(data.bookings)) {
          setBookings(data.bookings);
        } else {
          setBookings([]);
        }
      } catch (error) {
        console.error('Error fetching bookings:', error);
        setBookings([]);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [user, navigate]);

  return (
    <Box sx={[
      styles.container, 
      isMobile && styles.containerMobile
    ]}>
      <Box sx={[
        styles.header,
        isMobile && styles.headerMobile
      ]}>
        <Typography variant="h5" sx={styles.headerTitle}>Previous Flights</Typography>
        <Button
          variant="contained"
          onClick={() => navigate('/dashboard')}
          sx={styles.backButton}
          startIcon={<ArrowBackIcon />}
        >
          Back
        </Button>
      </Box>

      {loading ? (
        <Box sx={styles.loadingContainer}>
          <CircularProgress size={60} thickness={4} />
        </Box>
      ) : bookings.length === 0 ? (
        <Box sx={styles.noBookings}>
          <FlightIcon sx={{ fontSize: 60, color: '#1976d2', opacity: 0.7, mb: 2 }} />
          <Typography variant="h5" gutterBottom>No Previous Bookings</Typography>
          <Typography variant="body1">You haven't booked any flights yet.</Typography>
        </Box>
      ) : (
        <List sx={styles.bookingList}>
          {bookings.map((booking, index) => (
            <React.Fragment key={index}>
              <Paper sx={styles.bookingItem} elevation={3}>
                <Box sx={styles.bookingHeader}>
                  <Typography sx={styles.bookingHeaderTitle}>
                    <ConfirmationNumberIcon sx={{ mr: 1 }} />
                    Booking #{booking.bookingId}
                  </Typography>
                  <Chip 
                    label="Completed" 
                    color="success" 
                    size="small"
                    sx={styles.statusChip}
                  />
                </Box>
                <Box sx={[
                  styles.bookingContent,
                  isMobile && styles.bookingContentMobile
                ]}>
                  <Box sx={styles.flightDetailsSection}>
                    <Box>
                      <Typography variant="body2" color="text.secondary">Flight ID</Typography>
                      <Typography variant="h6">{booking.flightNumber}</Typography>
                    </Box>
                    
                    <Box sx={styles.routeDisplay}>
                      <Box sx={{ textAlign: 'center' }}>
                        <Typography sx={styles.cityCode}>{booking.from}</Typography>
                      </Box>
                      
                      <Typography sx={{ 
                        color: '#1976d2', 
                        fontWeight: 'bold',
                        fontSize: '1.5rem',
                        display: 'flex',
                        alignItems: 'center'
                      }}>
                        →
                      </Typography>
                      
                      <Box sx={{ textAlign: 'center' }}>
                        <Typography sx={styles.cityCode}>{booking.to}</Typography>
                      </Box>
                    </Box>
                    
                    <Box>
                      <Typography variant="body2" color="text.secondary" sx={{ display: 'flex', alignItems: 'center' }}>
                        <AccessTimeIcon fontSize="small" sx={{ mr: 0.5 }} /> Departure
                      </Typography>
                      <Typography variant="body1" fontWeight="medium">{booking.departureTime}</Typography>
                    </Box>
                    
                    <Box>
                      <Typography variant="body2" color="text.secondary" sx={{ display: 'flex', alignItems: 'center' }}>
                        <AccessTimeIcon fontSize="small" sx={{ mr: 0.5 }} /> Arrival
                      </Typography>
                      <Typography variant="body1" fontWeight="medium">{booking.arrivalTime}</Typography>
                    </Box>
                  </Box>

                  <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                      <Box sx={styles.bookingSection}>
                        <Typography variant="h6" sx={styles.sectionTitle}>
                          <PersonIcon /> General Information
                        </Typography>
                        
                        <Box sx={styles.sectionText}>
                          <Typography sx={styles.sectionLabel}>Full Name:</Typography>
                          <Typography sx={styles.sectionValue}>{booking.generalinfo.fullName}</Typography>
                        </Box>
                        
                        <Box sx={styles.sectionText}>
                          <Typography sx={styles.sectionLabel}>
                            <EmailIcon fontSize="small" sx={{ mr: 0.5 }} /> Email:
                          </Typography>
                          <Typography sx={styles.sectionValue}>{booking.generalinfo.email}</Typography>
                        </Box>
                        
                        <Box sx={styles.sectionText}>
                          <Typography sx={styles.sectionLabel}>
                            <PhoneIcon fontSize="small" sx={{ mr: 0.5 }} /> Phone:
                          </Typography>
                          <Typography sx={styles.sectionValue}>{booking.generalinfo.phone}</Typography>
                        </Box>
                      </Box>
                    </Grid>
                    
                    <Grid item xs={12} md={6}>
                      <Box sx={styles.bookingSection}>
                        <Typography variant="h6" sx={styles.sectionTitle}>
                          <EventSeatIcon /> Allocated Seats
                        </Typography>
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 1 }}>
                          {booking.allocatedSeats.map((seat, idx) => (
                            <Chip 
                              key={idx} 
                              label={seat} 
                              color="primary" 
                              variant="outlined" 
                              size="small"
                            />
                          ))}
                        </Box>
                      </Box>
                    </Grid>
                  </Grid>

                  <Box sx={styles.bookingSection}>
                    <Typography variant="h6" sx={styles.sectionTitle}>
                      <GroupIcon /> Passenger Details
                    </Typography>
                    {booking.passengers.map((passenger, idx) => (
                      <Box key={idx} sx={styles.passengerDetails}>
                        <Box sx={styles.passengerHeader}>
                          <Typography variant="subtitle1" fontWeight="medium">
                            <PersonIcon fontSize="small" sx={{ mr: 0.5, verticalAlign: 'text-bottom' }} />
                            Passenger {idx + 1}
                          </Typography>
                          <Chip 
                            label={`Seat ${passenger.seatAllocation}`} 
                            size="small" 
                            color="primary"
                            variant="outlined"
                          />
                        </Box>
                        
                        <Grid container spacing={2}>
                          <Grid item xs={12} sm={6}>
                            <Box sx={styles.sectionText}>
                              <Typography sx={styles.sectionLabel}>Full Name:</Typography>
                              <Typography sx={styles.sectionValue}>{passenger.fullName}</Typography>
                            </Box>
                            
                            <Box sx={styles.sectionText}>
                              <Typography sx={styles.sectionLabel}>
                                <EmojiFlagsIcon fontSize="small" sx={{ mr: 0.5 }} /> Passport:
                              </Typography>
                              <Typography sx={styles.sectionValue}>{passenger.passportNumber}</Typography>
                            </Box>
                          </Grid>
                          
                          <Grid item xs={12} sm={6}>
                            <Box sx={styles.sectionText}>
                              <Typography sx={styles.sectionLabel}>
                                <EventIcon fontSize="small" sx={{ mr: 0.5 }} /> Date of Birth:
                              </Typography>
                              <Typography sx={styles.sectionValue}>{passenger.dob}</Typography>
                            </Box>
                          </Grid>
                        </Grid>
                      </Box>
                    ))}
                  </Box>

                  <Box sx={styles.priceBox}>
                    <Typography variant="h6" sx={styles.priceLabel}>
                      <AttachMoneyIcon sx={{ verticalAlign: 'middle', mr: 0.5 }} />
                      Total Price: ₹{booking.totalPrice}
                    </Typography>
                  </Box>
                </Box>
              </Paper>
            </React.Fragment>
          ))}
        </List>
      )}
    </Box>
  );
};

export default PreviousBookings;
