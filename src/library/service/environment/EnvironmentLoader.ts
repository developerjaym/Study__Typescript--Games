const env = fetch("./environment/environment.json")
.then(response => response.json());

export default await env