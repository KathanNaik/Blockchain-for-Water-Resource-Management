fetch("http://localhost:3000/api/nodes").then((data)=>{
    return data.json();
}).then((objectData)=>{

    let tableData = "";
    objectData.map((values)=>{
        tableData += 
        `<tr>
        <td>${values.name}</td>
        <td>${values.balance}</td>
        <td>${values.type}</td>
        <td>${values.public_key}</td>
        </tr>`
    });

    document.getElementById("tb").innerHTML = tableData;

}); 

fetch("http://localhost:3000/api/blocks").then((data)=>{
    return data.json();
}).then((objectData)=>{

    let tableData = "";
    objectData.map((values)=>{

        tableData += 
        `<tr>
        <td>${values.signer_node}</td>
        <td>${values.timeStamp}</td>
        <td>${values.lastHash}</td>
        <td>${values.data}</td>
        <td>${values.difficulty}</td>
        <td>${values.Nonce}</td>
        <td>${values.hash}</td>
        </tr>`
    });

    document.getElementById("tbe").innerHTML = tableData;

}); 



