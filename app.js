
// UI Elements
const form = document.querySelector('#book_form');
const title = document.getElementById('title');
const author = document.getElementById('author');
const  isbn = document.getElementById('isbn');
const tBody = document.getElementById('book-list');

// Book Constructor

function Book(title,author,isbn){
	this.title = title;
	this.author = author;
	this.isbn = isbn;
}

// UI Constructor

function UI(){}

// Creating UI addBookList Prototype
UI.prototype.addBookList = function(book){
	// Create tr element;
	const tr = document.createElement('tr');
	tr.className = 'tb-row';
	// console.log(tr)

	// insert td elements
	tr.innerHTML = `
		<td>${book.title}</td>
		<td>${book.author}</td>
		<td>${book.isbn}</td>
		<td><a class="green-text delete"><i class="fa fa-remove fa-2x"></i></a></td>	
	`
	// Append tr element to tBody;
	tBody.appendChild(tr);

}	

// ClearFields

UI.prototype.clearFields = function(){
	document.getElementById('title').value = '';
	document.getElementById('author').value = '';
	document.getElementById('isbn').value = '';

}

// Alerting message
UI.prototype.showMessage = function(msg,className){
	const div = document.createElement('div');
	div.appendChild(document.createTextNode(msg));
	div.className = `alert center-align ${className}`;

	const cont =  document.querySelector('.container');
	cont.insertBefore(div,form);  

	setTimeout(function(){
		document.querySelector('.alert').remove();
	},3000);
}


// Remove list prototype

UI.prototype.deleteList = function(target){
	if(target.parentElement.classList.contains('delete')){
		target.parentElement.parentElement.parentElement.remove();
		ui.showMessage('Record deleted successfully', 'error');

	}
}


// Remove List
document.body.addEventListener('click',function(e){
	ui = new UI();
	ui.deleteList(e.target);

})



form.addEventListener('submit',function(e){

	// Get form values
	const titleInput = title.value;
	const authorInput = author.value;
	const isbnInput = isbn.value;

	// Instantiating Book
	const book = new Book(titleInput,authorInput,isbnInput);

	// Instantiating UI
		const ui = new UI();

	// Validation
	if(titleInput === '' || authorInput === '' || isbnInput === ''){
		ui.showMessage('Input Fields cant be empty!', 'error');
	}else{
		ui.showMessage('Record added successfully!', 'success');
		
		ui.addBookList(book);
		ui.clearFields();
		
	}



	

	e.preventDefault();
})

	
