const orderInformation = window.location.search.substr(1).split("&");
const orderId = orderInformation[0].replace("id=", "");
const totalPrice = orderInformation[1].replace("price=", "");
const userName = orderInformation[2].replace("user=", "");
document.querySelector(".alert-heading").textContent += " " + userName + "!";
document.querySelector("#order").textContent += " " + orderId;
document.querySelector("#command-price").textContent += " " + totalPrice+"€";
console.log(orderInformation)