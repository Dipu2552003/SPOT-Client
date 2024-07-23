import React, { Component } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Homepage from "./components/HomePage/Homepage";
import Question from "./components/Question/question";
import Tags from "./components/HomePage/Tags";
import UserProfile from "./components/UserProfile/UserProfile";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Homepage />} />
        <Route exact path="/home" element={<Homepage />} />
        <Route path="/question/:question_id" element={<Question />} />
        <Route path="/tag/:tag" element={<Tags />} />
        <Route path="/user/" element={<UserProfile />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
