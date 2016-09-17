
fetch('https://api.github.com/repos/tiborsaas/experiments/contents').then(function(response) {
	return response.json();
}).then(render).catch(console.log);

function render(json) {
	console.log(json)
}