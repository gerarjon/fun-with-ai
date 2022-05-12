import React, { useEffect, useState } from 'react';
import './App.css';
import Response from './components/Response';
import Footer from './components/Footer';

function App() {
  const [prompt, setPrompt] = useState("");
  const [responses, setResponses] = useState(() => {
    // getting stored data
    const saved = localStorage.getItem("responses");
    const localResponse = JSON.parse(saved);
    return localResponse || [];
  })

  useEffect(() => {
    // storing responses data
    localStorage.setItem("responses", JSON.stringify(responses));
  },[responses])



  const handleFormSubmit = (event) => {
    event.preventDefault();
    if (prompt==="") {
      alert("Prompt entered is blank. Please enter a prompt.");
      return false;
    }
    const data = {
      prompt: prompt,
      temperature: 0.5,
      max_tokens: 64,
      top_p: 1.0,
      frequency_penalty: 0.0,
      presence_penalty: 0.0,
     };
      
     fetch("https://api.openai.com/v1/engines/text-curie-001/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`,
      },
      body: JSON.stringify(data),
     })
     .then(response => response.json())
     .then(data => {
      const fullData = {prompt: prompt, response: data.choices[0].text, postId: data.id};
      setResponses([...responses, fullData])
     })

     
  }

  const handleClearPrompt = (event) => {
    event.preventDefault();
    setPrompt("");
    setResponses([])
  }


  return (
    <>
    <main>
      <article>
        <div className='container is-max-desktop' id="prompt-container">
          <h1 className='title'>Fun with AI</h1>

          {/* Start form */}
          <form>
            {/* Input area */}
            <div className='field'>
              <label className='label' htmlFor="prompt">Enter prompt</label>
              <div className='control'>
                <textarea 
                  className="textarea" 
                  id="prompt" 
                  placeholder="e.g. Once upon a time..."
                  value={prompt}
                  onChange={e => setPrompt(e.target.value)}
                  >
                </textarea>
              </div>
            </div>
            {/* Submit Button */}
            <div className='field is-grouped'>
              <div className='control'>
                <button className='button is-info' type='submit' value="Submit" onClick={handleFormSubmit}>Submit</button>
              </div>
              <div className='control'>
                <button className='button is-info is-light' onClick={handleClearPrompt}>Clear Responses</button>
              </div>
            </div>
          </form>
          {/* End Form */}
  
          {/* Start Response */}
          <section id='response-container'>
            <h1 className='title'>Responses</h1>
            <ul className='response-list'>
              {responses.map((response) => (
                <Response {...response} key={response.postId} />
              ))}
            </ul>
          </section>
          {/* End Response */}

        </div>
      </article>
    </main>

    <Footer />
    </>
  );
}

export default App;
