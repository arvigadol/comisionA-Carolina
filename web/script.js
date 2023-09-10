fetch('http://localhost:3000/api/posteos')
.then(res => res.json())
.then(data => console.log(data))