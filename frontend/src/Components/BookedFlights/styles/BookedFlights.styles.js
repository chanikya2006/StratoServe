// Extracted styles from BookedFlights.jsx
const styles = {
  container: {
    mt: 4, 
    mb: 4
  },
  mainPaper: {
    p: 3, 
    borderRadius: 2,
    background: 'linear-gradient(to right, #f5f7fa, #e4e7eb)'
  },
  headerBox: {
    display: "flex", 
    justifyContent: "space-between", 
    alignItems: "center", 
    mb: 3,
    pb: 2,
    borderBottom: "1px solid #e0e0e0"
  },
  titleBox: {
    display: "flex", 
    alignItems: "center"
  },
  headerIcon: {
    mr: 1, 
    color: '#1976d2', 
    fontSize: 30
  },
  headerTitle: {
    fontWeight: "bold", 
    color: "#1976d2"
  },
  backButton: {
    borderRadius: 2
  },
  sectionTitle: {
    mb: 3, 
    fontWeight: "medium",
    color: '#424242'
  },
  loadingBox: {
    display: "flex", 
    justifyContent: "center", 
    my: 5
  },
  noFlightsPaper: {
    p: 4, 
    textAlign: 'center',
    borderRadius: 2,
    backgroundColor: '#f5f5f5'
  },
  bookingCard: {
    borderRadius: 2,
    transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
    '&:hover': {
      transform: 'translateY(-4px)',
      boxShadow: '0 8px 16px rgba(0,0,0,0.1)'
    }
  },
  bookingHeader: {
    p: 1, 
    mb: 2, 
    display: "flex", 
    justifyContent: "space-between",
    alignItems: "center",
    bgcolor: "#f0f7ff",
    borderRadius: 1
  },
  chipLabel: {
    fontWeight: 'bold'
  },
  detailsPaper: {
    p: 2, 
    bgcolor: '#f8f9fa',
    borderRadius: 2,
    height: '100%'
  },
  sectionHeader: {
    display: 'flex', 
    alignItems: 'center', 
    mb: 2
  },
  infoIcon: {
    mr: 1
  },
  flightRouteBox: {
    display: "flex", 
    justifyContent: "space-between", 
    mb: 2
  },
  routeEndpoint: {
    textAlign: "center"
  },
  routeConnector: {
    display: "flex", 
    alignItems: "center", 
    px: 2
  },
  routeDivider: {
    width: '50px'
  },
  flightIcon: {
    mx: 1, 
    transform: 'rotate(90deg)'
  },
  timingBox: {
    display: "flex", 
    justifyContent: "space-between"
  },
  passengerGrid: {
    display: "flex", 
    flexWrap: "wrap", 
    gap: 1, 
    mt: 1
  },
  cardActions: {
    justifyContent: 'flex-end', 
    p: 2
  },
  cancelButton: {
    borderRadius: 2
  },
  dialogTitle: {
    bgcolor: '#f44336', 
    color: 'white'
  },
  dialogContent: {
    mt: 2
  },
  dialogDivider: {
    my: 2
  },
  textField: {
    mb: 2
  }
};

export default styles; 