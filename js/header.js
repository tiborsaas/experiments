
/**
 * This 'module' is responsible for keeping all experiment header up to date
 * It simply loads the file list of this very same repository and picks the 
 * directories starting with xxx-experiment-name
 */

fetch('https://api.github.com/repos/tiborsaas/experiments/contents').then( response => {
	return response.json();
}).then( renderHeader ).catch( console.log );

const headerTemplate = `<div>
	<a class="github" href="https://github.com/tiborsaas/experiments" title="Code for this repository"></a>
	<a class="tibor" href="http://tibor.szasz.hu" title="My portfolio"></a>
	<h1>Experiments in generative art</h1>
</div>`;

function renderHeader( files ) {
	const header = document.querySelector('header#main');
	const template = document.createElement('div');
	template.innerHTML = headerTemplate;

	// Filter firectories
	const experiments = files.filter( item => {
		const wouldExperiment = new RegExp(/^[0-9]{3}-/);
		return ( item.type == 'dir' && wouldExperiment.test( item.name ) );
	});

	// Assemble the DOM
	const select = document.createElement('select');

	experiments.forEach( dir => {
		const option = document.createElement('option');
		option.innerHTML = fixTitle( dir.name );
		option.value = dir.name;
		select.appendChild( option );
	});

	select.addEventListener('change', function () {
		document.location.href = '/' + this.value;
	});

	header.appendChild( select );
	header.appendChild( template );
}

/**
 * Ruthlessly reformat the directory name
 */
function fixTitle( dir ) {
	dir = dir.split('-').splice(1).join(' '); // drop numbers
	return dir.charAt(0).toUpperCase() + dir.slice(1); // first character uppercase
}
