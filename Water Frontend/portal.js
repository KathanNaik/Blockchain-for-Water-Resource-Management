fetch("http://localhost:3000/api/wallet").then((data)=>{
    return data.json();
}).then((objectData)=>{

    objectData.map((values)=>{

      document.getElementById("Nam").innerHTML = values.name;
        document.getElementById("Bal").innerHTML = values.balance;

        if(values.type == 3){
            document.getElementById("Typ").innerHTML = "Admin";
        }
        else if(values.type == 2){
            document.getElementById("Typ").innerHTML = "Procumer";
        }
        else if(values.type == 1){
            document.getElementById("Typ").innerHTML = "Consumer";
        }

        document.getElementById("Pub").innerHTML = values.public_key;
        document.getElementById("Ownkey").value = values.public_key;
    });

});

function myFunction() {
    document.getElementById("myDIV").style.zIndex = "1";

  }
