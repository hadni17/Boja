//Initial References
const spinner = document.getElementById("spinner");
let result = document.getElementById("result");
let searchBtn = document.getElementById("search-btn");
let url = "https://masak-apa-tomorisakura.vercel.app/api/search/?q=";
searchBtn.addEventListener("click", () => {
  let userInp = document.getElementById("user-inp").value;
  spinner.removeAttribute('hidden');
    fetch(url + userInp)
      .then((response) => response.json())
      .then((data) => {    
        spinner.setAttribute('hidden', '');
        result.innerHTML = '';
        console.log(data.results[0].key);
        for(let i =0;i<=2;i++){
            let key = data.results[i].key;
          fetch("https://masak-apa-tomorisakura.vercel.app/api/recipe/"+key)  
           .then((response) => response.json())
           .then((data) => {  
               console.log(data);
               let steps = "<ul class='mx-4 '><li class='mx-4'>"+ data.results.step.join("</li><li class='mx-4'>")+"</li></ul>";
               let bahan = "<ul class='mx-4'><li class='mx-4'>"+ data.results.ingredient.join("</li><hr style='border-top: 1px dashed grey;'><li class='mx-4'>")+"</li><hr></ul>"
                 result.innerHTML += `
                         <div class="border shadow-lg flex text-gray-700 rounded-md px-2 py-2 bg-white m-4">
                            <div class="flex-grow py-3 px-2 grid grid-cols-3">
                                <div class="mx-4">
                                    <img src="${data.results.thumb}" class="mb-4 flag-img max-w-full rounded overflow-hidden">
                                    <div class="font-poppins text-2xl m-2">${data.results.title}</div>
                                    <div class="px-6 pt-4 pb-2">
                                      <span class="inline-block bg-red-400 rounded-full px-3 py-1 text-sm font-semibold text-white mr-2 mb-2">${data.results.servings}</span>
                                      <span class="inline-block bg-green-500 rounded-full px-3 py-1 text-sm font-semibold text-white mr-2 mb-2">${data.results.dificulty}</span>
                                      <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">${data.results.times}</span>
                                    </div>  
                                </div>
                            <div class="col-span-2 p-2 border border-solid border-gray-300 rounded-md">
                                <h2 class="text-xl font-poppins mx-4 py-2">Bahan-bahan:</h2>
                                <p class="font-lg">${bahan}</p>
                                <h2 class="text-xl font-poppins mx-4 py-2">Cara Membuat:</h2>
                                <span class="font-gl text-left"> ${steps}</span>
                            </div>
                            </div>
                         </div>`;
           })
        }
      })
      .catch(() => {
        result.innerHTML = `<h3>Invalid Input</h3>`;
      });
});