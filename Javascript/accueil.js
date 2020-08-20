// appel à l'api pour récupérer les produits disponibles. Utiisation d'une fonction async
const askTeddies = ()=> fetch('http://localhost:3000/api/teddies/')
.then(response => response.json())
.then(datas =>{
    const main= document.getElementById("container");
    let int = new Intl.NumberFormat("fr-FR", {style: "currency", currency: "EUR", currencyDisplay: "symbol"})// Affichage du nombre formaté pour que le prix apparaisse en euros
    // récupération des valeurs de chaque produit 
    for (let data of datas){ 
        //affichage des différents produits disponibles en créant du contenu Html dynamiquement
        let div= document.createElement("div");
        div.classList.add('card');
        div.innerHTML=`<img src= "${data.imageUrl}" class="card-img-top" alt="...">
        <div class="card-body">
            <h3 class="card-title text-center">${data.name}</h3>
            <p class="text-center"><span class="teddy-price">${int.format(data.price)}</span></p>
            <p class ="button text-center"><a href="./pages/teddy.html?id=${data._id}"><i class="fas fa-paw"></i>Voir le produit</a></p>
        </div>`;
            main.append(div);
        };    
    });
//compteur du panier qui s'affiche au niveau de l'icône du panier dans le nav si la clé cardSelection existe dans le local storage
if (localStorage.getItem("cardSelection") !== null) {
    document.querySelector(".badge-danger").textContent = Object.keys(JSON.parse(localStorage.getItem("cardSelection"))).length;
}
askTeddies();
            

