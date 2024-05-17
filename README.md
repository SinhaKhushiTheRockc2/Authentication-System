
# Authentication System

The authentication system, developed using Node.js and EJS layouts, serves as a foundational framework for various social media applications. This system offers a range of functionalities, including user registration, login, logout, password reset, forgotten password retrieval, and Google OAuth integration. Leveraging JWT tokens, it ensures secure user authentication, manages user sessions, and facilitates features such as logout functionality and password reset links.

# Features

* Register a user
* Login using Google credentials
* Login normally
* Reset Password
* Update forgotten password
* Signout/logout





# Set up on local machine

1. Clone this repository

```bash
  https://github.com/SinhaKhushiTheRockc2/Authentication-System
```
2. Navigate the project directory

```bash
  cd Authentication-System
```
3. Install the dependencies

```bash
  npm install
```
4. Run server

```bash
  node server.js
```
5. To use this app:
Simply go to any of the web browser and type or copy paste this

```bash
  http://localhost:3000
```

# How to use?

### Register a user:
Enter your credentials and do not forget to complete the reCAPTCHA challenge and click on submit to successfully register yourself. Once you register yourself you will receive a Welcome Mail(only if you have entered a gmail id, other mail options will not work).

### Login yourself directly if you have a Google account:
To login yourself directly without having the need to enter the credentials. Simply click on "Login with Google" button and you will be redirected to a page where you can select your gmail id and once you are done, you will recieve a Welcome Mail suggesting successful login.

### SignIn or Login:
Click on SignIn button if you are an existing user. You will be redirected to a page where you can type your email and password and click on enter and the protected page will be visible to you.

#### NOTE: If you have successfully registered yourself you will be redirected to the SignIn page anyways

### Forget Password:
If you don't remember your password, click on "Forgot password" button present on the Sigin page and you will be redirected to a page where you simply need to enter your email id and then click on submit. Once you are done with all this you will receive a reset-password link on your mail id, copy and paste that link on your browser. You will be redirected to a page where you can update your password.

#### NOTE:"Don't try to click on that link because it is not going to work, instead copy and paste it on your browser"

### Reset Password:
Once you login successfully you will be redirected to a protected page consiting of 2 buttons. Click on "Reset password" button and you will be redirected to a page where you will need to enter your mail id again (for verification purposes) and then you will receive a token on your mail id, simply copy and paste that token on the token page and click on submit and then simply update your password.

### Signout:
After successful login you will be redirected to a protected page where you can find a "Signout" button. Simply click on that button to logout.
