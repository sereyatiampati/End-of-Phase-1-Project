window.addEventListener('DOMContentLoaded', () => {
    console.log('DOM fully loaded and parsed');
  });

  let getText = document.getElementById('search-input').value.trim();
  fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${getText}`)
  .then(result=>result.json())
  .then(data=> {
      console.log(data)
  })