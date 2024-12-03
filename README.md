# Bank Interest Hub

A web app helps you track and compare interest rates across different banks.

https://bank-interest-hub.vercel.app/

## Landing Page

<img width="715" alt="Screenshot 2024-12-03 at 11 30 26 am" src="https://github.com/user-attachments/assets/14aa48f6-4971-4b6f-b45e-1bdceaa7b098">

## App Page

### Add New Bank

To add a bank to the Bank Interest Hub. Users can also check a box to indicate whether they meet the conditions for receiving a bonus rate.<br /><br />
<img width="500" alt="Screenshot 2024-12-03 at 11 16 11 am" src="https://github.com/user-attachments/assets/69c8c496-4b98-4e87-979c-6696674608c9"> <br />


### 12-Month Interest Projection Chart

This graph provides a visual representation of the projected growth for each bank over 12 months based on the inputted rates and deposits. It shows the cumulative total amounts for all added banks. <br /><br />
<img width="500" alt="Screenshot 2024-12-03 at 11 16 24 am" src="https://github.com/user-attachments/assets/89d6ede2-4b5c-4dfc-9e47-915b5e1a6f15"> <br />


### Individual Bank Cards

Each card represents a specific bank. Users can toggle whether the “Condition Met” box is checked. <br /><br />
<img width="500" alt="Screenshot 2024-12-03 at 11 17 12 am" src="https://github.com/user-attachments/assets/89c8f0ad-4b36-4896-83d1-5826527c18d5"> <br />

### Financial Report

Describes the annual summary of investments and returns. <br /><br />
<img width="500" alt="Screenshot 2024-12-03 at 11 33 15 am" src="https://github.com/user-attachments/assets/aee5d7bc-5784-41d2-9fc7-416e492ac6cc"> <br />

### What-If Scenario

Allows users to explore potential outcomes for investments. <br /><br />
<img width="500" alt="Screenshot 2024-12-03 at 11 33 44 am" src="https://github.com/user-attachments/assets/3d1024f0-36ba-4b29-967e-91e2d167c6ec">

## Features

- Add multiple banks with base and bonus interest rates
- Calculate monthly interest earnings
- Interactive chart visualization
- Dark/Light theme support

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Tech Stack

- Next.js 14
- TypeScript
- Tailwind CSS
- Recharts for data visualization
- Next-themes for theme management
