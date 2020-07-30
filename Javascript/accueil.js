//Requête pour récupérer touts les informations produits sur le serveur
const request = new XMLHttpRequest();
request.open('get', 'http://localhost:3000/api/teddies', true);
request.send();
request.onreadystatechange = function(data){
    if(this.readyState === 4  && this.status === 200){
       const datas = JSON.parse(this.responseText);
       const main= document.getElementById("container")
        // récupération des valeurs de chaque produit 
        for (let data of datas){
            let id = data._id;
            let name = data.name;
            let price = data.price;
            let picture = data.imageUrl;
        //affichage des différents produits disponibles 
            let div= document.createElement("div")
            div.classList.add('card')
            div.innerHTML=`<img src= "${picture}" class="card-img-top" alt="...">
            <div class="card-body">
            <h3 class="card-title text-center">${name}</h3>
            <p class="text-center"><span class="teddy-price">${price}€</span></p>
            <p class ="button text-center"><a href="./pages/teddy.html?id=${id}"><i class="fas fa-paw"></i>Voir le produit</a></p>`
            main.append(div)   
        }      
    } 
} 



            

