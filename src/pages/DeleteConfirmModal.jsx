// components/TeamManagement/DeleteConfirmModal.jsx
import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Box,
  Typography,
  CircularProgress,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import WarningIcon from '@mui/icons-material/Warning';

const DeleteConfirmModal = ({ open, onClose, onConfirm, member, loading }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  if (!member) return null;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="xs"
      fullWidth
      PaperProps={{
        sx: { borderRadius: 2, overflow: 'hidden' }
      }}
    >
      <DialogTitle sx={{ pb: 1, pt: 2.5, px: { xs: 2, sm: 2.5 } }}>
        <Box display="flex" alignItems="center" gap={1}>
          <WarningIcon sx={{ color: '#ef4444', fontSize: '1.2rem' }} />
          <Typography variant="h6" fontWeight={600} fontSize={{ xs: '0.95rem', sm: '1rem' }}>
            Delete Team Member
          </Typography>
        </Box>
      </DialogTitle>

      <DialogContent sx={{ px: { xs: 2, sm: 2.5 } }}>
        <DialogContentText sx={{ color: '#64748b', fontSize: '0.7rem' }}>
          Are you sure you want to permanently delete{' '}
          <strong>{member.name || `${member.firstName} ${member.lastName}`}</strong>? 
          This action cannot be undone and will remove all associated data including 
          inspection history and assigned tasks.
        </DialogContentText>
      </DialogContent>

      <DialogActions sx={{ px: { xs: 2, sm: 2.5 }, pb: 2.5, gap: 1.5 }}>
        <Button
          onClick={onClose}
          variant="outlined"
          disabled={loading}
          sx={{ 
            textTransform: 'none', 
            borderRadius: 1.5, 
            fontSize: '0.7rem', 
            py: 0.75,
            borderColor: '#e2e8f0',
            color: '#64748b'
          }}
        >
          Cancel
        </Button>
        <Button
          onClick={onConfirm}
          variant="contained"
          color="error"
          disabled={loading}
          sx={{ 
            textTransform: 'none', 
            borderRadius: 1.5, 
            fontSize: '0.7rem', 
            py: 0.75,
            px: 2.5,
            backgroundColor: '#ef4444',
            '&:hover': { backgroundColor: '#dc2626' }
          }}
        >
          {loading ? <CircularProgress size={18} sx={{ color: 'white' }} /> : 'Delete Permanently'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteConfirmModal;