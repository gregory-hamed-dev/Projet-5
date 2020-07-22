//Requête pour récupérer touts les informations produits sur le serveur
const request = new XMLHttpRequest();

 
request.onreadystatechange = function(data){
    if(this.readyState === 4  && this.status === 200){
      
       const datas = JSON.parse(this.responseText);
       
        // init value
        datas.forEach((data) =>{
            let color = data.colors;
            let id = data._id;
            let name = data.name;
            let price = data.price;
            let desc = data.description;
            let picture = data.imageUrl;
         //création dynamique des différentes fiches produits
            let main= document.querySelector("#container")
            let div= document.createElement("div")
            div.classList.add('card')
            div.innerHTML='<img src= "" class="card-img-top" alt="..."><div class="card-body" id="card-firstproduct"><h3 class="card-title"></h3><p class="card-text"><span class="teddy-price"></span></p><details class="teddy-info"><p class="text"></p><label for="color-select">Couleur</label><select name="colours" class="color-select"></select></details><button class="btn btn-success">Ajouter au panier</button></div>'
            main.prepend(div)
            document.querySelector('.card-img-top').setAttribute("src", picture);
            document.querySelector(".card-title").textContent = name;
            document.querySelector(".teddy-price").textContent = price+"€";
            document.querySelector('.text').textContent = desc;
            for (let colour of color){
                document.querySelector(".color-select").appendChild(document.createElement("option")).innerText = colour;
            };
            //affichage du produit selectionné en appuyant sur la photo
            document.querySelector('.card-img-top').addEventListener("click", function(){
                let parentNode = document.querySelector(".cardSelect")
                document.querySelector(".select-product").classList.add("active");
                let childNode = document.createElement("div");
                childNode.classList.add("card");
                parentNode.appendChild(childNode)     
            })
            
            //ajout des produits dans le local storage
            document.querySelector(".btn-success").addEventListener("click", function(e){
                e.stopPropagation()
                let cardSelection = {
                    picture: picture, 
                    name: name, 
                    id: id, 
                    price: price}
                localStorage.setItem("cardSelection", JSON.stringify(cardSelection))
                document.querySelector('.badge-danger').textContent = this.value ++;
                console.log(cardSelection.name)
                
                
            })

           
            
           
        })       
    }
    
} 
request.open('get', 'http://localhost:3000/api/teddies', true);
request.send();

document.querySelector('.fa-times-circle').addEventListener("click", function(){
document.querySelector('.active').classList.remove("active")
document.querySelector("#container").removeChild("div")
})

            

