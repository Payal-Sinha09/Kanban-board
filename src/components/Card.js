import React from 'react';
import './Card.css'; 

const Card = ({ ticket }) => {
  return (
    <div className="card">
      <p className='cardp'>{ticket.id}</p>
      <h3>{ticket.title}</h3>
      <p>{ticket.tag}</p>
      {/* <p>{ticket.description}</p>
      <p>Priority: {getPriorityLabel(ticket.priority)}</p>
      <p>Status: {ticket.status}</p>
      <p>User: {ticket.userId}</p> */}
    </div>
  );
};

// const getPriorityLabel = (priority) => {
//   switch (priority) {
//     case 4: return 'Urgent';
//     case 3: return 'High';
//     case 2: return 'Medium';
//     case 1: return 'Low';
//     default: return 'No Priority';
//   }
// };

export default Card;






// import React from 'react';
// import './Card.css';

// const Card = ({ ticket, type }) => {
//   return (
//     <div className={`card ${type === 'user' ? 'user-card' : 'ticket-card'}`}>
//       {type === 'user' ? (
//         <>
//           <h3>User: {ticket.name}</h3>
//           <p>ID: {ticket.id}</p>
//         </>
//       ) : (
//         <>
//           <p>ID: {ticket.id}</p>
//           <h3>{ticket.title}</h3>
//           <p>Priority: {ticket.priority}</p>
//           <p>Status: {ticket.status}</p>
//         </>
//       )}
//     </div>
//   );
// };

// export default Card;
