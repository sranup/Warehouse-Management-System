import React from 'react'
import { Pagination } from 'react-bootstrap'

const PaginationComponent = (props) => {
    const { currentPage, totalPages, onPageChange } = props
    const pages = []
    for (let i = 0; i <= totalPages; i++) {
        pages.push(
            <Pagination.Item
                key={i}
                active={i === currentPage}
                onClick={() => onPageChange(i)}
            >
                {i}
            </Pagination.Item>
        )
    }
    return (
        <Pagination>
            <Pagination.Prev
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1} />
            {pages}
            <Pagination.Next
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
            />
        </Pagination>
    )
}

export default PaginationComponent