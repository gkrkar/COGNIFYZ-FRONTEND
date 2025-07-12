document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("contactForm");
  const submitBtn = document.getElementById("submitBtn");
  const successMessage = document.getElementById("successMessage");

  const fields = {
    fullName: document.getElementById("fullName"),
    email: document.getElementById("email"),
    phone: document.getElementById("phone"),
    age: document.getElementById("age"),
    subject: document.getElementById("subject"),
    message: document.getElementById("message"),
    terms: document.getElementById("terms"),
  };

  const errorElements = {
    fullName: document.getElementById("fullNameError"),
    email: document.getElementById("emailError"),
    phone: document.getElementById("phoneError"),
    age: document.getElementById("ageError"),
    subject: document.getElementById("subjectError"),
    message: document.getElementById("messageError"),
    terms: document.getElementById("termsError"),
  };

  function validateFullName(name) {
    if (name.trim().length < 2) {
      return "Name must be at least 2 characters long";
    }
    if (!/^[a-zA-Z\s]+$/.test(name)) {
      return "Name can only contain letters and spaces";
    }
    return "";
  }

  function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return "Please enter a valid email address";
    }
    return "";
  }

  function validatePhone(phone) {
    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(phone.replace(/\D/g, ""))) {
      return "Please enter a valid 10-digit phone number";
    }
    return "";
  }

  function validateAge(age) {
    const ageNum = parseInt(age);
    if (isNaN(ageNum) || ageNum < 18 || ageNum > 100) {
      return "Age must be between 18 and 100";
    }
    return "";
  }

  function validateSubject(subject) {
    if (!subject) {
      return "Please select a subject";
    }
    return "";
  }

  function validateMessage(message) {
    if (message.trim().length < 10) {
      return "Message must be at least 10 characters long";
    }
    return "";
  }

  function validateTerms(checked) {
    if (!checked) {
      return "You must agree to the terms and conditions";
    }
    return "";
  }

  function showError(fieldName, message) {
    errorElements[fieldName].textContent = message;
    fields[fieldName].classList.remove("valid");
    fields[fieldName].classList.add("invalid");
  }

  function showSuccess(fieldName) {
    errorElements[fieldName].textContent = "";
    fields[fieldName].classList.remove("invalid");
    fields[fieldName].classList.add("valid");
  }

  function validateField(fieldName, value) {
    let error = "";

    switch (fieldName) {
      case "fullName":
        error = validateFullName(value);
        break;
      case "email":
        error = validateEmail(value);
        break;
      case "phone":
        error = validatePhone(value);
        break;
      case "age":
        error = validateAge(value);
        break;
      case "subject":
        error = validateSubject(value);
        break;
      case "message":
        error = validateMessage(value);
        break;
      case "terms":
        error = validateTerms(value);
        break;
    }

    if (error) {
      showError(fieldName, error);
      return false;
    } else {
      showSuccess(fieldName);
      return true;
    }
  }

  Object.keys(fields).forEach((fieldName) => {
    const field = fields[fieldName];

    field.addEventListener("blur", function () {
      const value = fieldName === "terms" ? field.checked : field.value;
      validateField(fieldName, value);
    });

    field.addEventListener("input", function () {
      const value = fieldName === "terms" ? field.checked : field.value;
      if (field.classList.contains("invalid")) {
        validateField(fieldName, value);
      }
    });
  });

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    let isValid = true;

    Object.keys(fields).forEach((fieldName) => {
      const field = fields[fieldName];
      const value = fieldName === "terms" ? field.checked : field.value;

      if (!validateField(fieldName, value)) {
        isValid = false;
      }
    });

    if (isValid) {
      submitBtn.disabled = true;
      submitBtn.textContent = "Sending...";

      setTimeout(() => {
        form.style.display = "none";
        successMessage.style.display = "block";

        setTimeout(() => {
          form.reset();
          form.style.display = "block";
          successMessage.style.display = "none";
          submitBtn.disabled = false;
          submitBtn.textContent = "Send Message";

          Object.keys(fields).forEach((fieldName) => {
            fields[fieldName].classList.remove("valid", "invalid");
            errorElements[fieldName].textContent = "";
          });
        }, 3000);
      }, 1000);
    }
  });
});
