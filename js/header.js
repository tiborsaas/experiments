
fetch('https://api.github.com/rep12os/tiborsaas/experiments/contents').then(function(response) {
	return response.json();
}).then(render).catch(console.log);

function render(json) {
	console.log(json)
}