import { 
  Dialog, 
  DialogContent, 
  DialogActions, 
  Button, 
  TextField, 
  MenuItem,
  Typography,
  Box,
  Paper,
  Divider,
  useTheme,
  useMediaQuery,
  Stack
} from '@mui/material';
import { LibraryBooks } from '@mui/icons-material';
import { useState, useEffect } from 'react';

interface BorrowFormProps {
  open: boolean;
  onClose: () => void;
  bookName: string;
}

interface BorrowFormData {
  book: string;
  name: string;
  email: string;
  duration: string;
  purpose: string;
}

export default function BorrowForm({ open, onClose, bookName }: BorrowFormProps) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const initialFormState = {
    book: bookName,
    name: '',
    email: '',
    duration: '14',
    purpose: 'Study'
  };

  const [formData, setFormData] = useState<BorrowFormData>(initialFormState);
  const [errors, setErrors] = useState<Partial<BorrowFormData>>({});

  // Reset form when dialog opens/closes
  useEffect(() => {
    if (open) {
      setFormData(initialFormState);
      setErrors({});
    }
  }, [open, bookName]);

  const validateForm = () => {
    const newErrors: Partial<BorrowFormData> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }
    
    if (!formData.duration.trim()) {
      newErrors.duration = 'Duration is required';
    }
    
    if (!formData.purpose.trim()) {
      newErrors.purpose = 'Purpose is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    try {
      // Here you would typically make an API call to process the borrow request
      console.log('Borrow request:', formData);
      
      // Reset form to initial state
      setFormData(initialFormState);
      setErrors({});
      
      // Close the dialog
      onClose();
    } catch (error) {
      console.error('Error submitting borrow request:', error);
      // Handle error appropriately
    }
  };

  const handleChange = (field: keyof BorrowFormData) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [field]: e.target.value
    });
    if (errors[field]) {
      setErrors({
        ...errors,
        [field]: undefined
      });
    }
  };

  return (
    <Dialog 
      open={open} 
      onClose={onClose} 
      maxWidth="sm" 
      fullWidth
      fullScreen={fullScreen}
      PaperProps={{
        sx: {
          borderRadius: fullScreen ? 0 : 2,
          m: fullScreen ? 0 : 2
        }
      }}
    >
      <Paper elevation={0}>
        <Box sx={{ 
          p: 3, 
          bgcolor: 'primary.main', 
          color: 'primary.contrastText',
          borderTopLeftRadius: fullScreen ? 0 : 8,
          borderTopRightRadius: fullScreen ? 0 : 8
        }}>
          <Stack direction="row" spacing={2} alignItems="center">
            <LibraryBooks fontSize="large" />
            <Box>
              <Typography variant="h5" component="h2" gutterBottom sx={{ mb: 0 }}>
                Borrow Book Request
              </Typography>
              <Typography variant="subtitle2" sx={{ opacity: 0.8 }}>
                Please fill in the details below
              </Typography>
            </Box>
          </Stack>
        </Box>

        <form onSubmit={handleSubmit}>
          <DialogContent>
            <Stack spacing={3}>
              <Box sx={{ 
                p: 2, 
                bgcolor: 'grey.50', 
                borderRadius: 1,
                border: '1px solid',
                borderColor: 'grey.200'
              }}>
                <Typography variant="subtitle2" color="textSecondary" gutterBottom>
                  Selected Book
                </Typography>
                <Typography variant="body1" fontWeight="medium">
                  {formData.book}
                </Typography>
              </Box>

              <TextField
                label="Name"
                fullWidth
                value={formData.name}
                onChange={handleChange('name')}
                error={!!errors.name}
                helperText={errors.name}
                variant="outlined"
                placeholder="Enter your full name"
              />
              
              <TextField
                label="Email"
                type="email"
                fullWidth
                value={formData.email}
                onChange={handleChange('email')}
                error={!!errors.email}
                helperText={errors.email}
                variant="outlined"
                placeholder="your.email@example.com"
              />
              
              <Box sx={{ 
                display: 'grid', 
                gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
                gap: 2
              }}>
                <TextField
                  label="Duration (days)"
                  type="number"
                  value={formData.duration}
                  onChange={handleChange('duration')}
                  error={!!errors.duration}
                  helperText={errors.duration || 'Number of days to borrow'}
                  inputProps={{ min: 1, max: 30 }}
                  variant="outlined"
                />
                
                <TextField
                  select
                  label="Purpose"
                  value={formData.purpose}
                  onChange={handleChange('purpose')}
                  error={!!errors.purpose}
                  helperText={errors.purpose}
                  variant="outlined"
                >
                  <MenuItem value="Study">Study</MenuItem>
                  <MenuItem value="Research">Research</MenuItem>
                  <MenuItem value="Leisure">Leisure</MenuItem>
                  <MenuItem value="Other">Other</MenuItem>
                </TextField>
              </Box>
            </Stack>
          </DialogContent>

          <Divider />
          
          <DialogActions sx={{ p: 2.5 }}>
            <Button 
              onClick={onClose} 
              color="inherit"
              variant="outlined"
              sx={{ borderRadius: 2 }}
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              color="primary" 
              variant="contained"
              sx={{ 
                borderRadius: 2,
                px: 3,
                '&:hover': {
                  bgcolor: 'primary.dark'
                }
              }}
            >
              Submit Request
            </Button>
          </DialogActions>
        </form>
      </Paper>
    </Dialog>
  );
} 