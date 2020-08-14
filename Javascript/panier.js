const table = document.querySelector(".table")
const form = document.querySelector("form")
const submitButton = document.getElementById("btn-submit")
const commandInfo = {
  contact: {},
  products: [],
};
/* Stock le prix total */
let totalprice = 0;

//fonction principale
const showSelection = async () => {
  const getLocalStorageItem = JSON.parse(localStorage.getItem("cardSelection"));
  if (localStorage.getItem("cardSelection") !== null) { // vérifie que la clé existe bien dans le local storage
    if (Object.keys(getLocalStorageItem).length > 0) {
      for (let i = 0; i < Object.keys(getLocalStorageItem).length; i++) {
        // Pour chaque article du panier
        const itemId = Object.keys(getLocalStorageItem)[i];
        const teddyId = getLocalStorageItem[itemId].id;
        const teddyname = getLocalStorageItem[itemId].name;
        const teddycolor = getLocalStorageItem[itemId].color
        const teddyprice = getLocalStorageItem[itemId].price;
        const teddyquantity = getLocalStorageItem[itemId].quantity;
        const product = await getItem(itemId); //appel de la fonction qui communique avec l'api
        const teddyImg = product.imageUrl; // récupération de la photo via l'api
        commandInfo.products.push(teddyId); // Envoie l'id du produit au tableau products de commandInfo
        renderCart(teddyImg, teddyname, teddycolor, teddyprice, teddyquantity); // Fourni l'affichage du/des produits du panier
        const remove = document.querySelectorAll(".remove")[i];
        const productLine = document.querySelectorAll(".text-center")[i];
        const minus = document.querySelectorAll(".fa-minus")[i];
        const plus = document.querySelectorAll(".fa-plus")[i];
        deleteCart(remove, productLine, itemId);
        lessItem(minus, productLine, itemId);
        moreItem(plus, productLine, itemId);
      }
    } else {
      table.classList.add("hide");
      form.classList.add("hide")
      let defaultMessage = document.createElement("p")
      document.querySelector("body").appendChild(defaultMessage).innerText = "Votre panier est vide"
      defaultMessage.classList.add("text-default")
    }

    document.querySelector(".badge-danger").textContent = Object.keys(JSON.parse(localStorage.getItem("cardSelection"))).length// notification du nombre de produits dans le panier
  }

};
// fonction qui récupère l'image de chaque produit via l'api 
const getItem = async (productId) => {
  const response = await fetch("http://localhost:3000/api/teddies/" + productId);
  return await response.json();
};
// Fonction pour afficher les produits du panier
const renderCart = (imgUrl, name, color, price, quantity) => {
  const article = document.querySelector(".product-list")
  const trChild = document.createElement("tr")
  const int = new Intl.NumberFormat("fr-FR", {style: "currency", currency: "EUR", currencyDisplay: "symbol"})
  trChild.classList.add("text-center")
  article.appendChild(trChild)
  trChild.innerHTML = `
    <tr class="text-center">
        <th class="head" scope="row"><img class="table-image" src="${imgUrl}"></th>
        <td>${name}</td>
        <td>${color}</td>
        <td>${int.format(price)}</td>
        <td><i class="fas fa-minus"></i><span class="quantity">${quantity}</span><i class="fas fa-plus"></i></td>
        <td><p class="remove "><i class="fas fa-trash-alt"></i></p></td>  
    </tr>`;
  document.querySelector('.total-price').textContent = "Prix total : " + int.format(totalprice += (price * quantity))
};

const deleteCart = (suppElement, container, productId) => {
  suppElement.addEventListener("click", async () => {
    const panier = JSON.parse(localStorage.getItem("cardSelection"));
    if (panier === null) return;
    if (panier[productId] === undefined) return;
    else {
      delete panier[productId];
    }
    localStorage.setItem("cardSelection", JSON.stringify(panier));
    container.remove();
    location.reload(true);
  });
};

const lessItem = (minus, container, productId) => {
  minus.addEventListener("click", () => {
    const panier = JSON.parse(localStorage.getItem("cardSelection"));
    if (panier === null) return;
    if (panier[productId] === undefined) return;
    if (panier[productId].quantity > 1) {
      panier[productId].quantity--;
    } else {
      delete panier[productId];
    }
    localStorage.setItem("cardSelection", JSON.stringify(panier));
    container.remove();
    location.reload(true);
  });
};

const moreItem = (plus, container, productId) => {
  plus.addEventListener("click", () => {
    const panier = JSON.parse(localStorage.getItem("cardSelection"));
    if (panier === null) return;
    if (panier[productId] === undefined) return;
    if (panier[productId].quantity >= 1) {
      panier[productId].quantity++;
    } else {
      delete panier[productId];
    }
    localStorage.setItem("cardSelection", JSON.stringify(panier));
    container.remove();
    location.reload(true);
  });
};
showSelection();

//validation du formulaire//

/*vérification des contenus */ 
const containNumber = /[0-9]/;
const regexEmail = new RegExp("^[a-zA-Z0-9.-_]+[@]{1}[a-z]+[.]{1}[a-z]{2,4}$", "g"); // expression régulière pour valider plusieurs types d'adresse mail
const specialCharacter = /[$&+,:;=?@#|'<>.^*()%!"{}_"]/;
const isNotEmpty = (value) => (value !== "" ? true : false); // Vérifie que la valeur donnée ne soit pas vide
const isLongEnough = (value) => (value.length >= 3 ? true : false); // Vérifie que la valeur donnée ait assez de caractère
const doNotContainNumber = (value) =>
  !value.match(containNumber) ? true : false; // Vérifie que la valeur donnée ne possède pas de chiffre
const doNotContainSpecialCharacter = (value) =>
  !value.match(specialCharacter) ? true : false; // Vérifie que la valeur donnée ne possède pas de symbole
const isValidEmail = (value) => (regexEmail.test(value) ? true : false); // test pour vérifier que l'utilisateur a bien rentré un format d'adresse mail correct
const isValidInput = (value) =>
  isNotEmpty(value) && isLongEnough(value) && doNotContainNumber(value) && doNotContainSpecialCharacter(value);

// Récupère les éléments du formulaire
const firstname = form.elements.firstname;
const name = form.elements.name;
const address = form.elements.address;
const city = form.elements.ville;
const email = form.elements.mail;
const btn = document.getElementById("btn-submit");

const firstNameErr = document.getElementById("first-name-error");
const nameErr = document.getElementById("name-error");
const addressErr = document.getElementById("adress-error");
const townErr = document.getElementById("town-error");
const mailErr = document.getElementById("mail-error");

//Permet de vérifier les saisies utilisateurs
const formValidate = () => {
  if (isValidInput(firstname.value)) {
    firstNameErr.textContent = "Valide";
    firstNameErr.style.color = "green"

    if (isValidInput(name.value)) {
      nameErr.textContent = "Valide";
      nameErr.style.color = "green"

      if (isNotEmpty(address.value) && isLongEnough(address.value)) {
        addressErr.textContent = "Valide";
        addressErr.style.color = "green"

        if (isValidInput(city.value)) {
          townErr.textContent = "Valide";
          townErr.style.color = "green"

          if (isValidEmail(email.value)) {
            mailErr.textContent = "Valide";
            mailErr.style.color = "green"

            return (commandInfo.contact = {
              // Si toutes les inputs saisies sont valides, renvoie l'objet contact à commandInfo
              firstName: firstname.value,
              lastName: name.value,
              address: address.value,
              city: city.value,
              email: email.value,
            });
          } else {
            mailErr.textContent =
              "Vous devez renseigner une adresse mail valide !";
            email.focus();
            return false;
          }
        } else {
          townErr.textContent = "Vous devez renseigner correctement votre ville !";
          city.focus();
          return false;
        }
      } else {
        addressErr.textContent = "Vous devez renseigner correctement votre adresse !";
        address.focus();
        return false;
      }
    } else {
      nameErr.textContent = " Vous devez renseigner correctement votre nom !";
      name.focus();
      return false;
    }
  } else {
    firstNameErr.textContent = "Vous devez renseigner correctement votre prénom !";
    firstName.focus();
    return false;
  }
};
const postData = async (method, url, dataElt) => {
  const response = await fetch(url, {
    headers: {
      "Content-Type": "application/json"
    },
    method,
    body: JSON.stringify(dataElt),
  });
  return await response.json();
};
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  // Valide le formulaire
  if (formValidate()) {
    const response = await postData("POST", 'http://localhost:3000/api/teddies/order', commandInfo);
    window.location = `./recap.html?id=${response.orderId}&price=${totalprice}&user=${firstname.value}`;
    localStorage.removeItem("cardSelection")
  }
})

if (localStorage.getItem("cardSelection") === null) {
  table.classList.add("hide");
  form.classList.add("hide")
  let defaultMessage = document.createElement("p")
  document.querySelector("body").appendChild(defaultMessage).innerText = "Votre panier est vide"
  defaultMessage.classList.add("text-default")
}
