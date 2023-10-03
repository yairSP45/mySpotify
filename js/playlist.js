const url = window.location.search
const params = new URLSearchParams(url)
const id = params.get('id')

document.addEventListener('DOMContentLoaded', () => {
    fetchPlaylist()
})

const fetchPlaylist = async() => {
    const url = `https://spotify23.p.rapidapi.com/playlist_tracks/?id=${id}&offset=0&limit=100`;
    const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '3b9cc6b8c2mshba23447eb4bef9fp1358f0jsn133db1042e6c',
		'X-RapidAPI-Host': 'spotify23.p.rapidapi.com'
	}
};

try {
	const response = await fetch(url, options);
	const result = await response.json();
	console.log(result);
    } catch (error) {
	    console.error(error);
    }
}

// console.log('@@@ id => ', id)