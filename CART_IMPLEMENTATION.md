# Cart Implementation Documentation

## Overview
Complete cart functionality has been implemented using Redux Saga state management, following the existing project patterns.

## API Integration
- **Base URL**: `http://localhost:5000/api/v1/user/cart`
- **Endpoints**:
  - `POST /` - Add product to cart
  - `GET /` - Get latest cart
  - `DELETE /?productId={id}&variantId={id}` - Remove product from cart
  - `PATCH /update-quantity?productId={id}&variantId={id}&action={increment|decrement}` - Update quantity

## Redux Store Structure

### Cart State
```javascript
{
  cart: null,           // Full cart object from API
  items: [],            // Cart items array
  totalMRP: 0,          // Total MRP
  totalPrice: 0,        // Total selling price
  savedAmount: 0,       // Total savings
  itemCount: 0,         // Total item count
  loading: false,       // General loading state
  addingToCart: false,  // Adding to cart loading
  removingFromCart: false, // Removing from cart loading
  updatingQuantity: false, // Updating quantity loading
  // Error states
  error: null,
  addToCartError: null,
  removeFromCartError: null,
  updateQuantityError: null
}
```

### Actions Available
- `addToCartRequest(productData)` - Add product to cart
- `getCartRequest()` - Fetch latest cart
- `removeFromCartRequest(productId, variantId)` - Remove item
- `updateCartQuantityRequest(productId, variantId, action)` - Update quantity
- `clearCart()` - Clear entire cart

## Components Updated

### 1. Cart Sidebar (`/pages/Mobile/cart/index.jsx`)
- ✅ Integrated with Redux store
- ✅ Real-time cart data from API
- ✅ Add/remove/update quantity functionality
- ✅ Loading states and error handling
- ✅ Empty cart state
- ✅ Proper pricing calculations

### 2. Header Component (`/layout/Header.jsx`)
- ✅ Real-time cart item count badge
- ✅ Auto-loads cart on authentication
- ✅ Updates across all header instances (mobile/desktop)

### 3. Product Details Page (`/components/desktop/ProductDetail.jsx`)
- ✅ Add to cart functionality
- ✅ Variant selection validation
- ✅ Authentication check
- ✅ Loading states
- ✅ Both mobile and desktop buttons

### 4. Reusable Components
- ✅ `AddToCartButton` component for reuse across the app
- ✅ `SearchDropdown` with debounced search

## Features Implemented

### Cart Management
1. **Add to Cart**
   - Validates user authentication
   - Validates variant selection
   - Shows loading states
   - Success/error notifications

2. **Update Quantity**
   - Increment/decrement buttons
   - Real-time updates
   - Loading states per item

3. **Remove Items**
   - Individual item removal
   - Confirmation through UI feedback
   - Updates totals instantly

4. **Cart Display**
   - Product images and details
   - Variant information
   - Price calculations (MRP, selling price, savings)
   - Responsive design

### User Experience
- ✅ Loading spinners during API calls
- ✅ Success/error toast notifications
- ✅ Real-time cart count updates
- ✅ Empty cart state with call-to-action
- ✅ Authentication flow integration
- ✅ Responsive design (mobile/desktop)

## Usage Examples

### Adding to Cart
```javascript
import { useDispatch } from 'react-redux';
import { addToCartRequest } from '@/store/Cart/actions';

const dispatch = useDispatch();

const handleAddToCart = () => {
  dispatch(addToCartRequest({
    productId: "684abbd87e25e9135026bd0a",
    variantId: "684abbd87e25e9135026bd0e", 
    quantity: "1"
  }));
};
```

### Using AddToCartButton Component
```javascript
import AddToCartButton from '@/components/ui/AddToCartButton';

<AddToCartButton 
  product={product}
  variant={selectedVariant}
  quantity={quantity}
  className="w-full"
  showIcon={true}
>
  Add to Cart
</AddToCartButton>
```

### Accessing Cart State
```javascript
import { useSelector } from 'react-redux';

const { items, totalPrice, itemCount, loading } = useSelector(state => state.Cart);
```

## File Structure
```
src/
├── api/
│   └── cartApi.js                 # Cart API functions
├── store/
│   └── Cart/
│       ├── actions.js             # Redux actions
│       ├── actionTypes.js         # Action type constants
│       ├── reducer.js             # Cart reducer
│       └── saga.js                # Cart sagas
├── components/
│   └── ui/
│       ├── AddToCartButton.jsx    # Reusable add to cart button
│       └── SearchDropdown.jsx     # Search with dropdown
├── pages/
│   └── Mobile/
│       └── cart/
│           └── index.jsx          # Cart sidebar component
└── layout/
    └── Header.jsx                 # Header with cart count
```

## Testing
- ✅ Build passes without errors
- ✅ No linting errors
- ✅ Redux DevTools integration
- ✅ Error handling for network failures
- ✅ Authentication flow integration

## Notes
- Cart automatically loads on user authentication
- All API responses are handled according to the provided structure
- Toast notifications show success/error messages
- Cart count updates in real-time across all components
- Proper loading states prevent multiple API calls
- Responsive design works on mobile and desktop



