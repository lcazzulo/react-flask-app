import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { faEdit } from "@fortawesome/free-solid-svg-icons";


const Bookstore = () => {
    
    const [books, setBooks] = useState([]);
    const [showRowAdd, setShowRowAdd] = useState(false);
    const [author, setAuthor] = useState('')
    const [title, setTitle] = useState('')
    const [isbn, setIsbn] = useState('')
    const [notes, setNotes] = useState('')
    const [idRow, setIdRow] = useState(-1)
    const [showConfirmDelete, setShowConfirmDelete] = useState(false);
    const [idRowDelete, setIdRowDelete] = useState(-1)
    


    useEffect(() => {
        fetch('/api/get_books').then(res => res.json()).then(data => {
          setBooks(data);
        });
        
      }, []);

      function onClickAddRow() {
        setShowRowAdd(true);
      }

      function onClickEditRow(rowId) {
        return () => {
          setIdRow(rowId);
        }
      }

      function onPressEsc() {
        setShowRowAdd(false);
        setIdRow(-1);
      }

      function addBook() {
        // save new record
        fetch('/api/add_book', {
          method: 'PUT',
          headers: {'Content-Type':'application/json'},
          body: JSON.stringify({
           "author": author,
           "title": title,
           "isbn": isbn,
           "notes": notes,
          })
         }).then(res => res.ok).then(data => {
        setShowRowAdd(false);
        fetch('/api/get_books').then(res => res.json()).then(data => {
          setBooks(data);
        });
      });
      
      }

      function updateBook() {
        // update record
        fetch('/api/update_book', {
          method: 'POST',
          headers: {'Content-Type':'application/json'},
          body: JSON.stringify({
           "book_id": idRow,
           "author": author,
           "title": title,
           "isbn": isbn,
           "notes": notes,
          })
         }).then(res => res.ok).then(data => {
        setIdRow(-1);
        fetch('/api/get_books').then(res => res.json()).then(data => {
          setBooks(data);
        });
      }
      );
      }

      
      function onBlurAuthor(val) {
        setAuthor(val);
      }

      function onBlurTitle(val) {
        setTitle(val);
      }

      function onBlurIsbn(val) {
        setIsbn(val);
      }

      function onBlurNotes(val) {
        setNotes(val);
      }

      function handleConfirmDelete(rowId) {
        return () => {
          setShowConfirmDelete(true);
          setIdRowDelete(rowId);
        }
      }


      return ( 
        <div>
          <h1>Bookstore</h1>

            {showConfirmDelete === true &&  <div class="alert alert-danger" role="alert">
                Are you sure you want to delete the book with id {idRowDelete} ?
                <button onClick={() => {setShowConfirmDelete(false); setIdRowDelete(-1);}}>Cancel</button>
                <button onClick={() => {
                  fetch('/api/delete_book', {
                    method: 'DELETE',
                    headers: {'Content-Type':'application/json'},
                    body: JSON.stringify({
                     "book_id": idRowDelete,
                    })
                   }).then(res => res.ok).then(data => {
                  setShowConfirmDelete(false); 
                  setIdRowDelete(-1);
                  fetch('/api/get_books').then(res => res.json()).then(data => {
                    setBooks(data);
                  });
                }
                );
                }}>Delete</button>
            </div>
            }

            
            <table className="table table-striped">
              <thead>
                <tr>
                  <th scope="col">Id</th>
                  <th scope="col">Author</th>
                  <th scope="col">Title</th>
                  <th scope="col">ISBN</th>
                  <th scope="col">Notes</th>
                  <th scope="col"><button onClick={onClickAddRow}><i><FontAwesomeIcon icon={faPlus} /></i></button></th>
                </tr>
              </thead>
            <tbody>
           {
                books.map((row) =>(
                   idRow === row.id ?
                   <tr>
                    <th scope="row">{row.id}</th>
                    <td><input autoFocus onKeyDown={(e) => {if (e.key === "Escape") onPressEsc();}} onBlur={(e) => {onBlurAuthor(e.target.value);}} defaultValue={row.author}></input></td>
                    <td><input onKeyDown={(e) => {if (e.key === "Escape") onPressEsc();}} onBlur={(e) => {onBlurTitle(e.target.value);}} defaultValue={row.title}></input></td>
                    <td><input onKeyDown={(e) => {if (e.key === "Escape") onPressEsc();}} onBlur={(e) => {onBlurIsbn(e.target.value);}} defaultValue={row.isbn}></input></td>
                    <td><input onKeyDown={(e) => {if (e.key === "Escape") onPressEsc();}} onBlur={(e) => {onBlurNotes(e.target.value);}} defaultValue={row.notes}></input></td>
                    <td><button onClick={updateBook}>Update</button></td>
                    
                   </tr>
                   :
                   <tr>
                    <th scope="row">{row.id}</th>
                    <td>{row.author}</td>
                    <td>{row.title}</td>
                    <td>{row.isbn}</td>
                    <td>{row.notes}</td>
                    <td><button onClick={onClickEditRow(row.id)}><i><FontAwesomeIcon icon={faEdit} /></i></button></td>
                    <td><button onClick={handleConfirmDelete(row.id)}><i><FontAwesomeIcon icon={faTrash} /></i></button></td>
                  </tr>
                ))
           }
           { showRowAdd &&
            <tr>
              <th></th>
              <td><input autoFocus onKeyDown={(e) => {if (e.key === "Escape") onPressEsc();}} onBlur={(e) => {onBlurAuthor(e.target.value);}} ></input></td>
              <td><input onKeyDown={(e) => {if (e.key === "Escape") onPressEsc();}} onBlur={(e) => {onBlurTitle(e.target.value);}}></input></td>
              <td><input onKeyDown={(e) => {if (e.key === "Escape") onPressEsc();}} onBlur={(e) => {onBlurIsbn(e.target.value);}}></input></td>
              <td><input onKeyDown={(e) => {if (e.key === "Escape") onPressEsc();}} onBlur={(e) => {onBlurNotes(e.target.value);}}></input></td>
              <td><button onClick={addBook}>Insert</button></td>
           </tr>
          }
         </tbody>
       </table>
        </div>
    )
}

export default Bookstore;