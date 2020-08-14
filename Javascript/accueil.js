//Requête httpRequest pour récupérer toutes les informations produits sur l'api
let int = new Intl.NumberFormat("fr-FR", {style: "currency", currency: "EUR", currencyDisplay: "symbol"})// Affichage du nombre formaté pour que le prix apparaisse en euros
const request = new XMLHttpRequest();
request.open('get', 'http://localhost:3000/api/teddies/', true);
request.send();
request.onreadystatechange = function(){
    if(this.readyState === 4  && this.status === 200){
       const datas = JSON.parse(this.responseText);
       const main= document.getElementById("container")
        // récupération des valeurs de chaque produit 
        for (let data of datas){
        //affichage des différents produits disponibles en créant du contenu Html dynamiquement
            let div= document.createElement("div")
            div.classList.add('card')
            div.innerHTML=`<img src= "${data.imageUrl}" class="card-img-top" alt="...">
            <div class="card-body">
            <h3 class="card-title text-center">${data.name}</h3>
            <p class="text-center"><span class="teddy-price">${int.format(data.price)}</span></p>
            <p class ="button text-center"><a href="./pages/teddy.html?id=${data._id}"><i class="fas fa-paw"></i>Voir le produit</a></p>`
            main.append(div)
        }      
    } 
} 
//compteur du panier qui s'affiche au niveau de l'icône du panier dans le nav si la clé cardSelection existe dans le local storage
if (localStorage.getItem("cardSelection") !== null) {
    document.querySelector(".badge-danger").textContent = Object.keys(JSON.parse(localStorage.getItem("cardSelection"))).length
}


            

