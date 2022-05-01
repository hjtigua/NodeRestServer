const formulario = document.querySelector("form");

const url = location.hostname.includes("localhost")
  ? "http://localhost:8080/api/auth/"
  : "https://base-server-node.herokuapp.com/api/auth/";

formulario.addEventListener("submit", (ev) => {
  ev.preventDefault();
  const formData = {};
  for (let el of formulario.elements) {
    if (el.name.length > 0) {
      formData[el.name] = el.value;
    }
  }

  fetch(url + "login", {
    method: "POST",
    body: JSON.stringify(formData),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((resp) => resp.json())
    .then(({ msg, token }) => {
      if (msg) {
        return console.log(msg);
      }
      localStorage.setItem("token", token);
      window.location = "chat.html";
    })
    .catch((err) => console.log(err));
});

function handleCredentialResponse(response) {
  // google token: ID_TOKEN
  const body = { id_token: response.credential };
  fetch(url + "google", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(body),
  })
    .then((resp) => resp.json())
    .then(({ token, usuario }) => {
      localStorage.setItem("email", usuario.correo);
      localStorage.setItem("token", token);
      window.location = "chat.html";
    })
    .catch(console.warn);
}

const button = document.querySelector("#google_signout");
button.onclick = () => {
  google.accounts.id.disableAutoSelect;
  google.accounts.id.revoke(localStorage.getItem("email"), (done) => {
    localStorage.clear();
    location.reload();
  });
};
