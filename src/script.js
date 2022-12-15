window.addEventListener('DOMContentLoaded', () => {
    console.log('DOM fully loaded and parsed');
  });

const form= document.querySelector('form')
const results= document.querySelector('.food-result')
const container= document.querySelector('.container')
let searchQuery= "";
form.addEventListener("submit", (e)=> {
  e.preventDefault();
  searchQuery = e.target.querySelector('input').value;
  console.log(searchQuery)
})
