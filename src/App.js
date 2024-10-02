import React, { useEffect, useState } from 'react';
import KanbanBoard from './components/KanbanBoard';
import './App.css';

const App = () => {
  const [tickets, setTickets] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const response = await fetch('https://api.quicksell.co/v1/internal/frontend-assignment');
        const data = await response.json();
        if (Array.isArray(data.tickets)) {
          setTickets(data.tickets);
          setUsers(data.users)
        } else {
          console.error('Expected an array, but got:', data);
        }
      } catch (error) {
        console.error('Error fetching tickets:', error);
      }
    };

    fetchTickets();
  }, []);

  return (
    <div className="App">
      <h1>Kanban Board</h1>
      <KanbanBoard tickets={tickets} users={users} />
    </div>
  );
};

export default App;
