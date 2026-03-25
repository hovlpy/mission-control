import { useState } from 'react';
import Head from 'next/head';
import TaskBoard from '../components/TaskBoard';
import Calendar from '../components/Calendar';
import Projects from '../components/Projects';
import Memories from '../components/Memories';
import Docs from '../components/Docs';
import Team from '../components/Team';
import styles from '../styles/Home.module.css';

export default function Home() {
  const [activeTool, setActiveTool] = useState('Task Board');

  const tools = [
    { name: 'Task Board', icon: '📋' },
    { name: 'Calendar', icon: '📅' },
    { name: 'Projects', icon: '📁' },
    { name: 'Memories', icon: '🧠' },
    { name: 'Documents', icon: '📄' },
    { name: 'Team', icon: '👥' }
    // Office is intentionally excluded as per user request
  ];

  const renderTool = () => {
    switch (activeTool) {
      case 'Task Board':
        return <TaskBoard />;
      case 'Calendar':
        return <Calendar />;
      case 'Projects':
        return <Projects />;
      case 'Memories':
        return <Memories />;
      case 'Documents':
        return <Docs />;
      case 'Team':
        return <Team />;
      default:
        return <TaskBoard />;
    }
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>OpenClaw Mission Control</title>
        <meta name="description" content="Custom dashboard for OpenClaw" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>OpenClaw Mission Control</h1>
        <p>Custom dashboard built by your OpenClaw</p>
        
        <div className={styles.sidebar}>
          <h2>Tools</h2>
          <nav>
            {tools.map(tool => (
              <button
                key={tool.name}
                className={`${activeTool === tool.name ? styles.active : ''} ${styles.toolButton}`}
                onClick={() => setActiveTool(tool.name)}
              >
                {tool.icon} {tool.name}
              </button>
            ))}
          </nav>
        </div>
        
        <div className={styles.mainContent}>
          {renderTool()}
        </div>
      </main>
    </div>
  );
}