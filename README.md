# Backend

A comprehensive backend service for connecting clients with professional photography partners. Built with Node.js, Express, and Prisma ORM.

## Features

### User Management
- **Authentication**: JWT-based authentication with role-based access control
- **User Roles**:
  - Client: Can create inquiries and manage their requests
  - Partner: Can view and respond to leads, manage portfolio
  - Admin: Manages platform operations, verifies partners, handles categories/locations

### Core Functionality
- **Partner Verification**: Admin can verify partner profiles
- **Inquiry System**: Clients can create photography service inquiries
- **Portfolio Management**: Partners can manage their work portfolio
- **Review System**: Clients can leave reviews for partners
- **Category & Location Management**: Admin can manage service categories and locations

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: JWT (JSON Web Tokens)
- **Validation**: Express Validator
- **Environment Management**: dotenv

## Prerequisites

- Node.js (v14 or higher)
- PostgreSQL database
- npm or yarn

## Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd pixisphere_backend
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Set up environment variables:
   ```bash
   cp .env.example .env
   ```
   Update the `.env` file with your database credentials and other configurations.

4. Run database migrations:
   ```bash
   npx prisma migrate dev --name init
   ```

5. Generate Prisma Client:
   ```bash
   npx prisma generate
   ```

## Running the Application

Start the development server:
```bash
npm run dev
# or
yarn dev
```

The server will start at `http://localhost:3000` by default.

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - User login
- `POST /api/auth/verify-otp` - Verify OTP for login

### Partner Requests
- `POST /api/partnerRequest` - Request partner profile
- `GET /api/partnerRequest/status` - Check partner request status

### Partner
- `POST /api/partner/profile` - Update partner profile
- `GET /api/partner/profile` - Get partner profile
- `GET /api/partner/leads` - Get assigned leads
- `POST /api/partner/portfolio` - Add to portfolio
- `GET /api/partner/portfolio` - Get portfolio
- `PUT /api/partner/portfolio/:index` - Update portfolio item
- `DELETE /api/partner/portfolio/:index` - Delete portfolio item

### Inquiry
- `POST /api/inquiry` - Create new inquiry
- `GET /api/inquiry` - Get user's inquiries

### Admin
- `GET /api/admin/verifications` - Get pending verifications
- `PUT /api/admin/verify/:id` - Verify partner
- `GET /api/admin/kpis` - Get platform KPIs
- `GET /api/admin/reviews` - Get all reviews
- `PUT /api/admin/reviews/:id` - Edit review
- `DELETE /api/admin/reviews/:id` - Delete review
- `POST /api/admin/categories` - Create category
- `GET /api/admin/categories` - Get all categories
- `PUT /api/admin/categories/:id` - Update category
- `DELETE /api/admin/categories/:id` - Delete category
- `POST /api/admin/locations` - Create location
- `GET /api/admin/locations` - Get all locations
- `PUT /api/admin/locations/:id` - Update location
- `DELETE /api/admin/locations/:id` - Delete location

## Database Schema

The database schema is defined in `prisma/schema.prisma`. Key models include:

- **User**: Base user model with authentication details
- **PartnerProfile**: Extended profile for service partners
- **Inquiry**: Service requests from clients
- **Review**: Client reviews for partners
- **Category**: Service categories
- **Location**: Service locations

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```
DATABASE_URL="postgresql://user:password@localhost:5432/pixisphere?schema=public"
JWT_SECRET=your_jwt_secret
PORT=3000
# Add other environment variables as needed
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For support, please open an issue in the repository or contact the development team.
