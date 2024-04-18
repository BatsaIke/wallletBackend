import React, { useState, useEffect } from 'react';
import './Transactions.css';

const TransactionHistory = ({ user, loading }) => {
  const { payments } = user || {};

  const [currentPage, setCurrentPage] = useState(1);
  const transactionsPerPage = 10;
  const [recentTransactions, setRecentTransactions] = useState([]);

  useEffect(() => {
    // Calculate the index range for the current page
    const indexOfLastTransaction = currentPage * transactionsPerPage;
    const indexOfFirstTransaction = indexOfLastTransaction - transactionsPerPage;
    
    // Slice the transactions for the current page
    const sortedTransactions = [...(payments || [])].sort(
      (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
    );
    const transactionsOnPage = sortedTransactions.slice(indexOfFirstTransaction, indexOfLastTransaction);

    setRecentTransactions(transactionsOnPage);
  }, [currentPage, payments]);

  const formatTimestamp = (timestamp) => {
    try {
      const options = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
      };
      return new Date(timestamp).toLocaleDateString('en-US', options);
    } catch (error) {
      console.error('Error formatting timestamp:', error);
      return 'Invalid Date';
    }
  };

  const renderTableRows = () => {
    return (
      recentTransactions &&
      recentTransactions.map((payment) => (
        <tr key={payment._id}>
          <td>{payment.amount}</td>
          <td>{payment.paymentMethod}</td>
          <td>{payment.paymentStatus}</td>
          <td>{typeof payment.reference === 'string' ? payment.reference : 'Invalid Reference'}</td>
          <td>{formatTimestamp(payment.timestamp)}</td>
        </tr>
      ))
    );
  };

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleNextPage = () => {
    setCurrentPage((prevPage) => (prevPage < pageNumbers.length ? prevPage + 1 : prevPage));
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => (prevPage > 1 ? prevPage - 1 : prevPage));
  };

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil((payments && payments.length) / transactionsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="transaction-history-container">
      {loading ? (
        <p>History Loading...</p>
      ) : (
        <>
          <h2>Transaction History</h2>
          <table>
            <thead>
              <tr>
                <th>Amount</th>
                <th>Payment Method</th>
                <th>Payment Status</th>
                <th>Reference</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>{renderTableRows()}</tbody>
          </table>
          <div className="pagination">
            <button onClick={handlePrevPage}>Prev</button>
            {pageNumbers.map((number) => (
              <span
                key={number}
                onClick={() => paginate(number)}
                className={currentPage === number ? 'active' : ''}
              >
                {number}
              </span>
            ))}
            <button onClick={handleNextPage}>Next</button>
          </div>
        </>
      )}
    </div>
  );
};

export default TransactionHistory;
