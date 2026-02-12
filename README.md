# Buyan Partners

Buyan Partners is a corporate consulting website designed and developed for a US-based firm specializing in market expansion and transformation. The project focuses on high performance, SEO optimization, and dynamic content management.

## About The Project

This project serves as the digital presence for Buyan Partners. It is built with a mobile-first approach to ensure a seamless experience across all devices. The application integrates a Headless CMS (Sanity.io) to allow the client to manage their "Insights" (blog) and "Founders" (team) sections without technical intervention.

Live URL: https://buyanpartners.com

## Built With

The following technologies and libraries were used in the development of this project:

* **React** - JavaScript library for building user interfaces
* **Vite** - Next Generation Frontend Tooling
* **Tailwind CSS** - Utility-first CSS framework
* **Framer Motion** - Production-ready motion library for React
* **Sanity.io** - Headless CMS for content management
* **React Router DOM** - Declarative routing for React
* **React Helmet Async** - SEO and meta tag management
* **React GA4** - Google Analytics 4 integration

## Features

* **Responsive Design:** Fully optimized for mobile, tablet, and desktop devices.
* **Dynamic Content Management:** Integrated Sanity CMS allows the client to add, edit, and delete blog posts and update team member profiles.
* **SEO Optimization:** Implemented dynamic meta tags, Open Graph protocols, and Schema.org structured data for better search engine visibility.
* **Performance:** Optimized asset loading and code splitting via Vite.
* **Analytics:** Integrated Google Analytics 4 and Google Search Console for traffic tracking.

## Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

* Node.js (v18 or higher)
* npm

### Installation

1.  Clone the repository
    ```sh
    git clone [https://github.com/atakanclskn/buyan-partners.git](https://github.com/atakanclskn/buyan-partners.git)
    ```

2.  Install NPM packages
    ```sh
    npm install
    ```

3.  Configure Environment Variables
    Create a `.env` file in the root directory and add your Sanity configuration:
    ```env
    VITE_SANITY_PROJECT_ID=your_project_id
    VITE_SANITY_DATASET=production
    ```

4.  Run the project
    ```sh
    npm run dev
    ```

## Usage

* **Frontend:** The main application runs on the local development server (usually http://localhost:5173).
* **CMS Studio:** To access the Sanity Studio locally, navigate to the `studio` folder and run `npm run dev`.

## License

Distributed under the MIT License. See `LICENSE` for more information.

## Contact

Atakan Çalışkan - https://atakanclskn.me

Project Link: https://github.com/atakanclskn/buyan-partners
