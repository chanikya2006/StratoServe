import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemText,
  Divider,
  CircularProgress,
  Button,
  Container,
  Grid,
  Card,
  CardContent,
  CardActions,
  Chip,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Tooltip
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import FlightLandIcon from '@mui/icons-material/FlightLand';
import CancelIcon from '@mui/icons-material/Cancel';
import PersonIcon from '@mui/icons-material/Person';
import AirlineSeatReclineNormalIcon from '@mui/icons-material/AirlineSeatReclineNormal';
import { useNavigate } from 'react-router-dom';
import styles from './styles/BookedFlights.styles';

const BookedFlights = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCancelDialog, setShowCancelDialog] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [cancelReason, setCancelReason] = useState('');
  const user = JSON.parse(localStorage.getItem('user'));
  const navigate = useNavigate();

  const handleOpenCancelDialog = (booking) => {
    setSelectedBooking(booking);
    setShowCancelDialog(true);
  };

  const handleCloseCancelDialog = () => {
    setShowCancelDialog(false);
    setSelectedBooking(null);
    setCancelReason('');
  };

  const handleCancelBooking = async () => {
    try {
      const res = await fetch('http://localhost:5000/request-cancellation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ bookingId: selectedBooking.bookingId, reason: cancelReason })
      });

      const data = await res.json();
      if (data.success) {
        alert(`Cancellation requested for booking ID: ${selectedBooking.bookingId}`);
        handleCloseCancelDialog();
        navigate('/dashboard');
      } else {
        alert(data.message || 'Failed to request cancellation.');
      }
    } catch (error) {
      console.error('Error requesting cancellation:', error);
      alert('Something went wrong.');
    }
  };

  useEffect(() => {
    if (!user) {
      navigate('/');
      return;
    }

    const fetchBookedFlights = async () => {
      try {
        const res = await fetch('http://localhost:5000/booked-flights', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ username: user.username })
        });

        const data = await res.json();
        setBookings(data.bookings || []);
      } catch (error) {
        console.error('Error fetching booked flights:', error);
        setBookings([]);
      } finally {
        setLoading(false);
      }
    };

    fetchBookedFlights();
  }, [user, navigate]);

  return (
    <Container maxWidth="lg" sx={styles.container}>
      <Paper 
        elevation={3} 
        sx={styles.mainPaper}
      >
        <Box 
          display="flex" 
          justifyContent="space-between" 
          alignItems="center" 
          mb={3}
          pb={2}
          borderBottom="1px solid #e0e0e0"
          sx={styles.headerBox}
        >
          <Box display="flex" alignItems="center" sx={styles.titleBox}>
            <FlightTakeoffIcon sx={styles.headerIcon} />
            <Typography variant="h4" sx={styles.headerTitle}>
              Booked Flights
            </Typography>
          </Box>
          <Button 
            variant="contained" 
            color="primary"
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate('/dashboard')}
            sx={styles.backButton}
          >
            Back
          </Button>
        </Box>

        <Typography 
          variant="h5" 
          sx={styles.sectionTitle}
        >
          Passenger Booking Records
        </Typography>

        {loading ? (
          <Box sx={styles.loadingBox}>
            <CircularProgress size={60} thickness={4} />
          </Box>
        ) : bookings.length === 0 ? (
          <Paper 
            elevation={1} 
            sx={styles.noFlightsPaper}
          >
            <Typography variant="h6" color="text.secondary">No upcoming flights found in the system.</Typography>
          </Paper>
        ) : (
          <Grid container spacing={3}>
            {bookings.map((booking, index) => (
              <Grid item xs={12} key={index}>
                <Card 
                  elevation={2} 
                  sx={styles.bookingCard}
                >
                  <CardContent>
                    <Box 
                      sx={styles.bookingHeader}
                    >
                      <Typography variant="h6" fontWeight="bold">
                        Booking ID: <Chip label={booking.bookingId} color="primary" size="small" />
                      </Typography>
                      <Chip 
                        label="Active" 
                        color="success" 
                        size="small"
                        sx={styles.chipLabel}
                      />
                    </Box>

                    <Grid container spacing={3}>
                      {/* Flight Details */}
                      <Grid item xs={12} md={6}>
                        <Paper 
                          elevation={0} 
                          sx={styles.detailsPaper}
                        >
                          <Typography 
                            variant="subtitle1" 
                            fontWeight="bold" 
                            color="primary"
                            sx={styles.sectionHeader}
                          >
                            <FlightTakeoffIcon sx={styles.infoIcon} /> Flight Information
                          </Typography>
                          
                          <Box display="flex" alignItems="center" mb={1}>
                            <Typography fontWeight="bold" mr={1}>Flight:</Typography>
                            <Chip 
                              label={booking.flightNumber} 
                              size="small" 
                              color="default"
                              sx={styles.chipLabel}
                            />
                          </Box>
                          
                          <Box sx={styles.flightRouteBox}>
                            <Box sx={styles.routeEndpoint}>
                              <Typography color="text.secondary">From</Typography>
                              <Typography variant="h6" fontWeight="medium">{booking.from}</Typography>
                            </Box>
                            
                            <Box sx={styles.routeConnector}>
                              <Divider orientation="horizontal" flexItem sx={styles.routeDivider} />
                              <FlightTakeoffIcon color="primary" sx={{ ...styles.flightIcon, transform: 'rotate(0deg)' }} />
                              <Divider orientation="horizontal" flexItem sx={styles.routeDivider} />
                            </Box>
                            
                            <Box sx={styles.routeEndpoint}>
                              <Typography color="text.secondary">To</Typography>
                              <Typography variant="h6" fontWeight="medium">{booking.to}</Typography>
                            </Box>
                          </Box>
                          
                          <Box sx={styles.timingBox}>
                            <Box>
                              <Typography color="text.secondary" variant="body2">Departure</Typography>
                              <Typography fontWeight="medium">{booking.arrivalTime}</Typography>
                            </Box>
                            <Box>
                              <Typography color="text.secondary" variant="body2">Arrival</Typography>
                              <Typography fontWeight="medium">{booking.departureTime}</Typography>
                            </Box>
                          </Box>
                          
                          <Box mt={2}>
                            <Typography color="text.secondary" variant="body2">Flight Date</Typography>
                            <Typography fontWeight="medium">{booking.date || 'Not specified'}</Typography>
                          </Box>
                        </Paper>
                      </Grid>
                      
                      {/* Passenger Info */}
                      <Grid item xs={12} md={6}>
                        <Paper 
                          elevation={0} 
                          sx={styles.detailsPaper}
                        >
                          <Typography 
                            variant="subtitle1" 
                            fontWeight="bold" 
                            color="primary"
                            sx={styles.sectionHeader}
                          >
                            <PersonIcon sx={styles.infoIcon} /> Contact Information
                          </Typography>
                          
                          <Box mb={2}>
                            <Typography fontWeight="bold">Full Name:</Typography>
                            <Typography>{booking.generalinfo.fullName}</Typography>
                          </Box>
                          
                          <Box mb={2}>
                            <Typography fontWeight="bold">Email:</Typography>
                            <Typography>{booking.generalinfo.email}</Typography>
                          </Box>
                          
                          <Box>
                            <Typography fontWeight="bold">Phone:</Typography>
                            <Typography>{booking.generalinfo.phone}</Typography>
                          </Box>
                        </Paper>
                      </Grid>
                      
                      {/* Passenger Details */}
                      <Grid item xs={12}>
                        <Paper 
                          elevation={0} 
                          sx={styles.detailsPaper}
                        >
                          <Typography 
                            variant="subtitle1" 
                            fontWeight="bold" 
                            color="primary"
                            sx={styles.sectionHeader}
                          >
                            <PersonIcon sx={styles.infoIcon} /> Passenger Details ({booking.passengers.length})
                          </Typography>
                          
                          <Grid container spacing={2}>
                            {booking.passengers.map((passenger, idx) => (
                              <Grid item xs={12} sm={6} md={4} key={idx}>
                                <Card variant="outlined" sx={{ borderRadius: 2 }}>
                                  <CardContent>
                                    <Typography fontWeight="bold">
                                      Passenger {idx + 1}: {passenger.fullName}
                                    </Typography>
                                    <Typography variant="body2">Passport: {passenger.passportNumber}</Typography>
                                    <Typography variant="body2">DOB: {passenger.dob}</Typography>
                                    <Box display="flex" alignItems="center" mt={1}>
                                      <AirlineSeatReclineNormalIcon fontSize="small" sx={styles.infoIcon} />
                                      <Typography variant="body2" fontWeight="medium">
                                        Seat: {passenger.seatAllocation}
                                      </Typography>
                                    </Box>
                                  </CardContent>
                                </Card>
                              </Grid>
                            ))}
                          </Grid>
                          
                          <Box mt={2}>
                            <Typography fontWeight="bold" sx={{ display: 'flex', alignItems: 'center' }}>
                              <AirlineSeatReclineNormalIcon fontSize="small" sx={styles.infoIcon} />
                              Allocated Seats:
                            </Typography>
                            <Box sx={styles.passengerGrid}>
                              {booking.allocatedSeats.map((seat, idx) => (
                                <Chip 
                                  key={idx} 
                                  label={seat} 
                                  size="small" 
                                  color="info"
                                  variant="outlined"
                                />
                              ))}
                            </Box>
                          </Box>
                        </Paper>
                      </Grid>
                    </Grid>
                  </CardContent>
                  
                  <CardActions sx={styles.cardActions}>
                    <Button
                      variant="contained"
                      color="error"
                      startIcon={<CancelIcon />}
                      onClick={() => handleOpenCancelDialog(booking)}
                      sx={styles.cancelButton}
                    >
                      Cancel Booking
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Paper>

      {/* Cancellation Dialog */}
      <Dialog open={showCancelDialog} onClose={handleCloseCancelDialog} maxWidth="sm" fullWidth>
        <DialogTitle sx={styles.dialogTitle}>
          Request Booking Cancellation
        </DialogTitle>
        <DialogContent sx={styles.dialogContent}>
          {selectedBooking && (
            <>
              <Typography variant="subtitle1" mb={1}>
                Flight: <strong>{selectedBooking.flightNumber}</strong> | Booking ID: <strong>{selectedBooking.bookingId}</strong>
              </Typography>
              <Typography variant="body2" mb={2}>
                From <strong>{selectedBooking.from}</strong> to <strong>{selectedBooking.to}</strong> on <strong>{selectedBooking.departureTime}</strong>
              </Typography>
              <Divider sx={styles.dialogDivider} />
            </>
          )}
          <Typography mb={2}>Please provide the reason for this cancellation request:</Typography>
          <TextField
            autoFocus
            multiline
            rows={4}
            fullWidth
            variant="outlined"
            placeholder="Enter your reason here..."
            value={cancelReason}
            onChange={(e) => setCancelReason(e.target.value)}
            sx={styles.textField}
          />
          <Typography variant="caption" color="text.secondary" mt={1} display="block">
            Submitting this form will create a cancellation request. Refunds are subject to airline policy.
          </Typography>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={handleCloseCancelDialog} variant="outlined">
            Cancel
          </Button>
          <Button 
            onClick={handleCancelBooking} 
            variant="contained" 
            color="error"
            disabled={!cancelReason.trim()}
          >
            Submit Request
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default BookedFlights;
