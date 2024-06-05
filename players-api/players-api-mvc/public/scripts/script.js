async function fetchBooks() {
    const response = await fetch("/players"); // Replace with your API endpoint
    const data = await response.json();
  
    const bookList = document.getElementById("book-list");
  
    data.forEach((player) => {
      const playerItem = document.createElement("div");
      playerItem.classList.add("player"); // Add a CSS class for styling
  
      // Create elements for title, author, etc. and populate with book data
      const usernameElement = document.createElement("h2");
      usernameElement.textContent = player.username;
        
      const docElement = document.createElement("p");
      docElement.textContent = `Date Of Creation: ${player.doc}`;
  
      // ... add more elements for other book data (optional)
  
      playerItem.appendChild(usernameElement);
      playerItem.appendChild(docElement);
      // ... append other elements
  
      bookList.appendChild(playerItem);
    });
  }
  
  fetchBooks(); // Call the function to fetch and display book data