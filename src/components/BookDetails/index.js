import React, { useEffect } from 'react'
import './styles.css';

const BookDetails = ({ book }) => {
    useEffect(() => {

    }, [])
    return <div className='book-details'>
        {(book && <>
            <div>
                <span>Title: {book.title}</span>
            </div>
            <div>
                <span>Categories: {book.categories.map((c, i) => <div key={i} className='sub-item'>
                    {c}
                </div>)}</span>
            </div>
            <div>
                <span>Authors: {book.authors.map((a, i) => <div key={i} className='sub-item'>
                    {a}
                </div>)}</span>
            </div>
            <div>
                <img src={book.thumbnailURL} alt='Book cover not found!'></img>
            </div>
        </>) || 'Book not found.'}
    </div>
}
export default BookDetails