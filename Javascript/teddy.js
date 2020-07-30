const url = "http://localhost:3000/api/teddies/"
const getId = new URLSearchParams(window.location.search).get("id");
const mainContainer = document.getElementById("main-container")

//déclaration de la fonction principale de la page
const Product = async () => {
    const data = await teddy(url, getId);
    TeddyDetails(data);
    addSelection(data)
};
//fonction pour entrer en contact avec l'api
const teddy = async (teddyUrl, teddyId) => {
    const response = await fetch(teddyUrl + teddyId);
    return await response.json();
};
//fonction qui récupére les informations détaillées du produit demandé par l'utilisateur
const TeddyDetails = (Data) => {
    mainContainer.innerHTML = `
        <div class="product">
            <div class="information">
                <p class ="button text-center" style="width: 25%">
                    <a href="../index.html"><i class="fas fa-paw"></i>Revenir à l'accueil</a>
                </p>
                <h2 class="product-title">${Data.name}</h2>
                <img class="display-picture" src="${Data.imageUrl}" alt="${Data.name}">
                <p class="price-here">${Data.price}€</p>
                <p class="description">${Data.description}</p>
                <div class="list">
                    <label for="color-select"><i class="fas fa-palette"></i>Choix de la couleur :</label>
                    <select name="colors" class="color-list"></select>
                </div>
                <p class="panier">Ajouter un câlin</p>
            </div>
        </div>`
    for (let colour of Data.colors) {
        document.querySelector(".color-list").appendChild(document.createElement("option")).innerText = colour;
    };
}
//fonction pour ajouter les produits dans le localStorage
const addSelection = (Data) => {
    document.querySelector(".panier").addEventListener("click", (e) => {
        let colorChoise = document.querySelector(".color-list").value
        const shopList = {
            id: Data._id,
            picture: Data.imageUrl,
            name: Data.name,
            color: colorChoise,
            price: Data.price,
            quantity: 1,
        }
        let panier = JSON.parse(localStorage.getItem("cardSelection"))

        if (panier === null) {
            panier = {}
        }
        if (panier[Data._id] !== undefined) {
            panier[Data._id];
        }
        else {
            panier[Data._id] = shopList;
        }
        localStorage.setItem("cardSelection", JSON.stringify(panier))
        alert("Votre produit a été ajoutée au panier") 
        location.reload(true); 
        
    })
    document.querySelector(".badge-danger").textContent = Object.keys(JSON.parse(localStorage.getItem("cardSelection"))).length
}
Product()
