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

## Product Detail Page

The application includes a product detail page that displays comprehensive information about a product.

- **Responsive Layout**: The page is fully responsive, with a two-column layout on web and a single-column layout on mobile.
- **Image Gallery**: A gallery with a main image and thumbnails allows users to view multiple product images.
- **Variant Selection**: Users can select product variants such as color and size. The available options are dynamically rendered based on the product data.
- **Quantity Selection**: A quantity selector allows users to choose how many items they want to add to the cart.
- **Accessibility**: All interactive elements on the page have accessibility props to ensure a good user experience with screen readers.

## Cart Persistence

The shopping cart state is persisted across application sessions.

- **Context API**: The cart is managed using React's Context API, making the cart state available throughout the application.
- **AsyncStorage & localStorage**: On mobile, the cart data is saved to `AsyncStorage`. On the web, `localStorage` is used. This ensures that the user's cart is not lost when they close and reopen the application.
