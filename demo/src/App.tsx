import { useState } from 'react';
import { Walkthrough } from '@walkthrough-kit/component-templates';
import basicGuide from './basic-guide.json';
import pythonClass from './python-class.json';
import gitWorkflow from './git-workflow.json';
import apiGuide from './api-guide.json';
import './Walkthrough.css';

const examples = [
  { name: 'JavaScript Quick Start', data: basicGuide },
  { name: 'Python Class Tutorial', data: pythonClass },
  { name: 'Git Workflow', data: gitWorkflow },
  { name: 'REST API Guide', data: apiGuide },
];

function App() {
  const [theme, setTheme] = useState<'light' | 'dark' | 'auto'>('auto');
  const [selectedExample, setSelectedExample] = useState(0);
  
  return (
    <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1>Walkthrough Kit demo</h1>
        <div style={{ display: 'flex', gap: '1rem', margin: '0.5rem 1rem 0' }}>
          <select 
            value={selectedExample} 
            onChange={(e) => setSelectedExample(Number(e.target.value))}
            style={{ 
              padding: '0.5rem 1rem',
              fontSize: '0.875rem',
              border: '1px solid #d1d5db',
              borderRadius: '6px',
              background: 'white',
              cursor: 'pointer',
              fontWeight: '500'
            }}
          >
            {examples.map((ex, i) => (
              <option key={i} value={i}>{ex.name}</option>
            ))}
          </select>
          <select 
            value={theme} 
            onChange={(e) => setTheme(e.target.value as any)}
            style={{ 
              padding: '0.5rem 1rem',
              fontSize: '0.875rem',
              border: '1px solid #d1d5db',
              borderRadius: '6px',
              background: 'white',
              cursor: 'pointer',
              fontWeight: '500'
            }}
          >
            <option value="auto">Auto</option>
            <option value="light">Light</option>
            <option value="dark">Dark</option>
          </select>
        </div>
      </div>
      <Walkthrough key={selectedExample} steps={examples[selectedExample].data.steps} theme={theme} />
    </div>
  );
}

export default App;