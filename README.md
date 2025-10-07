# React Infinite Image-Scroll app
This repo is an adaptation of [React Infinite Scroll Challenge | Scotch.io](https://www.youtube.com/watch?v=gk_6BKiy6X4&list=PLillGF-RfqbY3c2r0htQyVbDJJoBFE6Rb&index=8&t=1s&pp=iAQB) by Brad Traversy. 

I followed the tutorial to learn followings:
- Using Unsplash API
- Express Server back-end
- Bulma CSS for styling


## Getting Started 

1. Create an account at `https://unsplash.com/developers`
2. Go to `Your apps` > Click **New Application**
3. Check all the boxes and click **Accept terms**
4. Enter `Application name` and `Description` > **Create application**   
5. Scroll down to see your `Access Key` and `Secret Key`


### Express Server Setup

1. Create `server/` directory:
    1. Open it in VSCode terminal: `cd server`
    2. Create `server/package.json`: Run `yarn init -y`

2. Install back-end dependencies: 
    `yarn add express unsplash-js babel-register node-fetch universal-config concurrently`

3. Install `nodemon` for development: `yarn add -D nodemon`

4. Create `server/config/server.js`:
    ```
    module.exports = {
        APPLICATION_ID: process.env.APPLICATION_ID ||
        'YOUR UNSPLASH ACCESS KEY',
        SECRET: process.env.SECRET || 'YOUR UNSPLASH SECRET KEY',
        CALLBACK_URL: process.env.CALLBACK_URL || 'http://localhost:3000'
    }
    ```
5. Create `server/server.js`

6. Add `scripts` to `server/package.json`:
    ```
      "scripts": {
            "server": "nodemon server.js"
        }
    ```

### Create React App

1. Download and Install **Node.js**
2. Open project folder in VSCode Integrated Terminal

3. Install Vite on terminal:
    - Run `npm create vite@latest .`
    - Select `React` & Enter
    - Select `JavaScript` & Enter

4. Update `vite.config.js` file:
    - Add `server` to `defineConfig()`:
        ```
        server: { 
            port: 3000, 
            proxy: {
            '/api': {
                target: 'http://localhost:5000',
                changeOrigin: true,
                secure: false
        }
        ```

5. Install dependencies:
    1. Open terminal and run `npm install`
    2. Install `Concurrently` for front-end: Run `npm i concurrently`
    3. Install `Axios` and `React Infinite Scroll Component`:
        - Run `npm i axios react-infinite-scroll-component`

6. Delete: `public/vite.svg`, `src/assets`, `src/index.css`
    1. Remove `import './index.css'` from `src/main.jsx`
    2. Modify `src/App.jsx` and remove following imports :
        ```
        import reactLogo from './assets/react.svg'
        import viteLogo from '/vite.svg'
        ```

7. Update `scripts` in root `package.json`:
    ```
    "scripts": {
        "client": "vite",
        "server": "nodemon server/server.js",
        "dev": "concurrently \"cd server && yarn server\" \"yarn client\""
    }
    ```
8. Run server with: `npm run dev`

## Credits
Original tutorial: [React Infinite Scroll Challenge | Scotch.io](https://www.youtube.com/watch?v=gk_6BKiy6X4&list=PLillGF-RfqbY3c2r0htQyVbDJJoBFE6Rb&index=8&t=1s&pp=iAQB) — Brad Traversy.

## License
MIT License



