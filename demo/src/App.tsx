import { Walkthrough } from '@walkthrough-kit/component-templates';
import steps from './basic-guide.json';
import "../../packages/component-templates/src/Walkthrough.css";

function App() {

  return (
    <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
      <h1>Walkthrough Kit Demo</h1>
      <Walkthrough steps={steps.steps} theme="dark" />
    </div>
  );
}

export default App;