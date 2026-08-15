const loadStargazers = async () => {
  const list = document.querySelector("#starred");
  const errorDiv = document.querySelector("#error");
  const loadingDiv = document.querySelector("#loading");

  try {
    const response = await fetch("events.json");
    
    if (!response.ok) {
      throw new Error(`Failed to load data: ${response.status} ${response.statusText}`);
    }
    
    const events = await response.json();
    
    if (!Array.isArray(events) || events.length === 0) {
      errorDiv.textContent = "No starred repositories found.";
      errorDiv.classList.remove("hidden");
      loadingDiv.remove();
      return;
    }
    
    events.forEach((event) => {
      if (!event.name || !event.starred) {
        console.warn("Skipping invalid event:", event);
        return;
      }
      
      const item = document.createElement("li");
      item.role = "listitem";
      
      const repoName = document.createElement("strong");
      repoName.textContent = event.name;
      
      const starredDate = new Date(event.starred);
      const formattedDate = starredDate.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric"
      });
      
      item.appendChild(repoName);
      item.appendChild(document.createTextNode(` — starred on ${formattedDate}`));
      
      list.appendChild(item);
    });
    
    errorDiv.classList.add("hidden");
    loadingDiv.remove();
  } catch (error) {
    console.error("Error loading stargazers:", error);
    errorDiv.textContent = `Error: ${error.message}. Please try refreshing the page.`;
    errorDiv.classList.remove("hidden");
    loadingDiv.remove();
  }
};

loadStargazers();
