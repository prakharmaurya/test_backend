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
      console.log(res.data);
      if (res.data.user) {
        alert(
          `Message : ${res.data.message},Name: ${res.data.user.name} Email: ${res.data.user.email} Role : ${res.data.user.role}`
        );
      } else {
        alert(`Message : ${res.data.message}`);
      }
      if (res.data.statusCode === 200) {
        window.location.href = "/index.html";
      }
    })
    .catch((err) => {
      console.log(err);
      alert(`Error : ${err}`);
    });
};

btnformSubmitHTML.addEventListener("click", formSubmit);
