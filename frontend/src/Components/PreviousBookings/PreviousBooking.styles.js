// Extracted styles from PreviousBooking.css
const styles = {
  container: {
    padding: 3,
    maxWidth: '1200px',
    margin: '0 auto',
    minHeight: '100vh',
    background: 'linear-gradient(to right, #f5f7fa, #e4e7eb)',
    boxShadow: '0 0 20px rgba(0, 0, 0, 0.1)',
    borderRadius: '8px',
    overflow: 'hidden'
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    minHeight: '10vh',
    alignItems: 'center',
    mb: 3,
    position: 'sticky',
    top: 0,
    background: 'linear-gradient(to right, #f5f7fa, #e4e7eb)',
    padding: '16px 0',
    zIndex: 100,
    borderBottom: '1px solid rgba(0, 0, 0, 0.08)'
  },
  headerTitle: {
    color: '#1976d2',
    fontWeight: 700,
    m: 0,
    fontSize: '1.8rem',
    textShadow: '0px 1px 1px rgba(0,0,0,0.1)'
  },
  backButton: {
    textTransform: 'none',
    borderRadius: 2,
    padding: '10px 24px !important',
    transition: 'all 0.3s ease',
    position: 'relative',
    zIndex: 2,
    bgcolor: '#1976d2 !important',
    color: 'white',
    border: 'none !important',
    boxShadow: '0 3px 5px rgba(0, 0, 0, 0.2) !important',
    '&:hover': {
      bgcolor: '#1565c0 !important',
      boxShadow: '0 5px 10px rgba(0, 0, 0, 0.3) !important',
      transform: 'translateY(-2px)'
    }
  },
  bookingList: {
    mt: 3,
    display: 'grid',
    gap: 3
  },
  bookingItem: {
    mb: 2,
    borderRadius: 2,
    overflow: 'hidden',
    transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
    boxShadow: '0 4px 8px rgba(0,0,0,0.05)',
    bgcolor: 'white',
    '&:hover': {
      transform: 'translateY(-4px)',
      boxShadow: '0 10px 20px rgba(0,0,0,0.12)'
    }
  },
  bookingHeader: {
    p: 2, 
    mb: 0, 
    display: "flex", 
    justifyContent: "space-between",
    alignItems: "center",
    background: 'linear-gradient(to right, #1976d2, #2196f3)',
    color: 'white',
    borderRadius: '4px 4px 0 0'
  },
  bookingHeaderTitle: {
    fontWeight: 'bold',
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    gap: 1
  },
  statusChip: {
    fontWeight: 'bold',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
  },
  bookingContent: {
    padding: '24px !important'
  },
  flightDetailsSection: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    background: 'rgba(25, 118, 210, 0.05)',
    p: 2,
    borderRadius: 1,
    mb: 2,
    boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.05)'
  },
  routeDisplay: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 1,
    my: 1
  },
  cityCode: {
    fontWeight: 'bold',
    fontSize: '1.1rem',
    color: '#1976d2'
  },
  flightIcon: {
    color: '#1976d2',
    mx: 1
  },
  bookingSection: {
    mb: 3,
    p: 2,
    borderRadius: 1,
    background: 'white',
    boxShadow: '0 1px 3px rgba(0,0,0,0.08)'
  },
  sectionTitle: {
    color: '#1976d2',
    mb: 1.5,
    fontWeight: 600,
    display: 'flex',
    alignItems: 'center',
    gap: 1,
    borderBottom: '1px solid rgba(0,0,0,0.08)',
    pb: 0.5
  },
  sectionText: {
    margin: '8px 0',
    color: '#424242',
    display: 'flex',
    alignItems: 'center'
  },
  sectionLabel: {
    fontWeight: 500,
    minWidth: '150px',
    color: '#666'
  },
  sectionValue: {
    fontWeight: 'normal'
  },
  divider: {
    my: 2,
    bgcolor: 'rgba(0,0,0,0.08)'
  },
  passengerDetails: {
    bgcolor: 'rgba(25, 118, 210, 0.03)',
    padding: 2,
    borderRadius: 1,
    mb: 1.5,
    border: '1px solid rgba(25, 118, 210, 0.1)',
    '&:last-child': {
      mb: 0
    }
  },
  passengerHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    mb: 1,
    pb: 0.5,
    borderBottom: '1px dashed rgba(0,0,0,0.1)'
  },
  loadingContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '300px'
  },
  noBookings: {
    textAlign: 'center',
    padding: 5,
    color: '#666',
    bgcolor: 'white',
    borderRadius: 2,
    boxShadow: '0 4px 8px rgba(0,0,0,0.05)',
    '& p': {
      mt: 2,
      fontWeight: 500
    }
  },
  priceBox: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    mt: 2,
    p: 2,
    borderRadius: 1,
    bgcolor: 'rgba(76, 175, 80, 0.08)',
    border: '1px solid rgba(76, 175, 80, 0.2)'
  },
  priceLabel: {
    fontWeight: 'bold',
    fontSize: '1.1rem',
    color: '#2e7d32'
  },
  // Media queries can be handled through the theme.breakpoints API in Material UI components
  // Example of how to use this in a component:
  // <Box sx={[styles.container, { [theme.breakpoints.down('md')]: styles.containerMobile }]}>
  containerMobile: {
    padding: 2
  },
  headerMobile: {
    flexDirection: 'column',
    gap: 1,
    alignItems: 'flex-start',
    paddingTop: 4
  },
  bookingContentMobile: {
    padding: '16px !important'
  }
};

export default styles; 