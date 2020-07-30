const table = document.querySelector(".table")
const form = document.querySelector("form")
const cartInformation = {
    contact: {},
    products: [],
};
/* Stock le prix total */
let totalprice = 0;

//fonction principale
const showSelection = async () => {
    const getLocalStorageItem = JSON.parse(localStorage.getItem("cardSelection"));
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
            console.log(teddyId)

            cartInformation.products.push(teddyId); // Envoie l'id du produit au tableau products de cartInformation
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
        document.querySelector("body").appendChild(defaultMessage).innerText= "Votre panier est vide"
        defaultMessage.classList.add("text-default")
    }
};
// fonction qui récupère l'image de chaque produit via l'api 
const getItem = async (productId) => {
    const response = await fetch("http://localhost:3000/api/teddies/" + productId);
    return await response.json();
};
// Fonction pour afficher les produits du panier
const renderCart = (imgUrl, name, color, price, quantity) => {
    let article = document.querySelector(".product-list")
    let trChild = document.createElement("tr")
    trChild.classList.add("text-center")
    article.appendChild(trChild)
    trChild.innerHTML = `
    <tr class="text-center">
        <th><img src="${imgUrl}"></th>
        <th>${name}</th>
        <th>${color}</th>
        <th>${price}€</th>
        <th><i class="fas fa-minus"></i>${quantity}<i class="fas fa-plus"></i></th>
        <th><p class="remove "><i class="fas fa-trash-alt"></i></p></th>  
    </tr>`;
    document.querySelector('.total-price').textContent = "Prix total : " + (totalprice += (price * quantity)) + "€"   
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

console.log(cartInformation.products)

