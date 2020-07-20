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
            console.log(color)
           
         document.querySelector("#container").innerHTML = '<div class="card"><img src= "" class="card-img-top" alt="..."><div class="card-body" id="card-firstproduct"><h3 class="card-title"></h3><p class="card-text"><span class="teddy-price"></span></p><details class="teddy-info"><p class="text"></p><label for="color-select">Couleur</label><select name="colours" class="color-select"></select></details><button class="btn btn-success">Ajouter au panier</button></div></div>';   
        
            document.querySelector('.card-img-top').setAttribute("src", picture);
            document.querySelector(".card-title").textContent = name;
            document.querySelector(".teddy-price").textContent = price+"€";
            
            let fonction = function(e){
                e.stopPropagation();
                e.preventDefault();
                document.querySelector('.text').innerText = desc;
                for (let colour of color){
                    document.querySelector(".color-select").appendChild(document.createElement("option")).innerText = colour;
                };
                document.querySelector(".teddy-info").removeEventListener("toggle", fonction)
            }
                document.querySelector('.teddy-info').addEventListener('toggle', fonction)
        })       
    }
} 
request.open('get', 'http://localhost:3000/api/teddies', true);
request.send();