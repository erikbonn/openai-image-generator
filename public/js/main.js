function onSubmit(e) {
  e.preventDefault()
  debugger
  document.querySelector(".msg").textContent = ""
  document.querySelector("#image").src = ""

  const prompt = document.querySelector("#prompt").value
  const size = document.querySelector("#size").value

  if (prompt === "") {
    alert("Please add some text")
    return
  }

  generateImageRequest(prompt, size)
}

async function generateImageRequest(prompt, size) {
  try {
    showSpinner()

    const response = await fetch("/openai/generateimage", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt,
        size,
      }),
    })

    if (!response.ok) {
      removeSpinner()
      throw new Error("That image could not be generated")
    }

    const data = await response.json()
    // console.log(data);

    // new ClipboardJS(".btn")
    const imageUrl = data.data
    document.querySelector("#copy").setAttribute("value", imageUrl)
    document.querySelector("#image").src = imageUrl

    removeSpinner()
  } catch (error) {
    document.querySelector(".msg").textContent = error
  }
}

function copyLink() {
  const copyText = document.getElementById("copy")
  console.log("made it here", copyText)

  copyText.select()
  copyText.setSelectionRange(0, 99999) // for mobile devices
  navigator.clipboard.writeText(copyText.value)
  console.log("val", copyText.value)
  debugger
  // alert(`Copied link ${copyText.value}`)
}

function showSpinner() {
  document.querySelector(".spinner").classList.add("show")
}

function removeSpinner() {
  document.querySelector(".spinner").classList.remove("show")
}

document.querySelector("#image-form").addEventListener("submit", onSubmit)
