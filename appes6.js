// UI ELEMENTS
const form = document.getElementById('book_form');
const container = document.querySelector('.container');
const tbody = document.querySelector('#book-list');


// Book Class
class Book{
	constructor(title,author,isbn){
		this.title = title;
		this.author = author;
		this.isbn = isbn;
	}
}

// UI Class
class UI{
	
	addBookList(book){
		const tr = document.createElement('tr');
		tr.innerHTML = `
			<td>${book.title}</td>
			<td>${book.author}</td>
			<td>${book.isbn}</td>
			<td><a class="delete"><i class="fa fa-remove teal-text fa-2x"></i></a></td>
		`
		tbody.appendChild(tr);

	}

	clearFields(){
		document.getElementById('title').value = '';
		document.getElementById('author').value = '';
		document.getElementById('isbn').value = '';

	}

	deleteList(target){
		if(target.parentElement.classList.contains('delete')){
			target.parentElement.parentElement.parentElement.remove();
			const ui = new UI();
			ui.setMessage('Record deleted successfully','error');

		}
	}


	setMessage(msg,className){
		const div = document.createElement('div');
		div.className = `alert ${className}`;
		div.appendChild(document.createTextNode(msg));
		container.insertBefore(div,form);
		setTimeout(function(){
			document.querySelector('.alert').remove();
		},3000)
	}
}

// Store Class

class Store{

	static getList(){
		let books;
		if(localStorage.getItem('books') === null){
			books = [];
		}else{
			books = JSON.parse(localStorage.getItem('books'));
		}
		return books;
	}
	
	static addList(book){
		const books = Store.getList();
		books.push(book);
		localStorage.setItem('books',JSON.stringify(books));
	}



	static displayList(){
		const books = Store.getList();
		const ui = new UI();
		books.forEach(function(book){
			ui.addBookList(book);
		})
	}

	static deleteList(isbn){
		const books = Store.getList();

		books.forEach(function(book,index){
			if(book.isbn === isbn){
			books.splice(index,1);
			}
		})
		localStorage.setItem('books',JSON.stringify(books));
	}

}

// Loading Items from ls
document.addEventListener('DOMContentLoaded',function(){
	Store.displayList();
})

// Remove Record
document.body.addEventListener('click',function(e){
	const ui = new UI();
	ui.deleteList(e.target);
	Store.deleteList(e.target.parentElement.parentElement.previousElementSibling.textContent);
})


form.addEventListener('submit',function(e){
	// INPUT ELEMENTS
	const title = document.getElementById('title').value;
	const author = document.getElementById('author').value;
	const isbn = document.getElementById('isbn').value;

	// CLASSES INSTANCES
	const ui = new UI();
	const book = new Book(title,author,isbn);

	if(title === '' || author === '' || isbn === ''){
		ui.setMessage('Error! Fields can\'t be empty','error');
	}else{
		ui.addBookList(book);
		Store.addList(book);
		ui.clearFields();
		ui.setMessage('Success! Record saved','success');
	}

	e.preventDefault();
})