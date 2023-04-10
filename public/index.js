const navigationSetup = () => {
  const navItemHead = document.getElementById("nav-item-head")
  const navItemMentor = document.getElementById("nav-item-mentor")
  const navItemMentored = document.getElementById("nav-item-mentored")
  const navItemSubscription = document.getElementById("nav-item-subscription")

  const sectionHead = document.getElementById("section-head")
  const sectionMentor = document.getElementById("section-mentor")
  const sectionMentored = document.getElementById("section-mentored")
  const sectionSubscription = document.getElementById("section-subscription")

  navItemHead.addEventListener("click", () =>
    sectionHead.scrollIntoView({ behavior: "smooth", block: "start" })
  )
  navItemMentor.addEventListener("click", () =>
    sectionMentor.scrollIntoView({ behavior: "smooth", block: "start" })
  )
  navItemMentored.addEventListener("click", () =>
    sectionMentored.scrollIntoView({ behavior: "smooth", block: "start" })
  )
  navItemSubscription.addEventListener("click", () =>
    sectionSubscription.scrollIntoView({ behavior: "smooth", block: "start" })
  )
}

const getValuesFromCheckboxes = (nodes) => {
  const values = []

  nodes.forEach((node) => {
    if (node.checked) {
      values.push(node.value)
    }
  })

  return values
}

const subscriptionSetup = () => {
  const subscriptionSubmitButton = document.getElementById(
    "subscription-submit-button"
  )

  const subcriptionEmailInput = document.getElementById(
    "subscription-email-input"
  )
  const subcriptionCommentsInput = document.getElementById(
    "subscription-comments-input"
  )

  const experienceCheckboxList = document.getElementsByName(
    "checkbox-option-experience"
  )
  const interestCheckboxList = document.getElementsByName(
    "checkbox-option-interest"
  )

  let postRequestPromise

  subscriptionSubmitButton.addEventListener("click", () => {
    if (postRequestPromise !== undefined) {
      console.warn("Existing request promise running")
      return
    }

    subcriptionEmailInput.setCustomValidity("")
    if (!subcriptionEmailInput.checkValidity()) {
      subcriptionEmailInput.setCustomValidity("Email inválido.")
      subcriptionEmailInput.reportValidity()
      return
    }

    const email = subcriptionEmailInput.value
    const comments = subcriptionCommentsInput.value

    const experiences = getValuesFromCheckboxes(experienceCheckboxList)
    const interests = getValuesFromCheckboxes(interestCheckboxList)

    postRequestPromise = fetch("/subscribe", {
      body: JSON.stringify({ email, comments, experiences, interests }),
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.status === 200) {
          alert("Email registrado com sucesso!")
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
}

navigationSetup()
subscriptionSetup()
