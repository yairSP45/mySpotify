const playlist = document.getElementById('listCanciones')
const templateCanciones = document.getElementById('listCan').content
const fragment = document.createDocumentFragment()
const nomAlbum = localStorage.getItem('nomAlbum');
const imgAlbum = localStorage.getItem('imgAlbum');
const botonRegresar = document.getElementById('botonRegresar');


const url = window.location.search
const params = new URLSearchParams(url)
const unoid = params.get('id') 

//console.log('@@id => ',id)

document.addEventListener('DOMContentLoaded', () => {
    fetchPlaylist()
})


botonRegresar.addEventListener('click', () => {
    window.location.replace('/')
});


const fetchPlaylist = async() => {
    const id = unoid.slice(17);
    console.log('@@ id => ', imgAlbum)
    const url = `https://spotify23.p.rapidapi.com/playlist_tracks/?id=${id}&offset=0&limit=100`;
    const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '967e521bcamsh6938cf8cfdcf19dp1071a1jsna179c3dfeed6',
		'X-RapidAPI-Host': 'spotify23.p.rapidapi.com'
	}
};

    try {
	    const response = await fetch(url, options);
	    const result = await response.json();
	    console.log(result);
        creaCanciones(result.items)
        llenaEncabezado(nomAlbum, imgAlbum);
    } catch (error) {
	    console.error(error);
    }
}

const creaCanciones = (result) => {
    playlist.innerHTML = ''
    result.forEach((songs, index) => {
      const clone = templateCanciones.cloneNode(true)
      const numeroCancion = clone.querySelector("#numeroCancion")
      const nomCancion = clone.querySelector("#nomCancion")
      const duracion = clone.querySelector("#duracion")
      const nombresArtistas = clone.querySelector("#nombresArtistas")
      
        
      numeroCancion.textContent = index + 1
      nomCancion.textContent = songs.track.name
      nombresArtistas.textContent = songs.track.artists.map(artists => artists.name).join(', ')
  
      const durMs = songs.track.duration_ms
      const min = Math.floor(durMs / 60000)
      const segundos = Math.floor((durMs % 60000) / 1000)
      const duracionFormateada = `${min}:${segundos < 10 ? "0" : ""}${segundos}`
      duracion.textContent = duracionFormateada
  
  
      fragment.appendChild(clone);
    });
    playlist.appendChild(fragment);
};



const llenaEncabezado = (nomAlbum, imgAlbum) => {
    const nomAlbumElement = document.getElementById("nomAlbum")
    const imgAlbumUrl = `${imgAlbum}`; 
    const imagenAlbumElement = document.getElementById('imagenAlbum');


    imagenAlbumElement.querySelector('img').setAttribute('src', imgAlbumUrl);
    nomAlbumElement.textContent = nomAlbum
};


// console.log('@@@ id => ', id)