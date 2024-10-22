let result;

function userForm() {
  const form = document.forms["mainform"];
  const firstName = form["first-name"].value;
  const lastName = form["last-name"].value;
  const email = form["email"].value;
  const address = form["address"].value;
  const city = form["city"].value;
  const province = form["province"].value;
  const membership = form["membership"].value;

  const output = `
    <p><strong>Full Name:</strong> ${firstName} ${lastName}</p>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Address:</strong> ${address}</br> ${city} ${province}</p>
    <p><strong>Membership:</strong> ${membership}</p>
    `;
  document.getElementById("output").innerHTML = output;
  document.getElementById("output").style.display = "block";
}

function myExcelFuns() {
  const numberStr = document.getElementById("numbers").value.trim();
  if (numberStr == null || numberStr === "") {
    alert("Please enter some numbers");
    return;
  } else {
    let numbers = "";
    for (let i = 0; i < numberStr.length; i++) {
      if (!(numberStr[i] === " " && numberStr[i - 1] === " ")) {
        numbers += numberStr[i];
      }
    }
    const finalNumericalArray = numbers.split(" ").map(Number);

    const formExcel = document.forms["excelform"];
    const operation = formExcel["operation"].value;

    if (operation == "sum") {
      result = 0;
      for (let i = 0; i < finalNumericalArray.length; i++) {
        result += finalNumericalArray[i];
      }
    } else if (operation == "average") {
      let sum = 0;
      for (let i = 0; i < finalNumericalArray.length; i++) {
        sum += finalNumericalArray[i];
      }
      result = sum / finalNumericalArray.length;
    } else if (operation == "max") {
      result = Math.max(...finalNumericalArray);
    } else if (operation == "min") {
      result = Math.min(...finalNumericalArray);
    }

    document.getElementById("result").innerHTML = `
    <p><strong>The value of the ${operation} of your input is:</strong></p>
    <p>${result}</p>
    `;
    document.getElementById("result").style.display = "block";
  }
}

const sendButton = document.getElementById("send");
if (sendButton) {
  sendButton.addEventListener("click", userForm);
}

const calculateButton = document.getElementById("calculate");
if (calculateButton) {
  calculateButton.addEventListener("click", myExcelFuns);
}

const resetButton = document.getElementById("reset");
if (resetButton) {
  resetButton.addEventListener("click", () => {
    document.getElementById("output").style.display = "none";
  });
}

document
  .getElementById("dark-theme-btn")
  .addEventListener("click", function () {
    document.body.classList.add("dark-theme");
    document.body.classList.remove("warm-theme");
  });

document
  .getElementById("warm-theme-btn")
  .addEventListener("click", function () {
    document.body.classList.add("warm-theme");
    document.body.classList.remove("dark-theme");
  });
