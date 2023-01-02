const reqTemplate = {
    method: "GET",
    headers: {
        "Content-Type": "application/json"
    }
};

let ans
fetch("https://jsonplaceholder.typicode.com/todos/1",reqTemplate)
    .then(response => response.json())
    .then(data => {
        ans = data;
        console.log(data);
    })
    .catch(error => {
        console.error(error);
    })