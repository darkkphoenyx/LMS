import { useState } from 'react';
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
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import ReceiptIcon from "@mui/icons-material/Receipt";

interface BuyFormProps {
  open: boolean;
  onClose: () => void;
  bookName: string;
  price: number;
}

export default function BuyForm({ open, onClose, bookName, price }: BuyFormProps) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const initialFormState = {
    quantity: 1,
    shippingAddress: "",
    paymentMethod: "credit_card",
  };

  const [formData, setFormData] = useState(initialFormState);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const userString = localStorage.getItem("user");
    const user = userString ? JSON.parse(userString) : null;
    
    console.log({ 
      ...formData, 
      book: bookName,
      totalAmount: (price * formData.quantity).toFixed(2),
      userName: user?.name,
      userEmail: user?.email
    });

    // Reset form to initial state
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
      <DialogTitle 
        className="bg-blue-600 text-white py-3 flex items-center justify-between"
        sx={{ px: 3 }}
      >
        <div className="flex items-center gap-2">
          <ShoppingCartIcon />
          <span className="text-xl font-semibold">Purchase Book</span>
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
          {/* Order Summary Section */}
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-3">
              <ReceiptIcon className="text-blue-600" />
              <h3 className="text-lg font-semibold text-gray-800">Order Summary</h3>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <div className="grid gap-2">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Book:</span>
                  <span className="font-medium text-gray-800 break-words max-w-[60%] text-right">{bookName}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Price per unit:</span>
                  <span className="font-medium text-gray-800">${price.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Quantity:</span>
                  <TextField
                    size="small"
                    name="quantity"
                    type="number"
                    value={formData.quantity}
                    onChange={handleChange}
                    variant="outlined"
                    inputProps={{ 
                      min: 1,
                      style: { 
                        width: '60px',
                        textAlign: 'center',
                        padding: '4px 8px'
                      }
                    }}
                  />
                </div>
                <Divider className="my-2" />
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 font-medium">Total Amount:</span>
                  <span className="text-lg font-semibold text-green-600">
                    ${(price * formData.quantity).toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Shipping & Payment Section */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <LocalShippingIcon className="text-blue-600" />
              <h3 className="text-lg font-semibold text-gray-800">Shipping & Payment</h3>
            </div>
            <div className="grid gap-3">
              <TextField
                fullWidth
                required
                size="small"
                label="Shipping Address"
                name="shippingAddress"
                value={formData.shippingAddress}
                onChange={handleChange}
                variant="outlined"
                multiline
                rows={2}
                placeholder="Enter your complete shipping address"
              />
              <FormControl fullWidth required size="small">
                <InputLabel>Payment Method</InputLabel>
                <Select
                  name="paymentMethod"
                  value={formData.paymentMethod}
                  onChange={handleChange}
                  label="Payment Method"
                >
                  <MenuItem value="credit_card">Credit Card</MenuItem>
                  <MenuItem value="debit_card">Debit Card</MenuItem>
                  <MenuItem value="paypal">PayPal</MenuItem>
                  <MenuItem value="bank_transfer">Bank Transfer</MenuItem>
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
            Confirm Purchase
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
} 