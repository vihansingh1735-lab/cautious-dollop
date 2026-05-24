<!DOCTYPE html>
<html>
<head>
  <title>Thunder Kartells</title>
</head>
<body style="background:black;color:white;font-family:sans-serif">

<h1>Thunder Kartells Gang Members</h1>

<div id="members"></div>

<script>
async function loadGang() {

  const res = await fetch(
    "http://api.thunderkartells.qzz.io:20253/api/gang",
    {
      headers: {
        "x-api-key": "YOUR_API_KEY"
      }
    }
  );

  const data = await res.json();

  const container = document.getElementById("members");

  data.forEach(member => {

    container.innerHTML += `
      <div style="
        border:1px solid #444;
        padding:10px;
        margin:10px;
        border-radius:10px;
      ">
        <img src="${member.avatar}" width="64">
        <h2>${member.username}</h2>
        <p>${member.id}</p>
      </div>
    `;
  });
}

loadGang();
</script>

</body>
</html>
