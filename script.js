let signupFunctionality = () => {
  // start Total SignUp Button Functionality ...=>
  let signup = document.querySelector("#signup-fun");
  let signupModel = document.querySelector("#signupModal");
  let signupClosebtn = document.querySelector("#signupModal i");
  let signupGmail = document.querySelector("#signupGmail #mobile");
  let signupSubmitBtn = document.querySelector("#signupModal .submit");
  let signupOTP = document.querySelector("#passwordGmain #password");
  let getotp = document.querySelector("#get-otp");
  let generatedOTP = null; // OTP store korar jonno variable
  let signupUsername = document.querySelector("#signupUsername input");
  let modal = document.querySelector("#loginModal");
  let ancharsignin = document.querySelector("#ancharLog");
  signup.addEventListener("click", () => {
    signupModel.classList.add("show");
  });

  signupClosebtn.addEventListener("click", () => {
    signupModel.classList.remove("show");
  });
  ancharsignin.addEventListener("click", () => {
    modal.classList.add("show");
    signupModel.classList.remove("show");
  });

  signupModel.addEventListener("click", (e) => {
    if (e.target === signupModel) {
      signupModel.classList.remove("show");
    }
  });
  // Get OTP button e click korle OTP generate hobe
  getotp.addEventListener("click", () => {
    let email = signupGmail.value.trim();

    if (email === "") {
      alert("Please enter your email or mobile number first!");
      return;
    }

    // Random 6 digit OTP generate
    generatedOTP = Math.floor(100000 + Math.random() * 900000);
    alert(`Your OTP is: ${generatedOTP}`);
  });

  // Signup process - submit button e click hole call hobe
  const signupProcess = () => {
    let username = signupUsername.value.trim();
    let email = signupGmail.value.trim();
    let enteredOTP = signupOTP.value.trim();

    if (email === "") {
      alert("Please enter your email or mobile number!");
      return;
    }

    if (username === "") {
      alert("Please enter your Username ");
      return;
    }

    if (generatedOTP === null) {
      alert("Please generate OTP first by clicking 'Get OTP' button!");
      return;
    }

    if (enteredOTP === "") {
      alert("Please enter the OTP!");
      return;
    }

    // OTP verify - string to number convert kore compare
    if (parseInt(enteredOTP) === generatedOTP) {
      // localStorage theke existing users array retrieve korbo
      let allUsers = localStorage.getItem("Users");
      let usersArray = allUsers ? JSON.parse(allUsers) : [];

      // Check if email already exists
      let existingUser = usersArray.find((user) => user.email === email);
      if (existingUser) {
        alert("This email is already registered! ❌");
        return;
      }

      let exitingUsername = usersArray.find(
        (user) => user.username === username
      );
      if (exitingUsername) {
        alert(`${username} is Already exit try another name `);
        return;
      }

      // New user data create
      let newUser = {
        email: email,
        username: username,
        registeredAt: new Date().toLocaleString(),
      };

      // Array te new user add korbo
      usersArray.push(newUser);

      // Updated array localStorage e save korbo
      localStorage.setItem("Users", JSON.stringify(usersArray));

      alert(
        `Signup Success! ✅ Welcome ${username}! Total users: ${usersArray.length}`
      );

      // Modal close kore debo
      signupModel.classList.remove("show");

      // Form reset
      signupGmail.value = "";
      signupOTP.value = "";
      signupUsername.value = "";
      generatedOTP = null;
    } else {
      alert("Invalid OTP! ❌ Please try again.");
    }
  };

  // Submit button e click korle signupProcess call hobe
  signupSubmitBtn.addEventListener("click", signupProcess);
  //End total signup functionality ......<=
};
let loginFunctinality = () => {
  //start total login Functionality ......=>
  let login = document.querySelector("#login-fun");
  let modal = document.querySelector("#loginModal");
  let closeBtn = document.querySelector("#closeModal");
  let logingamil = document.querySelector("#login-gmail input");
  let loginpass = document.querySelector("#login-pass input");
  let loginSubmitBtn = document.querySelector("#loginModal .submit");
  let anchorlink = document.querySelector(".singn-log");
  let signupModel = document.querySelector("#signupModal");
  // Login button e click korle modal open hobe
  login.addEventListener("click", () => {
    modal.classList.add("show");
  });

  anchorlink.addEventListener("click", () => {
    signupModel.classList.add("show");
    modal.classList.remove("show");
  });

  // Close button e click korle modal close hobe
  closeBtn.addEventListener("click", () => {
    modal.classList.remove("show");
  });

  // Overlay e click korle modal close hobe
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.classList.remove("show");
    }
  });

  const loginProcess = () => {
    let loginUserGmail = logingamil.value.trim();
    let loginUserName = loginpass.value.trim();

    // Validation
    if (loginUserGmail === "") {
      alert("Please enter your email!");
      return;
    }

    if (loginUserName === "") {
      alert("Please enter your username!");
      return;
    }

    // localStorage theke users array retrieve
    let allUsers = localStorage.getItem("Users");

    if (!allUsers) {
      alert("No users found! Please signup first.");
      return;
    }

    let usersArray = JSON.parse(allUsers);
    console.log(usersArray);
    // Users array te matching user khujbo
    let foundUser = usersArray.find(
      (user) => user.email === loginUserGmail && user.username === loginUserName
    );

    if (foundUser) {
      alert(`Login Successful! ✅ Welcome back ${foundUser.username}!`);
      modal.classList.remove("show");
      logingamil.value = "";
      loginpass.value = "";
    } else {
      alert("Invalid email or username! ❌ Please try again.");
    }
  };

  loginSubmitBtn.addEventListener("click", loginProcess);
};
let hamBurgerFunctionality = () => {
  let hamburger = document.querySelector(".logo i");
  let hamDiv = document.querySelector(".humberger");
  let closeHamburger = document.querySelector(".humberger i");

  // Hamburger icon e click korle menu open hobe
  hamburger.addEventListener("click", (e) => {
    e.stopPropagation(); // Document click trigger hobe na
    hamDiv.classList.add("show2");
  });

  // Close button e click korle menu close hobe
  closeHamburger.addEventListener("click", (e) => {
    e.stopPropagation(); // Event bubbling stop
    hamDiv.classList.remove("show2");
  });

  // Menu links e click korle menu close hobe
  let menuLinks = document.querySelectorAll(".AncherLink a");
  menuLinks.forEach((link) => {
    link.addEventListener("click", () => {
      hamDiv.classList.remove("show2");
    });
  });

  // Body/Document e click korle (hamburger menu er baire) close hobe
  document.addEventListener("click", (e) => {
    // Check: Click hamburger menu ba hamburger icon er baire hoyeche kina
    if (!hamDiv.contains(e.target) && !hamburger.contains(e.target)) {
      hamDiv.classList.remove("show2");
    }
  });
};
let slideBarFunctionality = () => {
  let index = 1;
  let autoSlideTimer;
  let direction = 1; // 1 for forward (next), -1 for backward (prev)

  let showSlide = (n) => {
    let i;
    let slides = document.querySelectorAll(".myslide");
    let dots = document.querySelectorAll(".dot");

    if (n > slides.length) {
      index = 1;
    }

    if (n < 1) {
      index = slides.length;
    }

    let currentActive = document.querySelector(".myslide[style *='block']");
    for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
    }

    let newslide = slides[index - 1];
    if (currentActive && currentActive !== newslide) {
      // Direction onujayi animation class use korbo
      if (direction === 1) {
        // Forward (Next button) - right to left
        currentActive.classList.add("slide-out");
        currentActive.classList.remove(
          "slide-in",
          "slide-in-reverse",
          "slide-out-reverse"
        );
      } else {
        // Backward (Prev button) - left to right
        currentActive.classList.add("slide-out-reverse");
        currentActive.classList.remove(
          "slide-in",
          "slide-in-reverse",
          "slide-out"
        );
      }

      setTimeout(() => {
        currentActive.style.display = "none";
        currentActive.classList.remove("slide-out", "slide-out-reverse");
      }, 600);
    }

    newslide.style.display = "block";
    // Direction onujayi animation class use korbo
    if (direction === 1) {
      // Forward (Next button) - right to left
      newslide.classList.add("slide-in");
      newslide.classList.remove(
        "slide-out",
        "slide-in-reverse",
        "slide-out-reverse"
      );
    } else {
      // Backward (Prev button) - left to right
      newslide.classList.add("slide-in-reverse");
      newslide.classList.remove("slide-out", "slide-in", "slide-out-reverse");
    }
    dots[index - 1].className += " active";
  };

  let startAutoSlide = () => {
    autoSlideTimer = setTimeout(() => {
      direction = 1; // Auto slide always forward
      index++;
      showSlide(index);
      startAutoSlide();
    }, 3000);
  };

  showSlide(index);
  startAutoSlide();
  let plusslide = (n) => {
    clearTimeout(autoSlideTimer);
    direction = n; // n will be 1 for next, -1 for prev
    showSlide((index += n));
    startAutoSlide();
  };

  let currslide = (n) => {
    clearTimeout(autoSlideTimer);
    direction = 1; // Dot click always forward
    showSlide((index = n));
    startAutoSlide();
  };

  let dot = document.querySelectorAll(".dot");
  for (let i = 0; i < dot.length; i++) {
    dot[i].addEventListener("click", () => {
      currslide(i + 1);
    });
  }
  document.querySelector(".next").addEventListener("click", () => {
    plusslide(1);
  });

  document.querySelector(".prev").addEventListener("click", () => {
    plusslide(-1);
  });
};

let menCollectionFunctionality = () => {
  let mensAll = document.querySelector(".mensAll");
  let innerhtml = "";
  menCard.forEach((item) => {
    innerhtml += `
    <div class="men-card">
          <img src=${item.Img} alt="">
          <div class="Sponsored">${item.sponsored}</div>
          <div class="companyName">${item.company}</div>
          <div class="productName">${item.productName}</div>
          <div class="prices">
            <span class="currentPrice">₹ ${item.currentPrice}</span>
            <span class="discountPrice">${item.distcountPrice}</span>
            <span class="discountRate"><i class="fa-solid fa-arrow-down"></i>${item.discountRte}%</span>
          </div>  
    </div>`;
  });

  mensAll.innerHTML = innerhtml;
};

menCollectionFunctionality();
slideBarFunctionality();
hamBurgerFunctionality();
loginFunctinality();
signupFunctionality();
