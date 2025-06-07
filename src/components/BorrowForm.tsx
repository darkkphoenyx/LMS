import { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  MenuItem,
  IconButton,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import BookIcon from "@mui/icons-material/Book";
import EmailIcon from "@mui/icons-material/Email";
import PersonIcon from "@mui/icons-material/Person";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import AssignmentIcon from "@mui/icons-material/Assignment";

interface BorrowFormProps {
  open: boolean;
  onClose: () => void;
  bookName: string;
}

export default function BorrowForm({ open, onClose, bookName }: BorrowFormProps) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const userString = localStorage.getItem("user");
  const user = userString ? JSON.parse(userString) : null;

  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    duration: "14",
    purpose: "",
  });

  // Update form data when user changes
  useEffect(() => {
    if (user) {
      setFormData(prev => ({
        ...prev,
        name: user.name,
        email: user.email
      }));
    }
  }, [user]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ ...formData, book: bookName });
    onClose();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
        }
      }}
    >
      <div className="relative">
        {/* Header */}
        <DialogTitle className="bg-blue-600 text-white py-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BookIcon />
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

        <form onSubmit={handleSubmit} className="p-4">
          <DialogContent className="space-y-6">
            {/* Book Title Display */}
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <p className="text-gray-500 text-sm mb-1">Selected Book</p>
              <p className="text-lg font-semibold text-gray-800">{bookName}</p>
            </div>

            {/* Form Fields */}
            <div className="grid gap-6">
              <div className="form-field">
                <TextField
                  fullWidth
                  required
                  label="Name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  variant="outlined"
                  InputProps={{
                    startAdornment: <PersonIcon className="text-gray-400 mr-2" />,
                    readOnly: true,
                  }}
                  className="form-input"
                />
              </div>

              <div className="form-field">
                <TextField
                  fullWidth
                  required
                  type="email"
                  label="Email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  variant="outlined"
                  InputProps={{
                    startAdornment: <EmailIcon className="text-gray-400 mr-2" />,
                    readOnly: true,
                  }}
                />
              </div>

              <div className="form-field">
                <TextField
                  fullWidth
                  required
                  label="Duration (days)"
                  name="duration"
                  type="number"
                  value={formData.duration}
                  onChange={handleChange}
                  variant="outlined"
                  inputProps={{ min: 1, max: 30 }}
                  InputProps={{
                    startAdornment: <AccessTimeIcon className="text-gray-400 mr-2" />,
                  }}
                  helperText="Maximum duration: 30 days"
                />
              </div>

              <div className="form-field">
                <TextField
                  fullWidth
                  required
                  label="Purpose"
                  name="purpose"
                  value={formData.purpose}
                  onChange={handleChange}
                  variant="outlined"
                  select
                  InputProps={{
                    startAdornment: <AssignmentIcon className="text-gray-400 mr-2" />,
                  }}
                >
                  <MenuItem value="Study">Study</MenuItem>
                  <MenuItem value="Research">Research</MenuItem>
                  <MenuItem value="Leisure">Leisure</MenuItem>
                  <MenuItem value="Other">Other</MenuItem>
                </TextField>
              </div>
            </div>
          </DialogContent>

          {/* Actions */}
          <DialogActions className="p-6 bg-gray-50">
            <Button 
              onClick={onClose}
              className="px-6"
              sx={{
                color: 'gray',
                '&:hover': {
                  backgroundColor: 'rgba(0, 0, 0, 0.04)',
                },
              }}
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              variant="contained" 
              className="px-8"
              sx={{
                backgroundColor: '#2563eb',
                '&:hover': {
                  backgroundColor: '#1d4ed8',
                },
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
              }}
            >
              Submit Request
            </Button>
          </DialogActions>
        </form>
      </div>
    </Dialog>
  );
} 