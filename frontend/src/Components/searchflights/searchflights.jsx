import React, { useState } from 'react';
import {
    Box, Paper, Typography, Grid, TextField, Button,
    FormControl, InputLabel, Select, MenuItem, IconButton
} from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const SearchFlights = () => {
    const [searchForm, setSearchForm] = useState({
        fromCity: '',
        toCity: '',
        departureDate: '',
        passengers: '1',
        class: '',
        starttime: ''
    });

    const navigate = useNavigate();
    
    // List of Indian cities for dropdowns
    const cities = [
        'MUMBAI', 'DELHI', 'KOLKATA', 'BENGALURU', 'CHENNAI', 
        'GUWAHATI', 'AHMEDABAD', 'PUNE', 'PATNA', 'HYDERABAD', 
        'JAIPUR', 'LUCKNOW', 'NAGPUR', 'THIRUVANANTHAPURAM', 'MOPA', 
        'TIRUCHIRAPPALLI', 'MANGALORE', 'RANCHI', 'PORT BLAIR', 'SURAT', 
        'COIMBATORE', 'BHOPAL', 'RAJAHMUNDRY', 'VIJAYAWADA', 'VISAKHAPATNAM', 
        'KOCHI', 'BHUBANESHWAR', 'AMRITSAR', 'CHANDIGARH', 'INDORE', 
        'GOA', 'AURANGABAD', 'VADODARA', 'MADURAI', 'SRINAGAR'
    ];

    const handleSearchChange = (e) => {
        const { name, value } = e.target;
        setSearchForm(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSearchSubmit = async (e) => {
        e.preventDefault();

        const fromCity = searchForm.fromCity.trim();
        const toCity = searchForm.toCity.trim();

        if (!fromCity || !toCity) {
            alert('Please select both departure and arrival cities');
            return;
        }

        try {
            const queryParams = new URLSearchParams();
            queryParams.append('fromCity', fromCity);
            queryParams.append('toCity', toCity);
            if (searchForm.departureDate) queryParams.append('departureDate', searchForm.departureDate);
            if (searchForm.starttime) queryParams.append('starttime', searchForm.starttime);
            if (searchForm.passengers) queryParams.append('passengers', searchForm.passengers);
            if (searchForm.class) queryParams.append('class', searchForm.class);

            const res = await fetch(`http://localhost:5000/flights?${queryParams.toString()}`);
            const data = await res.json();

            if (data.flights?.length > 0) {
                navigate('/results', { state: { flights: data.flights } });
            } else {
                alert('No flights found matching your criteria.');
            }
        } catch (err) {
            console.error('Error fetching flights:', err);
            alert('Error occurred while searching for flights.');
        }
    };

    // Custom styles for the select dropdowns
    const selectStyles = {
        minWidth: '120px',
        '& .MuiSelect-select': {
            fontSize: '16px',
            minHeight: '40px',
            padding: '17px' 
        }
    };

    // Custom styles for the input labels
    const labelStyles = {
        width: 'auto',
        textAlign: 'left',
        whiteSpace: 'nowrap',
        overflow: 'visible',
        transform: 'translate(14px, -9px) scale(0.75)',
        transformOrigin: 'top left'
    };

    return (
        <Box p={3}>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                <Typography variant="h5">Search Flights</Typography>
                <Button variant="outlined" onClick={() => navigate('/dashboard')}>
                    Back
                </Button>
            </Box>

            <Paper elevation={3} style={{ padding: '20px' }}>
                <Box component="form" onSubmit={handleSearchSubmit}>
                    <Grid container spacing={2}>
                        {/* From City Dropdown */}
                        <Grid item xs={12} sm={6}>
                            <FormControl fullWidth>
                                <InputLabel shrink id="from-city-label" sx={labelStyles}>
                                    From
                                </InputLabel>
                                <Select
                                    labelId="from-city-label"
                                    name="fromCity"
                                    value={searchForm.fromCity}
                                    onChange={handleSearchChange}
                                    displayEmpty
                                    notched
                                    sx={selectStyles}
                                >
                                    <MenuItem value="" disabled>
                                        Select departure city
                                    </MenuItem>
                                    {cities.map((city) => (
                                        <MenuItem key={`from-${city}`} value={city}>
                                            {city}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        
                        {/* To City Dropdown */}
                        <Grid item xs={12} sm={6}>
                            <FormControl fullWidth>
                                <InputLabel shrink id="to-city-label" sx={labelStyles}>
                                    To
                                </InputLabel>
                                <Select
                                    labelId="to-city-label"
                                    name="toCity"
                                    value={searchForm.toCity}
                                    onChange={handleSearchChange}
                                    displayEmpty
                                    notched
                                    sx={selectStyles}
                                >
                                    <MenuItem value="" disabled>
                                        Select arrival city
                                    </MenuItem>
                                    {cities.map((city) => (
                                        <MenuItem key={`to-${city}`} value={city}>
                                            {city}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        
                        <Grid item xs={12} sm={6}>
                            <TextField 
                                label="Departure Date" 
                                name="departureDate" 
                                type="date" 
                                value={searchForm.departureDate} 
                                onChange={handleSearchChange} 
                                fullWidth 
                                InputLabelProps={{ shrink: true }} 
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField 
                                label="Start Time" 
                                name="starttime" 
                                type="time" 
                                value={searchForm.starttime} 
                                onChange={handleSearchChange} 
                                fullWidth 
                                InputLabelProps={{ shrink: true }} 
                            />
                        </Grid>
                        
                        <Grid item xs={6} sm={4}>
                            <FormControl fullWidth variant="outlined" size="medium" >
                                <InputLabel 
                                    shrink 
                                    id="passengers-label"
                                    sx={labelStyles}
                                >
                                    Passengers
                                </InputLabel>
                                <Select
                                    labelId="passengers-label"
                                    name="passengers"
                                    value={searchForm.passengers}
                                    onChange={handleSearchChange}
                                    label="Passengers"
                                    notched={true}
                                    sx={selectStyles}
                                >
                                    <MenuItem value="1">1</MenuItem>
                                    <MenuItem value="2">2</MenuItem>
                                    <MenuItem value="3">3</MenuItem>
                                    <MenuItem value="4">4</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        
                        <Grid item xs={6} sm={4}>
                            <FormControl fullWidth variant="outlined" size="medium">
                                <InputLabel 
                                    shrink 
                                    id="class-label"
                                    sx={labelStyles}
                                >
                                    Class
                                </InputLabel>
                                <Select
                                    labelId="class-label"
                                    name="class"
                                    value={searchForm.class}
                                    onChange={handleSearchChange}
                                    label="Class"
                                    notched={true}
                                    sx={selectStyles}
                                >
                                    <MenuItem value="">Select Class</MenuItem>
                                    <MenuItem value="economy">Economy</MenuItem>
                                    <MenuItem value="business">Business</MenuItem>
                                    <MenuItem value="platinum">Platinum</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        
                        <Grid item xs={12}>
                            <Button type="submit" variant="contained" startIcon={<SearchIcon />} fullWidth>
                                Search Flights
                            </Button>
                        </Grid>
                    </Grid>
                </Box>
            </Paper>
        </Box>
    );
};

export default SearchFlights;