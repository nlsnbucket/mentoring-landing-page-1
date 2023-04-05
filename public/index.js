const registerEmailInput = document.getElementById("register-email-input")
const registerEmailButton = document.getElementById("register-email-button")

let postRequestPromise

registerEmailButton.addEventListener("click", () => {
  const email = registerEmailInput.value

  if (postRequestPromise !== undefined) {
    console.warn("Existing request promise running")
    return
  }

  postRequestPromise = fetch("/subscribe", {
    body: JSON.stringify({ email }),
    method: "POST",
    headers: {
        "Content-Type": "application/json",
      },
  })
    .then((response) => {
      if (response.status === 200) {
        alert("Email registrado com sucesso!")
        registerEmailInput.value = ""
        return
      }
      alert("Falha ao registrar email!")
    })
    .catch(() => {
      alert("Falha ao registrar email!")
    })
    .finally(() => {
      postRequestPromise = undefined
    })
})
