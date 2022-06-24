let finalURL = `https://masak-apa-tomorisakura.vercel.app/api/recipes/1`;
fetch(finalURL)
    .then((response) => response.json())
    .then((data) => {
        // console.log(data);
        // console.log(data.results[0].title);
        // console.log(data.results[0].thumb);
        for(let i =0;i<4;i++){
            // console.log(data.results[i]);
            content.innerHTML += `
            <div class="mt-4 max-w-sm rounded overflow-hidden shadow-lg">            
            <img src="${data.results[i].thumb}" class="flag-img">
            <div class="px-6 py-4">
                <div class="font-bold text-xl mb-2">${data.results[i].title}</div>
            </div>
            <div class="px-6 pt-4 pb-2">
                <span class="inline-block bg-red-400 rounded-full px-3 py-1 text-sm font-semibold text-white mr-2 mb-2">${data.results[i].portion}</span>
                <span class="inline-block bg-green-500 rounded-full px-3 py-1 text-sm font-semibold text-white mr-2 mb-2">${data.results[i].dificulty}</span>
                <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">${data.results[i].times}</span>
            </div>  
        </div>
        `};
    })
    .catch(() => {
      if (data.length == 0) {
      console.log("null");
      }
    });

