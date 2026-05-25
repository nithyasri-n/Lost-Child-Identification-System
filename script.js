let API = "http://localhost:5000/children";

function login(){
  let u = document.getElementById("user").value;
  let p = document.getElementById("pass").value;

  if(u==="admin" && p==="1234"){
    document.getElementById("loginBox").style.display="none";
    document.getElementById("app").classList.remove("hidden");
    loadChildren();
  } else {
    alert("Invalid login");
  }
}

function addChild(){

  let name = document.getElementById("name").value;
  let age = document.getElementById("age").value;
  let location = document.getElementById("location").value;

  let mapLink = `https://www.google.com/maps?q=${location}`;

  fetch(API, {
    method:"POST",
    headers:{"Content-Type":"application/json"},
    body:JSON.stringify({
      name, age, location, mapLink
    })
  }).then(()=>{
    alert("Child Reported + Notification Sent");
    loadChildren();
  });

}

function loadChildren(){

  fetch(API)
  .then(res=>res.json())
  .then(data=>{

    let search = document.getElementById("search")?.value || "";

    let list = document.getElementById("list");
    list.innerHTML="";

    data
    .filter(c=>c.name.toLowerCase().includes(search))
    .forEach(c=>{

      list.innerHTML += `
        <div class="child">
          <h3>${c.name}</h3>
          <p>Age: ${c.age}</p>
          <p>Location: ${c.location}</p>

          <a href="${c.mapLink}" target="_blank">
            View on Map
          </a>

          <br><br>

          <button onclick="deleteChild('${c.id}')">Delete</button>
        </div>
      `;
    });

  });

}

function deleteChild(id){
  fetch(API+"/"+id,{method:"DELETE"})
  .then(()=>{
    alert("Deleted");
    loadChildren();
  });
}