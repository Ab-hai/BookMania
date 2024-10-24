import {createContext, useState} from 'react';
import axios from 'axios';


const BookContext = createContext(); 

function Provider ({children}) {

    const [books,setBooks] = useState([]);

    const fetchBooks = async() => {
    const response = axios.get('http://localhost:3001/books');

    setBooks((await response).data);
    };

    const deleteBookById = async(id) => {

        await axios.delete(`http://localhost:3001/books/${id}`);
        const updatedBooks = books.filter((book) => {
        return book.id !== id;
        }); 
        setBooks(updatedBooks);
    }

    const editBookById = async(id, newTitle)=>{
   const response = await axios.put(`http://localhost:3001/books/${id}`, {title : newTitle});
    
   const editedBooks = books.map((book)=> {
     if (book.id===id) {
    return {...book, ...response.data};}

    return book;
    });
    setBooks(editedBooks);
    }

    const createBook = async (title) => {
    const response = axios.post('http://localhost:3001/books',{
        title,
     });
       const updatedBooks = [...books , (await response).data];
       setBooks(updatedBooks);
    } 
const valuesToShare = {
    books,
    fetchBooks,
    deleteBookById,
    editBookById,
    createBook
}


return <BookContext.Provider value={valuesToShare}>
        {children}
</BookContext.Provider>

}

export {Provider};
export default BookContext;