import React from 'react';
import ReactDOM from 'react-dom/client';
import { useState, useEffect } from 'react';

const root = ReactDOM.createRoot(document.getElementById('root'));

function WelcomeMessage({ first_name, last_name }) {
  return (
    <h2>{`Welcome ${first_name} ${last_name}, we are loading your classes for today...`}</h2>
  );
}

function Courses({ vnum, first_name, last_name }) {
  const [classes, setClasses] = useState([]);
  const [fetched, setFetched] = useState(false);
  const [selectedClass, setActiveClass] = useState(0);

  useEffect(() => {
    const getClasses = async () => {
      const classData = await (
        await fetch(`${endpoints.enroll_endpoint}?vnum=${vnum}`)
      ).json();
      setClasses(classData);
      setFetched(true);
    }
    getClasses();
  }, [vnum]);
}

function MyForm() {
  const [name, setVnumber] = useState("");
  const [uname, setUName] = useState({});

  return (
    <div>
      <form onSubmit={submitVNUM}>
	  <WelcomeMessage first_name={first_name} last_name={last_name} />
        <label>Enter your V Number:&nbsp;
          <input
            type="text"
            value={name}
            onChange={(e) => setVnumber(e.target.value)}/>
        </label>	
        <input type="submit" />
      </form>
      <Courses vnum={name} first_name={uname.first_name} last_name={uname.last_name} />
    </div>
  );
}

root.render(
  <React.StrictMode>
    <MyForm />
  </React.StrictMode>
);
