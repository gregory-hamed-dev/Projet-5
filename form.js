/*
const containNumber = /[0-9]/;
const regexEmail = /.+@.+\..+/;
const specialCharacter = /[$&+,:;=?@#|'<>.^*()%!"{}_"]/;

const isNotEmpty = (value) => (value !== "" ? true : false); // Vérifie que la valeur donnée ne soit pas vide
const isLongEnough = (value) => (value.length >= 2 ? true : false); // Vérifie que la valeur donnée ait assez de caractère
const doNotContainNumber = (value) =>
  !value.match(containNumber) ? true : false; // Vérifie que la valeur donnée ne possède pas de chiffre
const doNotContainSpecialCharacter = (value) =>
  !value.match(specialCharacter) ? true : false; // Vérifie que la valeur donnée ne possède pas de symbole
const isValidEmail = (value) => (value.match(regexEmail) ? true : false); // Vérifie que la valeur donnée soit bien dans le format email

const isValidInput = (value) =>
  isNotEmpty(value) &&
  isLongEnough(value) &&
  doNotContainNumber(value) &&
  doNotContainSpecialCharacter(value); // renvoie true si toutes les conditions sont vérifiées

// Récupère les éléments du formulaire
const firstname = form.elements.firstname;
const lastname = form.elements.lastname;
const address = form.elements.address;
const city = form.elements.city;
const email = form.elements.email;
const btn = document.getElementById("btn");

const firstnameErrorMessage = document.getElementById("firstnameErrorMessage");
const lastnameErrorMessage = document.getElementById("lastnameErrorMessage");
const addressErrorMessage = document.getElementById("addressErrorMessage");
const cityErrorMessage = document.getElementById("cityErrorMessage");
const emailErrorMessage = document.getElementById("emailErrorMessage");

//Permet de vérifier les saisies utilisateurs
const formValidate = () => {
  if (isValidInput(firstname.value)) {
    firstnameErrorMessage.textContent = "";

    if (isValidInput(lastname.value)) {
      lastnameErrorMessage.textContent = "";

      if (isNotEmpty(address.value) && isLongEnough(address.value)) {
        addressErrorMessage.textContent = "";

        if (isValidInput(city.value)) {
          cityErrorMessage.textContent = "";

          if (isValidEmail(email.value)) {
            emailErrorMessage.textContent = "";

            return (cartInformation.contact = {
              // Si toutes les inputs saisies sont valides, renvoie l'objet contact à cartInformation
              firstname: firstname.value,
              lastname: lastname.value,
              address: address.value,
              city: city.value,
              email: email.value,
            });
          } else {
            emailErrorMessage.textContent =
              "Merci de renseigner votre adresse mail !";
            email.focus();
            return false;
          }
        } else {
          cityErrorMessage.textContent = "Merci de renseigner votre ville !";
          city.focus();
          return false;
        }
      } else {
        addressErrorMessage.textContent = "Merci de renseigner votre adresse !";
        address.focus();
        return false;
      }
    } else {
      lastnameErrorMessage.textContent = " Merci de renseigner votre nom !";
      lastname.focus();
      return false;
    }
  } else {
    firstnameErrorMessage.textContent = "Merci de renseigner votre prénom !";
    firstname.focus();
    return false;
  }
};
// Envoie données à l'api
const postData = async (method, url, dataElt) => {
  const response = await fetch(url, {
    headers: {"Content-Type": "application/json", }, method, body: JSON.stringify(dataElt), });
    return await response.json();
};

btn.addEventListener("click", async (e) => {
  e.preventDefault();
  const validForm = formValidate(); // Valide le formulaire
  if (validForm !== false) {
    const response = await postData(
      "POST",
      "http://localhost:3000/api/teddies/order",
      cartInformation
    ); // Envoie données au serveur
    window.location = `./confirmation.html?id=${response.orderId}&price=${totalprice}&user=${firstname.value}`; // Redirige vers la page de confirmation de commande
    localStorage.removeItem("panier");
  }
});
*/