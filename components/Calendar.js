import { useState, useEffect } from 'react';

export default function Calendar() {
  const [events, setEvents] = useState([]);
  const [newEvent, setNewEvent] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [view, setView] = useState('month'); // month, week, day
  const [cronJobs, setCronJobs] = useState([]);

  // Initialize with sample data
  useEffect(() => {
    if (events.length === 0 && cronJobs.length === 0) {
      // Sample events
      const initialEvents = [
        { 
          id: 1, 
          text: 'Team meeting with Alex', 
          date: new Date(Date.now() + 86400000).toISOString().split('T')[0],
          time: '14:30',
          type: 'event'
        },
        { 
          id: 2, 
          text: 'Review mission control progress', 
          date: new Date(Date.now() + 172800000).toISOString().split('T')[0],
          time: '09:00',
          type: 'task'
        }
      ];
      
      setEvents(initialEvents);
      
      // Sample cron jobs (scheduled tasks)
      const initialCronJobs = [
        {
          id: 'cron-1',
          text: 'Check for new memories and organize them',
          schedule: 'Every morning at 8:00 AM',
          time: '08:00',
          frequency: 'daily',
          lastRun: new Date(Date.now() - 86400000).toISOString().split('T')[0],
          active: true
        },
        {
          id: 'cron-2',
          text: 'Send daily summary email',
          schedule: 'Every evening at 6:00 PM',
          time: '18:00',
          frequency: 'daily',
          lastRun: new Date(Date.now() - 86400000).toISOString().split('T')[0],
          active: true
        },
        {
          id: 'cron-3',
          text: 'Weekly project review and planning',
          schedule: 'Every Monday at 10:00 AM',
          time: '10:00',
          frequency: 'weekly',
          lastRun: new Date(Date.now() - 604800000).toISOString().split('T')[0],
          active: true
        },
        {
          id: 'cron-4',
          text: 'Backup mission control data',
          schedule: 'Every Sunday at 2:00 AM',
          time: '02:00',
          frequency: 'weekly',
          lastRun: new Date(Date.now() - 604800000).toISOString().split('T')[0],
          active: true
        }
      ];
      
      setCronJobs(initialCronJobs);
    }
  }, []);

  const addEvent = () => {
    if (newEvent.trim()) {
      const event = {
        id: Date.now(),
        text: newEvent,
        date: date,
        time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}),
        type: 'event'
      };
      
      setEvents([...events, event]);
      setNewEvent('');
    }
  };

  const addCronJob = () => {
    if (newEvent.trim()) {
      const cronJob = {
        id: `cron-${Date.now()}`,
        text: newEvent,
        schedule: 'Custom schedule',
        time: '00:00',
        frequency: 'custom',
        lastRun: '',
        active: true
      };
      
      setCronJobs([...cronJobs, cronJob]);
      setNewEvent('');
    }
  };

  const deleteEvent = (id) => {
    setEvents(events.filter(event => event.id !== id));
  };

  const deleteCronJob = (id) => {
    setCronJobs(cronJobs.filter(job => job.id !== id));
  };

  const toggleCronJob = (id) => {
    setCronJobs(cronJobs.map(job =>
      job.id === id ? {...job, active: !job.active} : job
    ));
  };

  // Get events for selected date
  const eventsForDate = events.filter(event => event.date === date);
  
  // Get active cron jobs for today (simplified)
  const activeCronJobsToday = cronJobs.filter(job => job.active);

  return (
    <div className="calendar">
      <h2>Calendar 📅</h2>
      <p>View scheduled tasks and cron jobs to confirm OpenClaw is being proactive</p>
      
      {/* Calendar Controls */}
      <div className="calendar-controls">
        <div className="view-selector">
          <button 
            className={view === 'month' ? 'active' : ''}
            onClick={() => setView('month')}
          >
            Month
          </button>
          <button 
            className={view === 'week' ? 'active' : ''}
            onClick={() => setView('week')}
          >
            Week
          </button>
          <button 
            className={view === 'day' ? 'active' : ''}
            onClick={() => setView('day')}
          >
            Day
          </button>
        </div>
        
        <div className="date-navigation">
          <button onClick={() => {
            const newDate = new Date(date);
            newDate.setDate(newDate.getDate() - 1);
            setDate(newDate.toISOString().split('T')[0]);
          }}>&lt;</button>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            readOnly
          />
          <button onClick={() => {
            const newDate = new Date(date);
            newDate.setDate(newDate.getDate() + 1);
            setDate(newDate.toISOString().split('T')[0]);
          }}>&gt;</button>
        </div>
        
        <div className="add-section">
          <input
            type="text"
            value={newEvent}
            onChange={(e) => setNewEvent(e.target.value)}
            placeholder="Add event or cron job..."
            onKeyPress={(e) => e.key === 'Enter' && (view === 'cron' ? addCronJob() : addEvent())}
          />
          <button onClick={() => (view === 'cron' ? addCronJob() : addEvent())}>
            Add
          </button>
          <button onClick={() => setNewEvent('')}>Clear</button>
        </div>
      </div>
      
      {/* Tabs for Events vs Cron Jobs */}
      <div className="tabs">
        <button 
          className={view !== 'cron' ? 'tab-active' : ''}
          onClick={() => setView(view === 'cron' ? 'month' : 'cron')}
        >
          Events & Tasks
        </button>
        <button 
          className={view === 'cron' ? 'tab-active' : ''}
          onClick={() => setView('cron')}
        >
          Cron Jobs
        </button>
      </div>
      
      {/* Main Content */}
      {view === 'cron' ? (
        <div className="cron-jobs">
          <h3>Scheduled Cron Jobs</h3>
          <p>These are the automated tasks your OpenClaw runs on schedule</p>
          
          {cronJobs.length === 0 ? (
            <p className="empty-state">No cron jobs scheduled yet</p>
          ) : (
            <div className="cron-list">
              {cronJobs.map(job => (
                <div key={job.id} className={`cron-job ${job.active ? 'active' : 'inactive'}`}>
                  <div className="cron-info">
                    <h4>{job.text}</h4>
                    <p className="schedule">{job.schedule}</p>
                    <p className="details">
                      <span>Frequency: {job.frequency}</span>
                      <span>•</span>
                      <span>Last run: {job.lastRun ? new Date(job.lastRun).toLocaleDateString() : 'Never'}</span>
                    </p>
                  </div>
                  <div className="cron-actions">
                    <button 
                      onClick={() => toggleCronJob(job.id)}
                      className={job.active ? 'disable' : 'enable'}
                    >
                      {job.active ? 'Pause' : 'Enable'}
                    </button>
                    <button 
                      onClick={() => deleteCronJob(job.id)}
                      className="delete"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
          
          <div className="cron-note">
            <p>💡 Tip: Ask your OpenClaw to "check the cron jobs every heartbeat and run any that are due" to make it proactive!</p>
          </div>
        </div>
      ) : (
        <div className="events-view">
          {view === 'month' && (
            <div className="month-view">
              <h3>{new Date(date).toLocaleDateString(undefined, {month: 'long', year: 'numeric'})}</h3>
              <div className="month-grid">
                {/* Weekday headers */}
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                  <div key={day} className="weekday-header">{day}</div>
                ))}
                
                {/* Days of month */}
                {[]} // Simplified - in real implementation would calculate days
              }
            </div>
          )}
          
          {view === 'week' && (
            <div className="week-view">
              <h3>Week of {new Date(date).toLocaleDateString()}</h3>
              <div className="day-columns">
                {/* Simplified week view */}
                {[0,1,2,3,4,5,6].map(offset => {
                  const day = new Date(date);
                  day.setDate(day.getDate() + offset);
                  const dayEvents = events.filter(e => e.date === day.toISOString().split('T')[0]);
                  return (
                    <div key={offset} className="day-column">
                      <h4>{day.toLocaleDateString(undefined, {weekday: 'short'})}</h4>
                      <p>{day.getDate()}/{day.getMonth() + 1}</p>
                      {dayEvents.length === 0 ? (
                        <p className="no-events">No events</p>
                      ) : (
                        dayEvents.map(event => (
                          <div key={event.id} className="event-item">
                            <strong>{event.time}</strong> {event.text}
                          </div>
                        ))
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
          
          {view === 'day' && (
            <div className="day-view">
              <h3>{new Date(date).toLocaleDateString(undefined, {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'})}</h3>
              
              {eventsForDate.length === 0 ? (
                <p className="no-events">No events scheduled for today</p>
              ) : (
                <div className="day-events">
                  {eventsForDate.map(event => (
                    <div key={event.id} className="event-item">
                      <div className="event-time">{event.time}</div>
                      <div className="event-text">
                        <strong>{event.text}</strong>
                        <br/>
                        <small>Type: {event.type === 'event' ? 'Meeting/Event' : 'Task'}</small>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              
              {/* Active cron jobs for today section */}
              {activeCronJobsToday.length > 0 && (
                <div className="todays-cron-jobs">
                  <h4>Active Cron Jobs Today</h4>
                  {activeCronJobsToday.map(job => (
                    <div key={job.id} className="cron-item">
                      <strong>{job.text}</strong>
                      <br/>
                      <small>Scheduled: {job.time} ({job.frequency})</small>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      )}
      
      {/* Event Details / Creation Form */}
      {view !== 'cron' && eventsForDate.length > 0 && (
        <div className="event-details">
          <h3>Today's Events & Tasks</h3>
          <div className="event-list">
            {eventsForDate.map(event => (
              <div key={event.id} className={`event-card ${event.type}`}>
                <div className="event-header">
                  <span className="event-type">{event.type === 'event' ? '📅' : '✅'}</span>
                  <h4>{event.text}</h4>
                </div>
                <div className="event-meta">
                  <span>{event.time}</span>
                  <span>•</span>
                  <span>Added: {new Date(event.date).toLocaleDateString()}</span>
                </div>
                <button 
                  onClick={() => deleteEvent(event.id)}
                  className="delete-event"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}