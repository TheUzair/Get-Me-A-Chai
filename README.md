# Get-Me-A-Chai

## Project Description

**Get-Me-A-Chai** is a crowdfunding platform built with Next.js that empowers creators to receive direct support from their fans. Through a user-friendly interface, the application offers features such as user authentication, personalized dashboards, and secure payment processing via Razorpay. 

On the home page, visitors can quickly learn about the platform’s mission of supporting creative projects through “chai” purchases. The platform fosters a supportive community where fans can collaborate, contribute financially, and engage with creators. Get-Me-A-Chai makes it easy for fans to back creators directly and for creators to bring their projects to life with the help of their supporters.

Fans can explore different ways to contribute:
- **Collaborative Fans**: Be a part of the creator’s journey by sharing ideas and offering moral support.
- **Direct Contributions**: Buy a chai to fund creative projects, helping creators to reach their goals.
- **Community Engagement**: Join a passionate community that supports and believes in the creators' work.

Additionally, the platform provides detailed information on how it connects creators with fans, offers flexible funding options, and fosters a growing community committed to collaboration and creativity.

## Table of Contents

1. [Project Structure](#project-structure)
2. [Installation](#installation)
3. [Configuration](#configuration)
4. [Usage](#usage)
5. [Scripts](#scripts)
6. [Technologies Used](#technologies-used)
7. [Contributing](#contributing)
8. [License](#license)

## Project Structure

The application is organized as follows:

```
GET-ME-A-CHAI/
├── actions/
│   └── useraction.js         # User actions and utilities
├── app/
│   ├── [username]/
│   │   └── page.js           # Dynamic user-specific page
│   ├── about/
│   │   └── page.js           # About page
│   ├── api/
│   │   ├── auth/[...nextauth]/
│   │   │   └── route.js      # Authentication routes using NextAuth.js
│   │   └── razorpay/
│   │       └── route.js      # Razorpay API route for payment processing
│   ├── dashboard/
│   │   └── page.js           # Dashboard page for user interaction
│   └── login/
│       └── page.js           # Login page
├── components/
│   ├── Dashboard.js          # Dashboard component
│   ├── Footer.js             # Footer component
│   ├── Navbar.js             # Navigation bar component
│   ├── PaymentPage.js        # Payment page component
│   └── SessionWrapper.js     # Wrapper for session handling
├── db/
│   └── connectDB.js          # Database connection setup
├── models/
│   ├── Payment.js            # Payment model for database
│   └── User.js               # User model for database
├── public/                   # Public assets (images, icons, etc.)
├── .env.local                # Local environment variables
├── .eslintrc.json            # ESLint configuration file
├── .gitignore                # Git ignore file
├── jsconfig.json             # JavaScript configuration for paths and aliases
├── next.config.mjs           # Next.js configuration file
├── package-lock.json         # Auto-generated dependency tree
├── package.json              # Dependencies and scripts
├── postcss.config.js         # PostCSS configuration file
├── README.md                 # Project documentation
└── tailwind.config.js        # Tailwind CSS configuration
```

## Installation

To run this application locally, follow these steps:

1. Clone the repository:
   ```bash
   git clone https://github.com/TheUzair/Get-Me-A-Chai.git
   cd Get-Me-A-Chai
   ```

2. Install the dependencies:
   ```bash
   npm install
   ```

## Configuration

1. **Environment Variables**: Rename `.env.local.example` to `.env.local` and update the following environment variables as needed:
   ```plaintext
   DATABASE_URL=your-database-url
   NEXTAUTH_SECRET=your-nextauth-secret
   RAZORPAY_KEY_ID=your-razorpay-key-id
   RAZORPAY_KEY_SECRET=your-razorpay-key-secret
   ```

2. **Database Configuration**:
   - Ensure that the `connectDB.js` file in the `db` directory is set up with your database details.

## Usage

1. **Running the Application**:
   ```bash
   npm run dev
   ```
   The application will start in development mode at [http://localhost:3000](http://localhost:3000).

2. **Accessing Features**:
   - **Login**: Go to `/login` to access the login page.
   - **Dashboard**: After logging in, access the user dashboard at `/dashboard`.
   - **Payment**: Access payment features through the payment component and Razorpay integration.

## Scripts

- `npm run dev`: Start the development server.
- `npm run build`: Build the application for production.
- `npm run start`: Start the application in production mode.
- `npm run lint`: Run ESLint to lint the codebase.

## Technologies Used

- **Next.js**: Framework for server-rendered React applications.
- **NextAuth.js**: Authentication for Next.js applications.
- **Razorpay**: Payment integration for processing transactions.
- **Tailwind CSS**: Utility-first CSS framework for styling.
- **MongoDB**: Database for storing user and payment information.
- **Mongoose**: ODM library for MongoDB.

## Contributing

Contributions are welcome! If you'd like to contribute to this project, please follow these steps:

1. Fork the repository.
2. Create a new branch:
   ```bash
   git checkout -b feature/YourFeatureName
   ```
3. Make your changes and commit them:
   ```bash
   git commit -m "Add some feature"
   ```
4. Push to the branch:
   ```bash
   git push origin feature/YourFeatureName
   ```
5. Open a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.