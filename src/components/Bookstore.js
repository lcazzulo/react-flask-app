import React, { useState, useEffect } from 'react';

const Bookstore = () => {
    
    const [books, setBooks] = useState([]);

    useEffect(() => {
        fetch('/api/get_books').then(res => res.json()).then(data => {
          setBooks(data);
        });
      }, []);
    
    return ( 
        <div>
            <h1>Bookstore</h1>
            

            <table className="table">
              <thead>
                <th>Id</th>
                <th>Author</th>
                <th>Title</th>
                <th>ISBN</th>
                <th>Notes</th>
              </thead>
         <tbody>
           {
                books.map((row) =>(
                   <tr>
                    <td>{row.id}</td>
                    <td>{row.author}</td>
                    <td>{row.title}</td>
                    <td>{row.isbn}</td>
                    <td>{row.notes}</td>
                   </tr>
                ))
           }
         </tbody>
       </table>
        </div>
    )
}

export default Bookstore;