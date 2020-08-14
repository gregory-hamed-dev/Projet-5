const orderInformation = window.location.search.substring(1).split("&");//récupération des informations de l'order
const orderId = orderInformation[0].replace("id=", "");
const totalPrice = orderInformation[1].replace("price=", "");
const userName = orderInformation[2].replace("user=", "");
let int = new Intl.NumberFormat("fr-FR", {style: "currency", currency: "EUR", currencyDisplay: "symbol"})// Affichage du nombre formaté pour que celui-ci apparaisse comme un prix en euros
document.querySelector(".alert-heading").textContent += " " + userName + "!";
document.querySelector("#order").textContent += " " + orderId;
document.querySelector("#command-price").textContent += " " + int.format(totalPrice);
console.log(orderInformation)
