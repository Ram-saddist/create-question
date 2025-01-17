import React, { useState } from "react";

const subjects = [
  "Python",
  "MySQL",
  "Flask",
  "Frontend",
  "CoreJava",
  "AdvJava",
  "Aptitude",
  "SoftSkills"
];

const curriculum = {
    Python: [
      {
        dayOrder: "Day 1",
        topic: "Introduction to Python",
        topicsToCover: "Syntax, Variables, Data Types",
        video: "https://www.youtube.com/embed/kqtD5dpn9C8",
        content: "Learn the basics of Python, its syntax, and key features.",
      },
      {
        dayOrder: "Day 2",
        topic: "Control Statements",
        topicsToCover: "If-Else, Loops",
        video: "https://www.youtube.com/embed/PqFKRqpHrjw",
        content: "Understand how to control program flow using conditional statements.",
      },
      {
        dayOrder: "Day 3",
        topic: "Introduction to Python",
        topicsToCover: "Syntax, Variables, Data Types",
        video: "https://www.youtube.com/embed/kqtD5dpn9C8",
        content: "Learn the basics of Python, its syntax, and key features.",
      },
      {
        dayOrder: "Day 4",
        topic: "Control Statements",
        topicsToCover: "If-Else, Loops",
        video: "https://www.youtube.com/embed/PqFKRqpHrjw",
        content: "Understand how to control program flow using conditional statements.",
      },
    ],
    Flask: [
      {
        dayOrder: "Day 1",
        topic: "Introduction to Flask",
        topicsToCover: "Setup, Routing",
        video: "https://www.youtube.com/embed/Z1RJmh_OqeA",
        content: "Get started with Flask and create your first web application.",
      },
      {
        dayOrder: "Day 2",
        topic: "Templates and Jinja2",
        topicsToCover: "HTML Templates, Jinja2 Basics",
        video: "https://www.youtube.com/embed/OraYXEr0Irg",
        content: "Learn about Flask templates and dynamic content using Jinja2.",
      },
    ],
    MySQL: [
      {
        dayOrder: "Day 1",
        topic: "Introduction to MySQL",
        topicsToCover: "Database Basics, SQL Syntax",
        video: "https://www.youtube.com/embed/7S_tz1z_5bA",
        content: "Get started with MySQL for database management and queries.",
      },
      {
        dayOrder: "Day 2",
        topic: "CRUD Operations",
        topicsToCover: "Insert, Update, Delete",
        video: "https://www.youtube.com/embed/WFNtmhwU5HU",
        content: "Learn to perform basic CRUD operations in MySQL.",
      },
    ],
    Frontend: [
      {
        dayOrder: "Day 1",
        topic: "HTML Basics",
        topicsToCover: "Tags, Attributes, Forms",
        video: "https://www.youtube.com/embed/UB1O30fR-EE",
        content: "Understand the fundamentals of HTML structure and forms.",
      },
      {
        dayOrder: "Day 2",
        topic: "CSS Basics",
        topicsToCover: "Selectors, Box Model",
        video: "https://www.youtube.com/embed/yfoY53QXEnI",
        content: "Learn the basics of CSS styling and layouts.",
      },
    ],
    CoreJava: [
      {
        dayOrder: "Day 1",
        topic: "Java Basics",
        topicsToCover: "Syntax, Variables",
        video: "https://www.youtube.com/embed/GoXwIVyNvX0",
        content: "Learn the fundamentals of Java programming.",
      },
      {
        dayOrder: "Day 2",
        topic: "Object-Oriented Programming",
        topicsToCover: "Classes, Objects, Inheritance",
        video: "https://www.youtube.com/embed/hBh_CC5y8-s",
        content: "Explore Java's object-oriented programming concepts.",
      },
    ],
    AdvJava: [
      {
        "dayOrder": "Day 1",
        "topic": "JDBC Basics",
        "topicsToCover": "Database Connectivity",
        "video": "https://www.youtube.com/embed/E8lZD3O2a68",
        "content": "JDBC Tutorial | Complete Course for Beginners"
      },
      {
        "dayOrder": "Day 2",
        "topic": "Servlets and JSP",
        "topicsToCover": "Web Applications with Java",
        "video": "https://www.youtube.com/embed/OuBUUkQfBYM",
        "content": "Servlet & JSP Tutorial | Full Course"
      }
    ],
    Aptitude: [
      {
        "dayOrder": "Day 1",
        "topic": "Quantitative Aptitude Basics",
        "topicsToCover": "Numbers, HCF, LCM",
        "video": "https://www.youtube.com/embed/5f8XvsaKnzk",
        "content": "Comprehensive guide on Number System, focusing on HCF and LCM."
      },
      {
        "dayOrder": "Day 2",
        "topic": "Time and Work",
        "topicsToCover": "Efficiency, Work Problems",
        "video": "https://www.youtube.com/embed/QFespYtiIMc",
        "content": "Detailed explanation of Time and Work problems, emphasizing different efficiencies."
      }
    ],
    SoftSkills: [
      {
        dayOrder: "Day 1",
        topic: "Introduction to Soft Skills",
        topicsToCover: "Communication, Teamwork",
        video: "https://www.youtube.com/embed/LPjzfGChGlE",
        content: "Learn about essential soft skills for personal and professional growth.",
      },
      {
        "dayOrder": "Day 2",
        "topic": "Time Management",
        "topicsToCover": "Planning, Prioritization",
        "video": "https://www.youtube.com/embed/IlU-zDU6aQ0",
        "content": "Understand how to effectively manage time and increase productivity."
      },
      
    ],
  };
  
const StudentCurriculum = () => {
  const [selectedSubject, setSelectedSubject] = useState("");

  return (
    <div className="p-8 bg-gradient-to-r from-blue-50 via-purple-50 to-blue-50 min-h-screen">
      <h1 className="text-5xl font-extrabold text-center mb-8 text-purple-600 drop-shadow-md">
        🎓 Welcome to the Learning Hub 🎓
      </h1>

      <div className="flex justify-center mb-12">
        <div className="w-full md:w-1/2 lg:w-1/3">
          <label className="block mb-4 text-xl text-gray-800 font-medium text-center">
            Select a Subject to Begin:
          </label>
          <select
            className="w-full p-4 border-2 border-purple-400 rounded-lg shadow-lg text-lg focus:outline-none focus:ring focus:ring-purple-300"
            onChange={(e) => setSelectedSubject(e.target.value)}
          >
            <option value="">-- Select Subject --</option>
            {subjects.map((subject, index) => (
              <option key={index} value={subject}>
                {subject}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        {selectedSubject ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-8">
            {curriculum[selectedSubject]?.map((item, index) => (
              <div
                key={index}
                className="bg-white shadow-xl rounded-lg p-6 hover:shadow-2xl transition-shadow transform hover:scale-105"
              >
                <h3 className="text-2xl font-bold text-purple-600 mb-4">
                  {item.dayOrder}: {item.topic}
                </h3>
                <p className="text-gray-800 mb-3">
                  <strong>Topics to Cover:</strong> {item.topicsToCover}
                </p>
                <div className="w-full h-72 mb-6 flex justify-center items-center overflow-hidden rounded-lg border-2 border-purple-200">
                  <iframe
                    src={item.video}
                    title={item.topic}
                    className="w-full h-full"
                    style={{ aspectRatio: "1/1" }}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
                <p className="text-gray-700">
                  <strong>Content:</strong> {item.content}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-600 text-xl mt-16">
            Please select a subject to view the curriculum. ✨
          </p>
        )}
      </div>
    </div>
  );
};

export default StudentCurriculum;
