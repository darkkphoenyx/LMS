import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  IconButton,
  useTheme,
  useMediaQuery,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
  Divider,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import ReceiptIcon from "@mui/icons-material/Receipt";

interface BorrowFormProps {
  open: boolean;
  onClose: () => void;
  bookName: string;
}

interface BorrowFormData {
  name: string;
  email: string;
  duration: string;
  purpose: string;
}

export default function BorrowForm({ open, onClose, bookName }: BorrowFormProps) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const initialFormState = {
    name: '',
    email: '',
    duration: '14',
    purpose: 'Study'
  };

  const [formData, setFormData] = useState<BorrowFormData>(initialFormState);

  useEffect(() => {
    if (open) {
      const userString = localStorage.getItem("user");
      const user = userString ? JSON.parse(userString) : null;
      setFormData({
        ...initialFormState,
        name: user?.name || '',
        email: user?.email || ''
      });
    }
  }, [open]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Borrow request:', { ...formData, book: bookName });
    setFormData(initialFormState);
    onClose();
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent<string>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
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
          background: 'linear-gradient(to bottom right, #ffffff, #f8f9fa)',
          height: fullScreen ? '100%' : 'auto',
          overflowX: 'hidden',
        }
      }}
    >
      <DialogTitle className="bg-blue-600 text-white py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <LibraryBooksIcon />
          <span className="text-xl font-semibold">Borrow Book</span>
        </div>
        <IconButton
          edge="end"
          color="inherit"
          onClick={onClose}
          aria-label="close"
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <form onSubmit={handleSubmit}>
        <DialogContent sx={{ px: 3, py: 2 }}>
          {/* Book Details Section */}
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-3">
              <ReceiptIcon className="text-blue-600" />
              <h3 className="text-lg font-semibold text-gray-800">Book Details</h3>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <div className="grid gap-2">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Selected Book:</span>
                  <span className="font-medium text-gray-800 break-words max-w-[60%] text-right">{bookName}</span>
                </div>
                <Divider className="my-2" />
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Borrow Duration:</span>
                  <FormControl size="small" sx={{ width: '120px' }}>
                    <Select
                      name="duration"
                      value={formData.duration}
                      onChange={handleChange}
                    >
                      <MenuItem value="7">7 Days</MenuItem>
                      <MenuItem value="14">14 Days</MenuItem>
                      <MenuItem value="30">30 Days</MenuItem>
                    </Select>
                  </FormControl>
                </div>
              </div>
            </div>
          </div>

          {/* Borrower Information */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <LibraryBooksIcon className="text-blue-600" />
              <h3 className="text-lg font-semibold text-gray-800">Borrower Information</h3>
            </div>
            <div className="grid gap-3">
              <TextField
                fullWidth
                size="small"
                label="Name"
                name="name"
                value={formData.name}
                variant="outlined"
                InputProps={{
                  readOnly: true,
                }}
              />
              <TextField
                fullWidth
                size="small"
                type="email"
                label="Email"
                name="email"
                value={formData.email}
                variant="outlined"
                InputProps={{
                  readOnly: true,
                }}
              />
              <FormControl fullWidth size="small">
                <InputLabel>Purpose of Borrowing</InputLabel>
                <Select
                  name="purpose"
                  value={formData.purpose}
                  onChange={handleChange}
                  label="Purpose of Borrowing"
                >
                  <MenuItem value="Study">Study</MenuItem>
                  <MenuItem value="Research">Research</MenuItem>
                  <MenuItem value="Leisure">Leisure Reading</MenuItem>
                  <MenuItem value="Other">Other</MenuItem>
                </Select>
              </FormControl>
            </div>
          </div>
        </DialogContent>

        <DialogActions className="p-4 bg-gray-50">
          <Button 
            onClick={onClose}
            variant="outlined"
            className="px-4"
            sx={{
              borderColor: 'gray',
              color: 'gray',
              '&:hover': {
                borderColor: 'gray',
                backgroundColor: 'rgba(0, 0, 0, 0.04)',
              },
            }}
          >
            Cancel
          </Button>
          <Button 
            type="submit" 
            variant="contained" 
            className="px-6"
            sx={{
              backgroundColor: '#2563eb',
              '&:hover': {
                backgroundColor: '#1d4ed8',
              },
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
            }}
          >
            Confirm Borrow
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
} 