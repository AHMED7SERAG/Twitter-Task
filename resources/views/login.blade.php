<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/css/bootstrap.min.css" >

    <!-- Fonts -->
    <link rel="dns-prefetch" href="//fonts.gstatic.com">
    <link href="https://fonts.bunny.net/css?family=Nunito" rel="stylesheet">

    <!-- Scripts -->

</head>
<body>

    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-8">
                <div class="card">
                    <div class="card-header">{{ __('Login') }}</div>

                    <div class="card-body">
                        <form id="phone-form">
                            <label for="phone">Phone Number</label>
                            <input type="tel" id="phone" name="phone" placeholder="+1 123-456-7890" required>

                            <div id="recaptcha-container"></div>

                            <button type="submit" class="btn btn-success">Send Verification Code</button>
                          </form>

                          <form id="code-form" class="hidden">
                            <label for="code">Verification Code</label>
                            <input type="text" id="code" name="code" required>

                            <button type="submit"  class="btn btn-primary">Verify</button>
                          </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <script src="https://www.gstatic.com/firebasejs/8.6.8/firebase-app.js"></script>
    <script src="https://www.gstatic.com/firebasejs/8.6.8/firebase-auth.js"></script>
    <script>
        const phoneForm = document.querySelector('#phone-form');
        const codeForm = document.querySelector('#code-form');

        // Initialize Firebase SDK and enable phone authentication
        const firebaseConfig = {
            apiKey: "AIzaSyAf7yeM-U7lL0Sl5AbfIILKE43Xo8L8pwk",
            authDomain: "test-190b5.firebaseapp.com",
            projectId: "test-190b5",
            storageBucket: "test-190b5.appspot.com",
            messagingSenderId: "650453833169",
            appId: "1:650453833169:web:137c6efd72944a081c3cf0",
            measurementId: "G-KXYB3BFR80"
        };

        firebase.initializeApp(firebaseConfig);

        const auth = firebase.auth();
        auth.useDeviceLanguage();

        phoneForm.addEventListener('submit', (e) => {
          e.preventDefault();

          const phoneNumber = phoneForm.phone.value;

          const recaptchaContainer = document.querySelector('#recaptcha-container');
          recaptchaContainer.innerHTML = '';

          const appVerifier = new firebase.auth.RecaptchaVerifier(recaptchaContainer);

          auth.signInWithPhoneNumber(phoneNumber, appVerifier)
            .then((verificationId) => {
              // Save the verification ID to use later
              window.sessionStorage.setItem('firebaseVerificationId', verificationId);

              // Show the verification code form
              codeForm.classList.remove('hidden');
            })
            .catch((error) => {
              console.error(error);
              // Handle errors
            });
        });

        codeForm.addEventListener('submit', (e) => {
          e.preventDefault();

          const verificationId = window.sessionStorage.getItem('firebaseVerificationId');
          const code = codeForm.code.value;

          const credential = firebase.auth.PhoneAuthProvider.credential(verificationId, code);

          auth.signInWithCredential(credential)
            .then((userCredential) => {
              const user = userCredential.user;
              console.log(user);
              // Redirect the user to the dashboard or another page
            })
            .catch((error) => {
              console.error(error);
              // Handle errors
            });
        });
        </script>
</body>
</html>
