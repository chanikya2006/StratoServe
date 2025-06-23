import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  IconButton,
  CircularProgress,
  Divider,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from '@mui/material';
import {
  Notifications as NotificationsIcon,
  ArrowBack as ArrowBackIcon,
  CheckCircle as CheckCircleIcon,
  Error as ErrorIcon,
  Info as InfoIcon,
  Close as CloseIcon,
} from '@mui/icons-material';
import './Notifications.css';

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedNotification, setSelectedNotification] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser && storedUser.username) {
      axios
        .get(`http://localhost:5000/api/user/notifications/${storedUser.username}`)
        .then(res => {
          setNotifications(res.data.notifications);
          setLoading(false);
        })
        .catch(err => {
          console.error("Error fetching notifications:", err);
          setLoading(false);
        });
    } else {
      console.warn("User not logged in");
      setLoading(false);
    }
  }, []);

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'success':
        return <CheckCircleIcon color="success" />;
      case 'error':
        return <ErrorIcon color="error" />;
      default:
        return <InfoIcon color="info" />;
    }
  };

  const getNotificationType = (message) => {
    if (message.toLowerCase().includes('success') || message.toLowerCase().includes('confirmed')) {
      return 'success';
    } else if (message.toLowerCase().includes('error') || message.toLowerCase().includes('failed')) {
      return 'error';
    }
    return 'info';
  };

  const handleIconClick = (notification) => {
    setSelectedNotification(notification);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedNotification(null);
  };

  return (
    <Box className="notifications-container">
      <Box className="notifications-header">
        <IconButton onClick={() => navigate('/dashboard')} className="back-button">
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h4" component="h1" className="notifications-title">
          Notifications
        </Typography>
      </Box>

      {loading ? (
        <Box className="loading-container">
          <CircularProgress />
        </Box>
      ) : notifications.length > 0 ? (
        <Paper elevation={3} className="notifications-list">
          <List>
            {notifications.map((note, index) => {
              const type = getNotificationType(note);
              return (
                <React.Fragment key={index}>
                  <ListItem className="notification-item">
                    <ListItemIcon>
                      <IconButton
                        onClick={() => handleIconClick(note)}
                        className="notification-icon-button"
                      >
                        {getNotificationIcon(type)}
                      </IconButton>
                    </ListItemIcon>
                    <ListItemText
                      primary={note}
                      secondary={new Date().toLocaleString()}
                    />
                    <Chip
                      label={type}
                      color={type === 'success' ? 'success' : type === 'error' ? 'error' : 'info'}
                      size="small"
                    />
                  </ListItem>
                  {index < notifications.length - 1 && <Divider />}
                </React.Fragment>
              );
            })}
          </List>
        </Paper>
      ) : (
        <Paper elevation={3} className="no-notifications">
          <NotificationsIcon className="no-notifications-icon" />
          <Typography variant="h6" color="textSecondary">
            No notifications found
          </Typography>
        </Paper>
      )}

      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        className="notification-dialog"
      >
        <DialogTitle className="dialog-title">
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Typography variant="h6">
              Notification Details
            </Typography>
            <IconButton onClick={handleCloseDialog} size="small">
              <CloseIcon />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent>
          {selectedNotification && (
            <Box className="dialog-content">
              <Typography variant="body1" className="dialog-message">
                {selectedNotification}
              </Typography>
              <Typography variant="caption" className="dialog-timestamp">
                {new Date().toLocaleString()}
              </Typography>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Notifications;
