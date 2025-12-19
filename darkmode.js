const toggleButton=document.getElementById('dark-mode-toggle');
const body = document.body
if(localStorage.getItem('darkBody') === 'enabled'){
	body.classList.add('dark-mode')
}
toggleButton.addEventListener('click', ()=>{
	body.classList.toggle('dark-mode');

if(body.classList.contains('dark-mode')){
	localStorage.setItem('darkBody', 'enabled')
}else{
	localStorage.setItem('darkBody', 'disabled')
}
});