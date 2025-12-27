# AuctionCraze

About
A real-time auction platform with secure user authentication, role-based access, and smart bidding features. It supports live notifications, document comparison, and an admin dashboard for complete auction management.

## Tech Stack

This project was built using the following technologies:

- **Client:** React, Redux-Toolkit, SCSS, Material-UI
- **Server:** NodeJs, ExpressJs
- **Database:** MongoDB
- **Deployment:** Render, Vercel

## Run Locally

Follow these steps to set up the project locally:

1. Clone the project

```bash
  git clone https://github.com/ASA-HELPER/AuctionCraze.git
```

2. Go to the frontend or backend directory

```bash
  For example: cd frontend
```

3. Install dependencies

```bash
  npm install
```

4. Set up environment variables. Create a .env file in the frontend and backend directories and add the following variables:

   Backend Environment Variable:

```bash
  PORT =
  MONGO_URI =
  DEVELOPMENT_FRONTEND_URL =
  PRODUCTION_FRONTEND_URL =
  CLOUDINARY_API_KEY =
  CLOUDINARY_CLOUD_NAME =
  CLOUDINARY_API_SECRET =
  JWT_SECRET_KEY =
  JWT_EXPIRES=
  COOKIE_EXPIRES=
  SMTP_HOST=
  SMTP_PORT=
  SMTP_SERVICE=
  SMTP_MAIL=
  SMTP_PASSWORD=
  AUCTIOB_CRAZE_ADMIN_EMAIL =
  AUCTION_CRAZE_ADMIN_PASSWORD =
```

Frontend Environment Variable:

```bash
  VITE_SERVICE_ID =
  VITE_TEMPLATE_ID =
  VITE_PUBLIC_KEY =
```

5. Start the server

```bash
  npm run dev
```

## Project Video

Going to upload a demo project video soon.

## Database Design

This system is a real-time auction platform where users can create auctions, place bids, win items, and pay commissions. MongoDB is used because the data is document-oriented and read-heavy during live auctions. MongoDB suits this use case because auctions require fast reads, flexible schemas, and support for nested data, such as bids and images.

<image alt="auction-craze-er-diagram" src="https://github.com/user-attachments/assets/9b542e5c-f792-483c-947c-24ac83e05086" height="1000px" width="100%"/>

System core entities:

- User
- Auction
- Bid
- Commission
- PaymentProof

Entity Relationships:

- User
  - creates → Auction
  - places → Bid
  - wins → Auction
  - pays → Commission
  - uploads → PaymentProof
- Auction
  - belongs → User (createdBy)
  - has many → Bids (embedded + referenced)
  - has one → highestBidder (User)
- Bid
  - belongs to → User
  - belongs to → Auction

### User Collection Design: Role-based User Model

A single User collection is used with role-based access instead of separate tables because it helps avoid duplication, easier authentication & authorization, and cleaner RBAC logic.

Key fields used:

- unpaidCommission → avoids recalculating on every request
- auctionsWon, moneySpent → analytics + dashboard optimization
- Embedded paymentMethods → user-specific, rarely changing data

```
User
 ├─ Auctioneer
 ├─ Bidder
 └─ Admin
```

### Auction Collection Design

An auction is the central document in the system. Important design choices:

- **Embedded Image Object:** Image is always fetched with the auction, as there is no need for a separate collection.
- **Hybrid Bid Storage:** We use a hybrid approach where bids are embedded in Auction for fast reads, and also stored in a separate Bid collection for history and analytics, because embedded bids help in fast UI updates during live bidding, and the Separate Bid collection helps in reporting, audits, and pagination.
- **highestBidder Field:** Instead of recalculating the winner from bids every time, we store the highestBidder reference directly in the auction.

### Bid Collection Design

Bid is stored separately to maintain a normalized historical record. Each bid belongs to one auction and is placed by one user. The duplication of user data is intentional denormalization to avoid extra joins during bid history queries.

`bidder: { id, userName, profileImage }`

### Commission Design

Commission is calculated after auction completion and is linked to the winning user. The separate collection is created in order to clear financial records, for easier reconciliation, and Admin-level auditing.
`commissionCalculated` flag in Auction avoids double charging

### PaymentProof Design

PaymentProof handles manual or semi-manual payment verification workflows. A user may pay multiple commissions together, so PaymentProof is user-centric. Key features:

- Proof image stored as an object
- Status lifecycle: Pending → Approved → Settled
- Linked directly to the user

### Auction Lifecycle

1. User (Auctioneer) creates an auction
2. Bidders place bids
3. Bids are embedded in Auction and stored in the Bid collection
4. Auction ends
5. highestBidder selected and Aa automatic email is sent to the highest bidder
6. Commission calculated and the bidder sends a payment screenshot to the auctioneer email.
7. The auctioneer submits the commission along with the payment proof.
8. After the proof is submitted, the admin reviews it and updates the commission status.
9. Once the admin marks the commission as settled, an email is sent to the auctioneer confirming that the commission verification has been successful.

## Deployed Version

**Deployed App link:** https://auction-craze-ui.vercel.app

## Contributing

Contributions are welcome! Here's how you can help:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature-branch`)
3. Commit your changes (`git commit -m 'Add some feature'`)
4. Push to the branch (`git push origin feature-branch`)
5. Create a new Pull Request

## License

This project is licensed under the MIT License.
