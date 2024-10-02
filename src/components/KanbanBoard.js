import React, { useEffect, useState } from 'react';
import Card from './Card';
import GroupBySelector from './GroupBySelector';
import SortOrderSelector from './SortOrderSelector';
import displayico from '../images/Display.svg';
import downico from '../images/down.svg';
import plusico from '../images/add.svg'
import dotico from '../images/3dot.svg'
import todoico from '../images/To-do.svg'
import progress from '../images/in-progress.svg'
import backico from '../images/Backlog.svg'
import urgico from '../images/UrgentPrioritycolour.svg'
import highico from '../images/HighPriority.svg'
import midico from '../images/MediumPriority.svg'
import lowico from '../images/LowPriority.svg'
import noico from '../images/No-priority.svg'

const groupIcons = {
  'Todo': todoico,
  'In progress': progress,
  'Backlog': backico,
  'Urgent': urgico,
  'High': highico,
  'Medium': midico,
  'Low': lowico,
  'No Priority': noico,
};

const KanbanBoard = ({ tickets = [],  users=[] }) => {
  const [groupBy, setGroupBy] = useState('status');  
  const [sortOrder, setSortOrder] = useState('title');  
  const [groupedTickets, setGroupedTickets] = useState({}); 

  const groupTickets = (tickets, groupBy) => {
    const tempGrouped = {};
    const userMapping = {};
    users.forEach(user => {
      userMapping[user.id] = user.name;
    });

    if (groupBy === 'priority') {
      const priorityMap = {
        4: 'Urgent',
        3: 'High',
        2: 'Medium',
        1: 'Low',
        0: 'No Priority'
      };
      tickets.forEach(ticket => {
        const groupKey = priorityMap[ticket.priority] || 'No Priority';
        if (!tempGrouped[groupKey]) {
          tempGrouped[groupKey] = [];
        }
        tempGrouped[groupKey].push(ticket);
      });
    } else if (groupBy === 'status') {
      tickets.forEach(ticket => {
        const groupKey = ticket.status || 'No Status';
        if (!tempGrouped[groupKey]) {
          tempGrouped[groupKey] = [];
        }
        tempGrouped[groupKey].push(ticket);
      });

      const sortedStatusGroups = Object.keys(tempGrouped).sort();
      const sortedGroupedTickets = {};
      sortedStatusGroups.forEach(group => {
        sortedGroupedTickets[group] = tempGrouped[group];
      });
      return sortedGroupedTickets;
    } else if (groupBy === 'userId') {
      tickets.forEach(ticket => {
        const groupKey = userMapping[ticket.userId] || 'Unknown User';
        if (!tempGrouped[groupKey]) {
          tempGrouped[groupKey] = [];
        }
        tempGrouped[groupKey].push(ticket);
      });
    }

    return tempGrouped;
  };

  const sortTicketsWithinGroup = (groupedTickets, sortOrder) => {
    const sortedGrouped = { ...groupedTickets };
  
    if (sortOrder === 'priority') {
      Object.keys(sortedGrouped).forEach(group => {
        sortedGrouped[group].sort((a, b) => b.priority - a.priority);
      });
    } else if (sortOrder === 'title') {
      Object.keys(sortedGrouped).forEach(group => {
        sortedGrouped[group].sort((a, b) => {
          const titleA = a.title ? a.title.toLowerCase() : '';
          const titleB = b.title ? b.title.toLowerCase() : '';
          return titleA.localeCompare(titleB);
        });
      });
    }
  
    return sortedGrouped;
  };

  useEffect(() => {
    const grouped = groupTickets(tickets, groupBy); 
    const sortedGrouped = sortTicketsWithinGroup(grouped, sortOrder); 
    setGroupedTickets(sortedGrouped);
  }, [tickets, groupBy, sortOrder]);

  
  return (
    <div className="kanban-board">
      <div style={{ width: "100%" }}>
        <div className="dropdown">
          <button className="dropdown-toggle">
            <img src={displayico} className="icon" alt="Display" />
            Display
            <img src={downico} className="icon" alt="Dropdown" />
          </button>
          <div className="dropdown-menu">
            <div className="dropdown-item">
              <GroupBySelector setGroupBy={setGroupBy} />
            </div>
            <div className="dropdown-item">
              <SortOrderSelector setSortOrder={setSortOrder} />
            </div>
          </div>
        </div>
      </div>

      <div className="grouped-columns">
        {Object.keys(groupedTickets).map(group => (
          <div className="group" key={group}>
            <div className='grouphead'>
              <div>
                <h3 className="group-title">
                {groupIcons[group] && <img src={groupIcons[group]} className="group-icon" alt={group} />} 
                {group}
                </h3>
              </div>
              <div>
              <img src={plusico} className="icon" alt="add" />
              <img src={dotico} className="icon" alt="more" />
              </div>
            </div>
            <div className="tickets-list">
              {groupedTickets[group].map(ticket => (
                <Card key={ticket.id} ticket={ticket} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default KanbanBoard;
