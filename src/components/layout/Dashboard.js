import React from "react";
import Pokelist from "../Pokelist";

const Dashboard = () => {
  return (
    <div className="row">
      <div className="col">
        <Pokelist />
        <hr/>
        <div>
          <p>
            This app was created in React using Hooks and ReactRouter. I
            followed a{" "}
            <a
              href="https://www.youtube.com/watch?v=XehSJF85F38"
              target="_blank"
              rel="noopener noreferrer"
            >
              youtube tutorial
            </a>{" "}
            and adjusted the app to my likings as I went along. It was so much fun to learn and it taught me 
            so much more about how React works. I would highly recommend the tutorial to anyone who 
            wants a taste of React and loves Pokemon!
          </p>
        </div><br/>
      </div>
    </div>
  );
};

export default Dashboard;
