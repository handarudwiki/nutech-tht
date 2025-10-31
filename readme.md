# 🧩 Database Design Documentation

This document describes the database schema for the **E-Wallet Application**.  
The database is built using **PostgreSQL**, designed to handle user accounts, wallets, transactions, and available services.

---

## ⚙️ Overview

The system consists of the following core entities:
- **Users** – represent registered customers
- **Wallets** – store user balances
- **Transactions** – record all payment or top-up activities
- **Services** – represent bill payment or purchase services
- **Banners** – store promotional content or featured images

---

## 🧍‍♂️ Table: `users`

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | UUID | Primary Key | Unique identifier for each user |
| `email` | VARCHAR | Unique, Not Null | User email address |
| `password` | VARCHAR | Not Null | Encrypted user password |
| `first_name` | VARCHAR | Not Null | User’s first name |
| `last_name` | VARCHAR | Nullable | User’s last name |
| `profile_image` | VARCHAR | Nullable | URL or file path to user’s profile picture |

**Relationships:**
- One user **has one** wallet (`wallets.user_id`)
- One user **can have many** transactions (`transactions.user_id`)

---

## 💰 Table: `wallets`

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | UUID | Primary Key | Unique identifier for each wallet |
| `user_id` | UUID | Unique, Foreign Key → `users.id` | Links wallet to its owner |
| `balance` | FLOAT | Default: `0` | Current balance of the wallet |

**Behavior:**
- Each user can have only **one wallet**
- Deleting a user will also delete their wallet (`ON DELETE CASCADE`)

---

## 🧾 Table: `transactions`

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | UUID | Primary Key | Unique transaction ID |
| `invoice_number` | VARCHAR | Unique, Not Null | Invoice or reference number |
| `user_id` | UUID | Foreign Key → `users.id` | Transaction owner |
| `service_id` | UUID | Nullable, Foreign Key → `services.id` | Related service if applicable |
| `total_amount` | FLOAT | Not Null | Total transaction value |
| `type` | ENUM(`TOPUP`, `PAYMENT`) | Not Null | Type of transaction |
| `created_at` | TIMESTAMP | Default: `NOW()` | Time when transaction was created |

**Behavior:**
- When a user is deleted, their transactions are removed as well (`ON DELETE CASCADE`)
- When a service is deleted, related transactions are deleted (`ON DELETE CASCADE`)

---

## 🧩 Table: `services`

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | UUID | Primary Key | Unique service identifier |
| `code` | VARCHAR | Unique, Not Null | Short code for the service |
| `name` | VARCHAR | Not Null | Service name (e.g., Electricity, Internet) |
| `icon` | VARCHAR | Not Null | URL or path to service icon |
| `tarif` | FLOAT | Not Null | Base fee or cost for the service |

**Relationships:**
- One service can have **many transactions**

---

## 🖼️ Table: `banners`

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | UUID | Primary Key | Unique banner ID |
| `name` | VARCHAR | Not Null | Banner title or name |
| `image` | VARCHAR | Not Null | Image URL or file path |
| `description` | TEXT | Not Null | Banner description or message |

**Usage:**
- Used for front-end display of promotions or featured content.

---

## 🔢 Enum: `TransactionType`

| Value | Description |
|--------|-------------|
| `TOPUP` | Adding funds to the user’s wallet |
| `PAYMENT` | Paying for a specific service |

---

## 🔗 Entity Relationships

| Parent | Child | Relationship | Description |
|---------|--------|---------------|-------------|
| `users` | `wallets` | One-to-One | Each user has one wallet |
| `users` | `transactions` | One-to-Many | Each user can perform multiple transactions |
| `services` | `transactions` | One-to-Many | Each service can appear in multiple transactions |

---

## 🧠 Notes

- All IDs use **UUIDs** for scalability and uniqueness.
- Referential integrity is enforced using **foreign key constraints**.
- Cascading deletes are applied where logical (e.g., deleting a user removes wallet and transactions).
- Enum values enforce consistency for transaction types.

---

## 🗺️ Example Relationship Diagram (Mermaid)

```mermaid
erDiagram
    USERS ||--|| WALLETS : "has one"
    USERS ||--o{ TRANSACTIONS : "makes"
    SERVICES ||--o{ TRANSACTIONS : "linked to"
    
    USERS {
        UUID id
        VARCHAR email
        VARCHAR password
        VARCHAR first_name
        VARCHAR last_name
    }

    WALLETS {
        UUID id
        UUID user_id
        FLOAT balance
    }

    TRANSACTIONS {
        UUID id
        UUID user_id
        UUID service_id
        FLOAT total_amount
        ENUM type
        TIMESTAMP created_at
    }

    SERVICES {
        UUID id
        VARCHAR code
        VARCHAR name
        FLOAT tarif
    }

    BANNERS {
        UUID id
        VARCHAR name
        VARCHAR image
        TEXT description
    }
