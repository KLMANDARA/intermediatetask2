import React, { useState } from 'react';
import axios from 'axios';
import { Controlled as CodeMirror } from 'react-codemirror2';
import 'codemirror/lib/codemirror.css';
import 'codemirror/mode/javascript/javascript'; // Add modes as needed

const App = () => {
    const [code, setCode] = useState('');
    const [language, setLanguage] = useState('javascript');
    const [output, setOutput] = useState('');

    const executeCode = async () => {
        try {
            const response = await axios.post('http://localhost:5000/execute', { code, language });
            setOutput(response.data);
        } catch (error) {
            setOutput(error.response.data);
        }
    };

    return (
        <div>
            <h1>Online Code Editor</h1>
            <select onChange={(e) => setLanguage(e.target.value)} value={language}>
                <option value="javascript">JavaScript</option>
                <option value="python">Python</option>
                <option value="ruby">Ruby</option>
            </select>
            <CodeMirror
                value={code}
                options={{
                    lineNumbers: true,
                    mode: language,
                }}
                onBeforeChange={(editor, data, value) => {
                    setCode(value);
                }}
            />
            <button onClick={executeCode}>Run Code</button>
            <h2>Output:</h2>
            <pre>{output}</pre>
        </div>
    );
};

export default App;
