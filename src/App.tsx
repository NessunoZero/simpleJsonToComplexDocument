import { useState } from 'react';
import { JSONManager } from './components/JSONManager'
import { Content } from 'vanilla-jsoneditor';
import { initialJSON } from './components/utility';
import { OutputManager } from './components/OutputManager';

function App() {
  const [content, setContent] = useState<Content>({
    json: initialJSON,
    text: undefined
  });
  return (
    <div
      className='w-screen h-screen flex border border-green-700 min-w-[1440px]'
    >
      <JSONManager
        content={content}
        setContent={setContent}
      />
      <OutputManager
        content={content}
      />
    </div>
  )
}

export default App
