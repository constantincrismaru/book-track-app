import React, { useEffect, useState } from 'react'
import Modal from 'react-modal'
import BookDetails from '../BookDetails';
import './styles.css';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
}

const Books = () => {
    const [books, setBooks] = useState([])
    const [filteredBooks, setFilteredBooks] = useState([])
    const [isListView, setIsListView] = useState(true)
    const [search, setSearch] = useState('')
    const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false)
    const [currentBookDetails, setCurrentBookDetails] = useState(null)

    useEffect(() => {
        fetchBooks()
    }, [])

    useEffect(() => {
        if (search) {
            setFilteredBooks(books.filter(b => b.title.toLocaleLowerCase().includes(search.toLocaleLowerCase())))
        }
        else {
            setFilteredBooks(books)
        }
    }, [search])

    const fetchBooks = async () => {
        let response = await fetch(`${process.env.REACT_APP_API_URL}books`)
        response = await response.json()

        if (Array.isArray(response.books)) {
            setBooks(response.books)
            setFilteredBooks(response.books)
        }
    }

    const onShowBookDetails = book => {
        setCurrentBookDetails(book)
        setIsDetailsModalOpen(true)
    }

    return <div className='books'>
        <h1>Books</h1>
        <div>
            <div className='filter'>
                <input type='text' onChange={e => setSearch(e.target.value)} />
                <input id='list-view' type='radio' name='view-type' checked={isListView} onChange={() => setIsListView(true)} />
                <label htmlFor='list-view'>List View</label>
                <input id='grid-view' type='radio' name='view-type' checked={!isListView} onChange={() => setIsListView(false)} />
                <label htmlFor='grid-view'>Grid View</label>
            </div>

            <div className={`${(!isListView && 'book-grid') || ''}`}>
                {filteredBooks.map((b, i) => <div className={`book-item ${(isListView && 'book-list-item') || 'book-grid-item'}`} key={i} onClick={() => onShowBookDetails(b)}>
                    <div>
                        <span>Title: {b.title}</span>
                    </div>
                    <div>
                        <span>Categories: {b.categories.map(c => `${c}; `)}</span>
                    </div>
                    <div>
                        <span>Authors: {b.authors.map(a => `${a}; `)}</span>
                    </div>
                    <div>
                        <img src={b.thumbnailURL} alt='Book cover not found!'></img>
                    </div>
                </div>)}
            </div>
            <div className='footer'>
                Total books: {filteredBooks.length}
            </div>
        </div>
        <Modal isOpen={isDetailsModalOpen}
            style={customStyles}
            ariaHideApp={false}>
            <div>
                Book Details
                <div>
                    <BookDetails book={currentBookDetails} />
                </div>
                <div className='modal-footer'>
                    <button onClick={() => setIsDetailsModalOpen(false)}>Close</button>
                </div>
            </div>

        </Modal>
    </div>
}
export default Books