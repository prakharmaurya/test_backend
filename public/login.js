const userEmailHTML = document.getElementById("userEmail");
const userPasswordHTML = document.getElementById("userPassword");
const btnformSubmitHTML = document.getElementById("formSubmitter");

const formSubmit = (event) => {
  event.preventDefault();
  console.log(event);
  console.log(userEmailHTML.value);
  console.log(userPasswordHTML.value);

  if (!userEmailHTML.value || !userPasswordHTML.value) {
    alert("Fille All the fields");
    return;
  }
  //
  axios
    .get("http://localhost:3000/profile/", {
      params: {
        email: userEmailHTML.value,
        password: userPasswordHTML.value,
      },
    })
    .then((res) => {
      userEmailHTML.value = null;
      userPasswordHTML.value = null;
      alert(
        `Login Successful, Name: ${res.data.name}, Email: ${res.data.email}`
      );
      window.location.href = "/index.html";
    })
    .catch((err) => {
      alert(`Error : ${err}`);
    });
};

btnformSubmitHTML.addEventListener("click", formSubmit);
