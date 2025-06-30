# Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
   npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.

# Features

## Product Listing

The application includes a comprehensive product listing page that displays all available products in a responsive grid layout.

### Key Features

- **Responsive Grid Layout**:
  - Mobile: 2-column grid layout optimized for touch interaction
  - Web: 4-column grid layout with responsive breakpoints (1 column on small screens, 2 on medium, 3 on large, 4 on extra large)
- **Product Cards**: Each product tile displays:
  - Product image with fallback handling
  - Product name
  - Product price
  - Interactive touch/click areas
- **Loading States**: Loading indicators are shown while fetching product data
- **Error Handling**: User-friendly error messages when API requests fail
- **Navigation**: Tapping/clicking a product navigates to the detailed product page
- **Pagination**: Built-in pagination support for large product catalogs
- **Accessibility**: All product cards are properly labeled and focusable for screen readers

### Technical Implementation

- **API Integration**: Products are fetched from the Pawlu API with proper error handling
- **State Management**: Loading, error, and data states are managed efficiently
- **Memoization**: Product rendering is optimized with React.memo and useCallback
- **Responsive Design**: Uses Tailwind CSS classes for consistent responsive behavior

## Product Detail Page

The application includes a product detail page that displays comprehensive information about a product.

### Key Features

- **Responsive Layout**:
  - Mobile: Single-column layout optimized for mobile viewing
  - Web: Two-column layout with image gallery on the left and product info on the right
- **Image Gallery**:
  - Main product image display
  - Thumbnail navigation for multiple product images
  - Smooth image switching with accessibility support
- **Product Information**:
  - Product title and description
  - Dynamic pricing display
  - Variant selection (color, size, etc.)
  - Quantity selector with increment/decrement controls
- **Interactive Elements**:
  - "Add to Cart" functionality with success/error feedback
  - Wishlist button
  - Social media sharing buttons
- **Accessibility**: All interactive elements have proper accessibility labels and hints

### Technical Implementation

- **Dynamic Variant Selection**: Product variants are dynamically rendered based on available options
- **Cart Integration**: Seamless integration with the shopping cart system
- **Form Validation**: Ensures all required options are selected before adding to cart
- **Responsive Design**: Optimized layouts for both mobile and web platforms

## Cart Persistence

The shopping cart state is persisted across application sessions.

- **Context API**: The cart is managed using React's Context API, making the cart state available throughout the application
- **Cross-Platform Storage**:
  - Mobile: Cart data is saved to `AsyncStorage`
  - Web: Cart data is saved to `localStorage`
- **Session Persistence**: Cart items persist when the user closes and reopens the application
- **Real-time Updates**: Cart updates are immediately reflected across all components

## State Management & Error Handling

### Cart State Persistence

- The cart is managed globally using React Context (`CartContext`).
- Cart state is automatically saved to persistent storage:
  - **Web:** Uses `localStorage`.
  - **Mobile:** Uses `AsyncStorage`.
- On app start, the cart is loaded from storage, ensuring items persist across sessions.
- All cart actions (add, update, remove) update both in-memory state and persistent storage.

### Global Error Handling

- All API calls are wrapped with a global error handler using the `useApiWithErrorContext` utility.
- Errors from API calls are set in a global error context (`ErrorContext`).
- Any component can access or clear the global error using the `useError` hook.

### Reusable Error Component

- The `ErrorMessage` component displays global errors to the user.
- It supports a "Retry" button to re-attempt failed actions, and a "Dismiss" button to clear the error.
- The component is accessible, using ARIA roles and labels for screen readers.
- Place `<ErrorMessage />` in your main layout or at the top of relevant screens/pages to ensure users always see important error feedback.

### Example Usage

```tsx
import { useApiWithErrorContext } from "@/utils/withErrorContext";
import { useError } from "@/context/ErrorContext";
import ErrorMessage from "@/components/ErrorMessage";

const apiWithError = useApiWithErrorContext();
const { clearError } = useError();

const fetchData = () => apiWithError(() => fetchProducts());

return (
  <>
    <ErrorMessage onRetry={fetchData} />
    {/* ...rest of your UI... */}
  </>
);
```

## Testing

The application includes comprehensive unit tests for core functionality:

### Cart Logic Tests

- Adding new items to cart
- Updating quantities of existing items
- Loading cart from storage
- Saving cart to storage

### Product Listing Tests

- Product data fetching
- Loading and error state handling
- Pagination functionality
- Product rendering

### Component Tests

- ProductCard component rendering
- Accessibility props validation
- Image handling with different types
- Responsive behavior

### Running Tests

```bash
npm test
```

## Accessibility

The application is built with accessibility in mind:

- **Screen Reader Support**: All interactive elements have proper accessibility labels and hints
- **Keyboard Navigation**: All components support keyboard navigation
- **Focus Management**: Proper focus indicators and management
- **Semantic HTML**: Uses appropriate ARIA roles and states
- **Color Contrast**: Ensures sufficient color contrast for readability

## API Integration

The application integrates with the Pawlu API for product data:

- **Product Listing**: Fetches paginated product lists
- **Product Details**: Retrieves detailed product information including variants
- **Error Handling**: Comprehensive error handling for network issues
- **Loading States**: Proper loading indicators during API calls

## Cart Management

The application provides a fully-featured shopping cart page where users can review and manage their selected items before proceeding to checkout.

### Key Features

- **Responsive Layout**:
  - **Mobile**: A single-column list of cart items with a summary panel fixed at the bottom.
  - **Web**: A two-column layout with the item list on the left and a sticky summary card on the right.
- **Item Management**:
  - **Update Quantity**: Users can easily increase or decrease the quantity of each item in the cart.
  - **Remove Item**: Items can be removed from the cart with a single click/tap.
- **Dynamic Calculations**: The cart summary automatically recalculates the subtotal and total as quantities change.
- **Empty Cart**: A user-friendly message is displayed when the cart is empty, guiding the user to continue shopping.
- **Accessibility**: All interactive controls for managing the cart are fully accessible with proper labels and roles for screen readers.

### Technical Implementation

- **State Management**: The cart's state is centrally managed using `CartContext`, providing all necessary data and actions (`updateQuantity`, `removeFromCart`).
- **Live Updates**: The UI instantly reflects any changes made to the cart without requiring a page reload.
- **Component-Based Architecture**: The feature is built with reusable components like `CartListItem` and `CartSummary` for both mobile and web platforms.
- **Cross-Platform Persistence**: Cart state is saved to `AsyncStorage` (mobile) or `localStorage` (web), ensuring items remain in the cart across sessions.

## Checkout Flow

The application provides a robust checkout experience for both mobile and web platforms.

### Key Features

- **Checkout Form UI**: Users can enter billing and shipping information in a form that matches the design for both mobile and web.
- **Form Validation**: All required fields are validated. Error messages are shown below each field and are accessible to screen readers.
- **Cart Summary**: An accurate summary of the cart (subtotal, shipping, tax, total) is displayed during checkout.
- **Simulated Order Submission**: When the user submits the form, a simulated API call is made. The user receives clear success or failure feedback.
- **Accessibility**: All form fields, buttons, and error messages are accessible. Screen readers announce errors and feedback. Proper roles and hints are provided.
- **Testing**: Comprehensive unit tests verify validation, error messages, and submission feedback for both mobile and web checkout flows.

### Technical Implementation

- **Form State**: Managed with React state hooks for all fields and validation.
- **Validation**: Required fields are checked on blur and submit. Errors are shown inline and announced to assistive technology.
- **Submission**: The "Pay now" button is enabled only when the form is valid. On submit, a loading indicator is shown, and a simulated API call provides success or error feedback.
- **Accessibility**: Uses `accessibilityLabel`, `accessibilityHint` (mobile), and `aria-describedby`, `role="alert"` (web) for accessible forms and error messages.
- **Unit Tests**: Located in `components/__tests__/Checkout.test.tsx` and `components/__tests__/Checkout.web.test.tsx`. Run all tests with `npm test`.

### How to Use

1. Add items to your cart.
2. Proceed to checkout.
3. Fill in all required billing and shipping fields.
4. Click or tap "Pay now". You will see a loading indicator, then a success or error message.
