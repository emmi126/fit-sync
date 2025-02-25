import Form from "./components/Form";
import FilterButton from "./components/FilterButton";
import Todo from "./components/Todo";
import YouTubePlayer from "./components/YoutubePlayer";
import { useState } from "react";
import { nanoid } from "nanoid";

const FILTER_MAP = {
  All: () => true,
  Active: task => !task.completed,
  Completed: task => task.completed
};
const FILTER_NAMES = Object.keys(FILTER_MAP);

function App(props) {
  const [tasks, setTasks] = useState(props.tasks);
  const [filter, setFilter] = useState("All");
  const [musicPlaying, setMusicPlaying] = useState(false);
  const [videoId, setVideoId] = useState("");

  function toggleTaskCompleted(id) {
    const updatedTasks = tasks.map((task) => {
      if (id === task.id) {
        return { ...task, completed: !task.completed };
      }
      return task;
    });
    setTasks(updatedTasks);
  }

  function addTask(name) {
    const newTask = { id: `workout-${nanoid()}`, name, completed: false };
    setTasks([...tasks, newTask]);
  }

  function deleteTask(id) {
    const remainingTasks = tasks.filter((task) => id !== task.id);
    setTasks(remainingTasks);
  }

  function editTask(id, newName) {
    const editedTaskList = tasks.map((task) => {
      if (id === task.id) {
        return { ...task, name: newName };
      }
      return task;
    });
    setTasks(editedTaskList);
  }

  function handleMusicPlay() {
    setMusicPlaying(true);
    window.player.playVideo();
  }

  function handleMusicPause() {
    setMusicPlaying(false);
    window.player.pauseVideo();
  }

  function handleVideoIdChange(e) {
    const url = e.target.value;
    const videoId = url.split("v=")[1];
    const ampersandPosition = videoId ? videoId.indexOf("&") : -1;
    if (ampersandPosition !== -1) {
      setVideoId(videoId.substring(0, ampersandPosition));
    } else {
      setVideoId(videoId);
    }
  }

  const taskList = tasks
    .filter(FILTER_MAP[filter])
    .map((task) => (
      <Todo
        id={task.id}
        name={task.name}
        completed={task.completed}
        key={task.id}
        toggleTaskCompleted={toggleTaskCompleted}
        deleteTask={deleteTask}
        editTask={editTask}
      />
    ));

  const filterList = FILTER_NAMES.map((name) => (
    <FilterButton 
      key={name} 
      name={name} 
      isPressed={name === filter}
      setFilter={setFilter} 
    />
  ));

  const incompleteTasks = tasks.filter((task) => !task.completed).length;
  const tasksNoun = taskList.length !== 1 ? "tasks" : "task";
  const headingText = `${incompleteTasks} ${tasksNoun} remaining`;

  return (
    <div className="fitnessapp stack-large">
      <h1>FitSync</h1>
      <Form addTask={addTask} />
      <div className="filters btn-group stack-exception">
        {filterList}
      </div>
      <h2 id="list-heading">{headingText}</h2>
      <div className="music-controls">
        <input
          type="text"
          placeholder="Paste YouTube link here"
          onChange={handleVideoIdChange}
          className="video-input"
        />
        <button onClick={handleMusicPlay} className="btn btn__primary">
          {musicPlaying ? "Pause Music" : "Play Music"}
        </button>
        <button onClick={handleMusicPause} className="btn btn__danger">
          Stop Music
        </button>
      </div>
      {videoId && (
        <YouTubePlayer
          videoId={videoId}
          onReady={() => console.log("Player is ready")}
          onPlay={() => console.log("Playing")}
          onPause={() => console.log("Paused")}
          onEnd={() => console.log("Ended")}
        />
      )}
      <ul
        role="list"
        className="fitness-list stack-large stack-exception"
        aria-labelledby="list-heading">
        {taskList}
      </ul>
    </div>
  );
}

export default App;
