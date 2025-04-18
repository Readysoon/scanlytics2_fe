# The Project 

Scanlytics aims to support Radiologists in their daily reporting tasks by automating key elements of their workflow. While the first iteration focused on image recognotion and providing report templates, the second Version (Scanlytics2) is a AI Chat Bot that guides the doctors through and returns a structured report. 

You can visit the deployed Website here:

[www.scanlytics.de](https://scanlytics.de/)

Upon visiting it you will see the Frontpage, with the Header displaying the subpages 'Home' (current), 'Vision' (illustrative Page presenting our Vision and Mission), 'Technology' (showcasing the actual Chat Bot) and 'About' on which you can find more information about the Project and the Team behind it.  

<img width="1438" alt="Screenshot 2025-04-18 at 17 56 22" src="https://github.com/user-attachments/assets/c3886c0c-1710-446a-9482-50f05d88f1a0" />

## Technology subpage

The following image shows the Technology subpage. Use the menu buttons on the right (from top to bottom) to toggle the structured report menu, toggle the scan menu, download the report with the structured report embedded as a JSON in the metadata, switch to directly editing the PDF and at the very bottom turn the Chat Bot on (and off).

<img width="1438" alt="Screenshot 2025-04-18 at 18 03 34" src="https://github.com/user-attachments/assets/67245362-5039-4648-a0f4-ead4ac9c56c8" />


# Local Installation

To get our Scanlytics Website running locally for development purposes follow the following steps:

## Check if you have the necessary libraries installed

```bash
node -v
npm -v
```

## If not install Node (and with it npm) from the official Website:

[nodejs.org](https://nodejs.org/en)

## Clone the repository and navigate to it

```bash
git clone https://github.com/Readysoon/scanlytics2_fe.git
cd scanlytics2_fe
```

## Developing

Install the dependencies (you can also use `pnpm install` or `yarn`):

```bash
npm install
```

Start a development server (and open a new tab with the local Website in your Browser):

```bash
npm run dev -- --open
```

## Building

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy the app, you may need to install an [adapter](https://svelte.dev/docs/kit/adapters) for your target environment.


# Git Strategy

## Branching Strategy

Feature Branching: Each new feature is developed in its own branch (e.g., ⁠feature/login-system), allowing for isolated development and easier testing before merging into the main branch.

## Commit Strategy

1.	Atomic Commits: Each commit should encapsulate a single change (e.g. “Add user authentication feature” instead of “Update multiple files”). 	
2.	Descriptive Messages: Commit messages should be clear and informative (e.g. “Fix issue with user session timeout” rather than “Fix stuff”).
3.	Consistent Formatting: Use a consistent format for commit messages (e.g. 'Refactoring: #Topic'). 

# Clean Code Strategy

## Divs

1. Try to avoid unecessary Divs.
2. Try to reduce the amount of Divs per Page, by for example exporting functionalities as compononents. 
3. Please also nest the Names of the Divs respectively, e.g. MainMenuDownload. This makes refactoring much easier.
