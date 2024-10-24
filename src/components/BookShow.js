import { useContext, useState } from "react";
import BookEdit from './BookEdit';
import BookContext from "../context/books";

function BookShow({book}) 
{
const[showEdit,setShowEdit]=useState(false);
const {deleteBookById} = useContext(BookContext);

const handleEdit = () =>{
    setShowEdit(!showEdit);
}

const handleDelete = ()=>{
    deleteBookById(book.id);
}

const handleSubmit = () =>{
setShowEdit(false);
}

let content = <h3>{book.title}</h3>;
if (showEdit) {
    content = <BookEdit onSubmit={handleSubmit} book={book}/>
}

    return <div className="book-show">
        <img 
        src={`https://picsum.photos/seed/${book.id}/200`}
        />
        <div>{content}</div>
     <div className="actions">
     <button className="edit" onClick={handleEdit}>
         Edit
        </button>
        <button className="delete" onClick={handleDelete}>
         Delete
        </button>
     </div>
    </div>
}

export default BookShow;