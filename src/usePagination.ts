import React, { useState, useEffect, useCallback, useMemo } from 'react';

interface paginationProps {
    pageSize?: number;
    currentPage?: number;
    pages?: any;
}

interface pagination {
    pageSize?: number;
    setPageSize?: (id: number) => void;
    currentPage: number;
    setCurrentPage: (id: number) => void;
    goLeft?: () => void;
    goRight?: () => void;
    pages: number[];
}
export default function usePagination({ pageLength = 10, currentPageLength = 10, activePage = 1, visiblePages = 5, totalItems = 50000, ...rest }): pagination {
    const [pageSize, setPageSize] = useState(10);
    const [currentPage, setCurrentPage] = useState(1)

    useEffect(() => {
        setPageSize(pageLength)
        setCurrentPage(activePage)
    }, [currentPageLength, activePage])

    let pages = useMemo(() => {
        let pages: number[] = []
        if (totalItems && totalItems > 0) {
            const possiblePages = Math.ceil(totalItems / pageSize);
            if (possiblePages <= visiblePages) {
                pages = Array(possiblePages).fill(0).map((i, idx) => idx + 1)
            }
            else if (possiblePages > visiblePages) {
                let startPage: number;
                if (currentPage <= Math.ceil(visiblePages / 2)) {
                    startPage = 1
                }
                else {
                    startPage = currentPage - Math.floor(visiblePages / 2)
                }

                if (startPage + visiblePages > possiblePages) {
                    startPage = possiblePages + 1 - visiblePages
                }
                pages = Array(visiblePages).fill(0).map((i, idx) => (idx + startPage))
            }
        }
        return pages
    }, [totalItems, pageSize, visiblePages, currentPage])

    function goLeft() {
        if (currentPageLength > 1) {
            setCurrentPage(currentPage => currentPage - 1)
        }
    }
    function goRight() {
        setCurrentPage(currentPage => currentPage + 1)
    }
    return { pageSize, setPageSize, currentPage, setCurrentPage, goLeft, goRight, pages }
}