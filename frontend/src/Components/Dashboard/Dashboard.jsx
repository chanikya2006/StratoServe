import React, { useState } from 'react';
import {
    Box,
    Drawer,
    List,
    Typography,
    Divider,
    IconButton,
    ListItem,
    ListItemIcon,
    ListItemText,
    Avatar,
    useTheme,
    useMediaQuery,
    AppBar,
    Toolbar,
    Card,
    CardContent,
    Grid,
    Button,
    Paper,
    Fab,
    CardMedia,
    CardActionArea,
} from '@mui/material';
import {
    Menu as MenuIcon,
    Flight as FlightIcon,
    History as HistoryIcon,
    Person as PersonIcon,
    Search as SearchIcon,
    Logout as LogoutIcon,
    ArrowForward as ArrowForwardIcon,
    LocationOn as LocationIcon,
    LocalOffer as OfferIcon,
    SmartToy as AIIcon,
} from '@mui/icons-material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import './Dashboard.css';
import { useNavigate } from 'react-router-dom';

// Import images
import IndiaGate from '../Assets/India Gate.jpg';
import GatewayOfIndia from '../Assets/gateway-of-india.jpeg';
import VidhanaSoudha from '../Assets/Vidhana Soudha.jpg';
import VictoriaMemorial from '../Assets/Victoria_Memorial.jpg';

const drawerWidth = 280;

const Dashboard = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const [mobileOpen, setMobileOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState('');

    const user = JSON.parse(localStorage.getItem('user'));
    const navigate = useNavigate();

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const handleNavigation = (path) => {
        setSelectedItem(path);
        navigate(path);
        if (isMobile) {
            setMobileOpen(false);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('user');
        navigate('/');
    };

    const handleAIClick = () => {
        navigate('/aiagent');
    };

    const menuItems = [
        { path: '/profile', icon: <PersonIcon />, text: 'Profile' },
        { path: '/searchflights', icon: <SearchIcon />, text: 'Search Flights' },
        { path: '/booked-flights', icon: <FlightIcon />, text: 'Booked Flights' },
        { path: '/previous-bookings', icon: <HistoryIcon />, text: 'Previous Bookings' },
        { path: '/notifications', icon: <NotificationsIcon />, text: 'Notifications' },
    ];

    const drawer = (
        <div>
            <Box className="user-profile">
                <Avatar className="avatar">
                    {user?.username?.[0]?.toUpperCase() || 'U'}
                </Avatar>
                <Box>
                    <Typography variant="h6" className="username">{user?.username || 'User'}</Typography>
                    <Typography variant="body2" className="user-email">
                        {user?.email || 'user@example.com'}
                    </Typography>
                </Box>
            </Box>
            <Divider />
            <List>
                {menuItems.map((item) => (
                    <ListItem
                        button
                        key={item.path}
                        onClick={() => handleNavigation(item.path)}
                        selected={selectedItem === item.path}
                        className="menu-item"
                    >
                        <ListItemIcon className="menu-icon">{item.icon}</ListItemIcon>
                        <ListItemText primary={item.text} className="menu-text" />
                    </ListItem>
                ))}
                <ListItem button onClick={handleLogout} className="menu-item logout">
                    <ListItemIcon className="menu-icon"><LogoutIcon /></ListItemIcon>
                    <ListItemText primary="Logout" className="menu-text" />
                </ListItem>
            </List>
        </div>
    );

    return (
        <Box className="dashboard">
            <AppBar
                position="fixed"
                className="app-bar"
                sx={{
                    width: { sm: `calc(100% - ${drawerWidth}px)` },
                    ml: { sm: `${drawerWidth}px` },
                    display: { sm: 'none' },
                }}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2 }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap component="div">
                        Airline Dashboard
                    </Typography>
                </Toolbar>
            </AppBar>

            <Drawer
                variant="temporary"
                open={mobileOpen}
                onClose={handleDrawerToggle}
                ModalProps={{
                    keepMounted: true,
                }}
                sx={{
                    display: { xs: 'block', sm: 'none' },
                    '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                }}
            >
                {drawer}
            </Drawer>

            <Drawer
                variant="permanent"
                sx={{
                    display: { xs: 'none', sm: 'block' },
                    '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                }}
                open
            >
                {drawer}
            </Drawer>

            <Box
                component="main"
                className="main-content"
                sx={{
                    flexGrow: 1,
                    p: 3,
                    width: { sm: `calc(100% - ${drawerWidth}px)` },
                    ml: { sm: `${drawerWidth}px` },
                    mt: { xs: 8, sm: 0 },
                }}
            >
                <Box className="welcome-section">
                    <Typography variant="h4" component="h1" className="welcome-title">
                        Welcome back, {user?.username || 'User'}! ✈️
                    </Typography>
                    <Typography variant="subtitle1" className="welcome-subtitle">
                        Here's what's happening with your flights today
                    </Typography>
                </Box>

                <Grid container spacing={3} className="dashboard-grid">
                    <Grid item xs={12} md={6}>
                        <Card className="dashboard-card about-airline">
                            <CardContent>
                                <Typography variant="h6" className="card-title">
                                    About StratoServe Airways
                                </Typography>
                                <Box className="airline-content">
                                    <Typography variant="body1" className="airline-description">
                                        StratoServe Airways is a premier airline committed to providing exceptional service and comfort to our passengers. With a fleet of modern aircraft and a team of experienced professionals, we ensure a safe and enjoyable journey for all our customers.
                                    </Typography>
                                    <Box className="airline-stats">
                                        <Box className="stat-item">
                                            <Typography variant="h4" className="stat-number">50+</Typography>
                                            <Typography variant="body2" className="stat-label">Destinations</Typography>
                                        </Box>
                                        <Box className="stat-item">
                                            <Typography variant="h4" className="stat-number">100+</Typography>
                                            <Typography variant="body2" className="stat-label">Daily Flights</Typography>
                                        </Box>
                                        <Box className="stat-item">
                                            <Typography variant="h4" className="stat-number">1M+</Typography>
                                            <Typography variant="body2" className="stat-label">Happy Passengers</Typography>
                                        </Box>
                                    </Box>
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <Card className="dashboard-card destinations">
                            <CardContent>
                                <Typography variant="h6" className="card-title">
                                    Popular Destinations
                                </Typography>
                                <Box className="destinations-list" sx={{ 
                                    display: 'flex', 
                                    flexDirection: { xs: 'column', sm: 'row' },
                                    gap: 2,
                                    flexWrap: 'wrap',
                                    justifyContent: 'space-between',
                                    py: 1
                                }}>
                                    <Card elevation={3} sx={{ 
                                        width: { xs: '100%', sm: '48%', md: '23%' }, 
                                        mb: { xs: 2, sm: 2 } 
                                    }}>
                                        <CardActionArea>
                                            <CardMedia
                                                component="img"
                                                height={200}
                                                image={IndiaGate}
                                                alt="India Gate"
                                                sx={{ objectFit: 'cover' }}
                                            />
                                            <CardContent>
                                                <Typography variant="subtitle1" fontWeight="bold">India Gate, Delhi</Typography>
                                                <Typography variant="body2" color="text.secondary">
                                                    Starting from ₹4,999
                                                </Typography>
                                            </CardContent>
                                        </CardActionArea>
                                    </Card>
                                    
                                    <Card elevation={3} sx={{ 
                                        width: { xs: '100%', sm: '48%', md: '23%' }, 
                                        mb: { xs: 2, sm: 2 } 
                                    }}>
                                        <CardActionArea>
                                            <CardMedia
                                                component="img"
                                                height={200}
                                                image={GatewayOfIndia}
                                                alt="Gateway of India"
                                                sx={{ objectFit: 'cover' }}
                                            />
                                            <CardContent>
                                                <Typography variant="subtitle1" fontWeight="bold">Gateway of India, Mumbai</Typography>
                                                <Typography variant="body2" color="text.secondary">
                                                    Starting from ₹5,499
                                                </Typography>
                                            </CardContent>
                                        </CardActionArea>
                                    </Card>
                                    
                                    <Card elevation={3} sx={{ 
                                        width: { xs: '100%', sm: '48%', md: '23%' }, 
                                        mb: { xs: 2, sm: 2 } 
                                    }}>
                                        <CardActionArea>
                                            <CardMedia
                                                component="img"
                                                height={200}
                                                image={VidhanaSoudha}
                                                alt="Vidhana Soudha"
                                                sx={{ objectFit: 'cover' }}
                                            />
                                            <CardContent>
                                                <Typography variant="subtitle1" fontWeight="bold">Vidhana Soudha, Bangalore</Typography>
                                                <Typography variant="body2" color="text.secondary">
                                                    Starting from ₹6,299
                                                </Typography>
                                            </CardContent>
                                        </CardActionArea>
                                    </Card>
                                    
                                    <Card elevation={3} sx={{ 
                                        width: { xs: '100%', sm: '48%', md: '23%' }, 
                                        mb: { xs: 2, sm: 2 } 
                                    }}>
                                        <CardActionArea>
                                            <CardMedia
                                                component="img"
                                                height={200}
                                                image={VictoriaMemorial}
                                                alt="Victoria Memorial"
                                                sx={{ objectFit: 'cover' }}
                                            />
                                            <CardContent>
                                                <Typography variant="subtitle1" fontWeight="bold">Victoria Memorial, Kolkata</Typography>
                                                <Typography variant="body2" color="text.secondary">
                                                    Starting from ₹5,799
                                                </Typography>
                                            </CardContent>
                                        </CardActionArea>
                                    </Card>
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>

                    <Grid item xs={12}>
                        <Card className="dashboard-card deals">
                            <CardContent>
                                <Box className="deals-header">
                                    <Typography variant="h6" className="card-title">
                                        Recent Flights
                                    </Typography>
                                    <Button
                                        endIcon={<ArrowForwardIcon />}
                                        onClick={() => handleNavigation('/searchflights')}
                                        className="view-all-button"
                                    >
                                        View All
                                    </Button>
                                </Box>
                                <Grid container spacing={2} className="deals-grid">
                                    <Grid item xs={12} sm={6} md={3}>
                                        <Paper className="deal-card">
                                            <CardContent>
                                                <Typography variant="subtitle1" className="deal-route">Mumbai → Delhi</Typography>
                                                <Typography variant="h6" className="deal-price">₹4,999</Typography>
                                                <Typography variant="body2" className="deal-type">One way</Typography>
                                            </CardContent>
                                        </Paper>
                                    </Grid>
                                    <Grid item xs={12} sm={6} md={3}>
                                        <Paper className="deal-card">
                                            <CardContent>
                                                <Typography variant="subtitle1" className="deal-route">Delhi → Bangalore</Typography>
                                                <Typography variant="h6" className="deal-price">₹5,499</Typography>
                                                <Typography variant="body2" className="deal-type">One way</Typography>
                                            </CardContent>
                                        </Paper>
                                    </Grid>
                                    <Grid item xs={12} sm={6} md={3}>
                                        <Paper className="deal-card">
                                            <CardContent>
                                                <Typography variant="subtitle1" className="deal-route">Chennai → Kolkata</Typography>
                                                <Typography variant="h6" className="deal-price">₹4,299</Typography>
                                                <Typography variant="body2" className="deal-type">One way</Typography>
                                            </CardContent>
                                        </Paper>
                                    </Grid>
                                    <Grid item xs={12} sm={6} md={3}>
                                        <Paper className="deal-card">
                                            <CardContent>
                                                <Typography variant="subtitle1" className="deal-route">Hyderabad → Mumbai</Typography>
                                                <Typography variant="h6" className="deal-price">₹3,999</Typography>
                                                <Typography variant="body2" className="deal-type">One way</Typography>
                                            </CardContent>
                                        </Paper>
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Box>

            <Fab
                color="primary"
                aria-label="AI Assistant"
                className="ai-floating-button"
                onClick={handleAIClick}
            >
                <AIIcon />
            </Fab>
        </Box>
    );
};

export default Dashboard;
