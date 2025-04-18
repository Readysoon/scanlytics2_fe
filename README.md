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

# Clean Code Strategy
