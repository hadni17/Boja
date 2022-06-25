//Initial References
let result = document.getElementById("result");
let searchBtn = document.getElementById("search-btn");
let url = "https://masak-apa-tomorisakura.vercel.app/api/search/?q=";
searchBtn.addEventListener("click", () => {
  let userInp = document.getElementById("user-inp").value;
  if (userInp.length == 0) {
    result.innerHTML = `<h3>Input Field Cannot Be Empty</h3>`;
  } else {
    fetch(url + userInp)
      .then((response) => response.json())
      .then((data) => {    
        result.innerHTML = '';
        console.log(data.results[0].key);
        for(let i =0;i<=2;i++){
            let key = data.results[i].key;
          fetch("https://masak-apa-tomorisakura.vercel.app/api/recipe/"+key)  
           .then((response) => response.json())
           .then((data) => {  
               console.log(data);
               let steps = "<ul><li>"+ data.results.step.join("</li><li>")+"</li></ul>";
               let bahan = "<ul><li>"+ data.results.ingredient.join("</li><li>")+"</li></ul>"
                 result.innerHTML += `
                         <div class="border shadow-lg flex text-gray-700 rounded-md px-2 py-2 bg-white m-4">
                            <div class="flex-grow py-3 px-2 grid grid-cols-3">
                                <div class="mx-4">
                                    <img src="${data.results.thumb}" class="flag-img max-w-full rounded overflow-hidden">
                                    <div class="font-bold text-2xl mb-2">${data.results.title}</div>
                                    <div class="px-6 pt-4 pb-2">
                                    <span class="inline-block bg-red-400 rounded-full px-3 py-1 text-sm font-semibold text-white mr-2 mb-2">${data.results.servings}</span>
                                    <span class="inline-block bg-green-500 rounded-full px-3 py-1 text-sm font-semibold text-white mr-2 mb-2">${data.results.dificulty}</span>
                                    <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">${data.results.times}</span>
                                </div>  
                                </div>
                                <div class="text-left col-span-2 mb-2 bg-red-200 rounded-md">
                                    <h2 class="text-xl font-bold">Bahan-bahan:</h2>
                                    <span class="font-small">${bahan}</span>
                                    <h2 class="text-xl font-bold">Cara Membuat:</h2>
                                    <span class="font-small text-left"> ${steps}</span>
                                </div>
                            </div>
                         </div>`;
           })
        }
      })
      .catch(() => {
        result.innerHTML = `<h3>Invalid Input</h3>`;
      });
  }
});