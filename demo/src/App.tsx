import { useState } from 'react';
import { Walkthrough } from '@walkthrough-kit/component-templates';
import steps from './basic-guide.json';
import './Walkthrough.css';

function App() {
  const [theme, setTheme] = useState<'light' | 'dark' | 'auto'>('auto');
  
  return (
    <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem'}}>
        <h1>Walkthrough Kit demo</h1>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginLeft: '1rem', marginTop: '0.5rem' }}>
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
      <Walkthrough steps={steps.steps} theme={theme} />
    </div>
  );
}

export default App;