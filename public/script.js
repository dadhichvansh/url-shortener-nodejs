const fetchShortenedUrl = async () => {
  const response = await fetch("/links");
  const links = await response.json();
  console.log("links ", links);

  const list = document.getElementById("shortened-urls");
  list.innerHTML = "";

  for (const [shortCode, url] of Object.entries(links)) {
    const li = document.createElement("li");
    const truncatedUrl = url.length >= 30 ? `${url.slice(0, 30)}...` : url;
    li.innerHTML = `<a href="/${shortCode}" target="_blank">${window.location.origin}/${shortCode}</a> - ${truncatedUrl}`;
    list.appendChild(li);
  }
};

document
  .getElementById("url-shortener-form")
  .addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const url = formData.get("url");
    const shortCode = formData.get("shortCode");

    console.log(url, shortCode);

    try {
      const response = await fetch("/shorten", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url, shortCode }),
      });

      if (response.ok) {
        fetchShortenedUrl();
        alert("Form submitted successfully!");
        e.target.reset();
      } else {
        const errorMessage = await response.text();
        alert(errorMessage);
      }
    } catch (error) {
      console.log(error);
    }
  });

fetchShortenedUrl();
