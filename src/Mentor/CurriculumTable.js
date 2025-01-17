import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";

const curriculum = {
    // Python Batches
    "PFS-100": [
      { dayOrder: 1, topic: "Introduction to Python", topicsToCover: "Syntax, Variables, Data Types" },
      { dayOrder: 2, topic: "Control Statements", topicsToCover: "If-Else, Loops" },
      { dayOrder: 3, topic: "Functions", topicsToCover: "Definition, Parameters, Return Values" },
      { dayOrder: 4, topic: "Error Handling", topicsToCover: "Try-Except Blocks, Raising Exceptions" },
    ],
    "PFS-101": [
      { dayOrder: 1, topic: "Flask Basics", topicsToCover: "Setup, Routing" },
      { dayOrder: 2, topic: "Templates in Flask", topicsToCover: "Jinja2 Templates" },
      { dayOrder: 3, topic: "Forms in Flask", topicsToCover: "Handling Form Data" },
      { dayOrder: 4, topic: "Database Integration", topicsToCover: "Connecting Flask with SQL Databases" },
    ],
    "PFS-102": [
      { dayOrder: 1, topic: "Data Analysis with Python", topicsToCover: "Pandas, Numpy" },
      { dayOrder: 2, topic: "Visualization", topicsToCover: "Matplotlib, Seaborn" },
      { dayOrder: 3, topic: "Advanced Python", topicsToCover: "Decorators, Generators" },
      { dayOrder: 4, topic: "Unit Testing", topicsToCover: "Testing Frameworks in Python" },
    ],
    "PFS-103": [
      { dayOrder: 1, topic: "APIs with Flask", topicsToCover: "Building REST APIs" },
      { dayOrder: 2, topic: "Authentication", topicsToCover: "JWT, OAuth Basics" },
      { dayOrder: 3, topic: "Middleware in Flask", topicsToCover: "Custom Middleware" },
      { dayOrder: 4, topic: "Deployment", topicsToCover: "Deploying Flask Apps on Cloud" },
    ],
    "PFS-104": [
      { dayOrder: 1, topic: "Machine Learning with Python", topicsToCover: "Scikit-Learn Basics" },
      { dayOrder: 2, topic: "Regression Models", topicsToCover: "Linear Regression, Logistic Regression" },
      { dayOrder: 3, topic: "Classification Models", topicsToCover: "Decision Trees, Random Forest" },
      { dayOrder: 4, topic: "Clustering Models", topicsToCover: "K-Means, DBSCAN" },
    ],
  
    // Java Batches
    "JFS-10": [
      { dayOrder: 1, topic: "Java Basics", topicsToCover: "Data Types, Variables, Loops" },
      { dayOrder: 2, topic: "Control Flow", topicsToCover: "If-Else, Switch, Loops" },
      { dayOrder: 3, topic: "OOP Concepts", topicsToCover: "Classes, Objects, Inheritance" },
      { dayOrder: 4, topic: "Exception Handling", topicsToCover: "Try-Catch, Throw" },
    ],
    "JFS-11": [
      { dayOrder: 1, topic: "Core Java Basics", topicsToCover: "Variables, Data Types, Operators" },
      { dayOrder: 2, topic: "OOP in Java", topicsToCover: "Classes, Objects, Inheritance" },
      { dayOrder: 3, topic: "Interfaces and Abstract Classes", topicsToCover: "Implementation Details" },
      { dayOrder: 4, topic: "Java Collections", topicsToCover: "Lists, Sets, Maps" },
    ],
    "JFS-12": [
      { dayOrder: 1, topic: "Advanced Java Basics", topicsToCover: "Annotations, Enums" },
      { dayOrder: 2, topic: "Threads in Java", topicsToCover: "Multithreading Basics" },
      { dayOrder: 3, topic: "File Handling", topicsToCover: "Reading and Writing Files" },
      { dayOrder: 4, topic: "Database Connectivity", topicsToCover: "JDBC Basics" },
    ],
    "JFS-13": [
      { dayOrder: 1, topic: "Spring Framework Basics", topicsToCover: "Dependency Injection" },
      { dayOrder: 2, topic: "Spring Boot", topicsToCover: "Setting up Projects" },
      { dayOrder: 3, topic: "REST APIs in Spring", topicsToCover: "Controllers, Services" },
      { dayOrder: 4, topic: "Security in Spring", topicsToCover: "Spring Security Basics" },
    ],
    "JFS-14": [
      { dayOrder: 1, topic: "Hibernate Basics", topicsToCover: "ORM Concepts, Annotations" },
      { dayOrder: 2, topic: "Hibernate Relationships", topicsToCover: "One-to-One, One-to-Many" },
      { dayOrder: 3, topic: "Query Language", topicsToCover: "HQL, Criteria API" },
      { dayOrder: 4, topic: "Performance Optimization", topicsToCover: "Caching, Fetch Strategies" },
    ],
  
    // Soft Skills Batches
    "SoftSkills-01": [
      { dayOrder: 1, topic: "Communication Skills", topicsToCover: "Verbal, Non-Verbal Communication" },
      { dayOrder: 2, topic: "Presentation Skills", topicsToCover: "Structuring a Presentation, Delivery Techniques" },
      { dayOrder: 3, topic: "Teamwork", topicsToCover: "Collaboration, Conflict Resolution" },
      { dayOrder: 4, topic: "Leadership Skills", topicsToCover: "Motivation, Delegation, Decision-Making" },
    ],
    "SoftSkills-02": [
      { dayOrder: 1, topic: "Emotional Intelligence", topicsToCover: "Self-Awareness, Empathy" },
      { dayOrder: 2, topic: "Time Management", topicsToCover: "Prioritization, Avoiding Procrastination" },
      { dayOrder: 3, topic: "Problem Solving", topicsToCover: "Critical Thinking, Creative Solutions" },
      { dayOrder: 4, topic: "Workplace Etiquette", topicsToCover: "Professional Behavior, Email Etiquette" },
    ],
    "SoftSkills-03": [
      { dayOrder: 1, topic: "Conflict Management", topicsToCover: "Identifying Conflicts, Negotiation" },
      { dayOrder: 2, topic: "Public Speaking", topicsToCover: "Overcoming Stage Fear, Engaging Audience" },
      { dayOrder: 3, topic: "Interpersonal Skills", topicsToCover: "Building Rapport, Listening Skills" },
      { dayOrder: 4, topic: "Stress Management", topicsToCover: "Relaxation Techniques, Resilience Building" },
    ],
  
    // Aptitude Batches
    "Aptitude-01": [
      { dayOrder: 1, topic: "Quantitative Aptitude Basics", topicsToCover: "Number System, HCF, LCM" },
      { dayOrder: 2, topic: "Percentage and Profit-Loss", topicsToCover: "Profit-Loss, Discount, Simple Problems" },
      { dayOrder: 3, topic: "Time and Work", topicsToCover: "Work Problems, Efficiency Calculation" },
      { dayOrder: 4, topic: "Time, Speed, Distance", topicsToCover: "Trains, Boats, Races" },
    ],
    "Aptitude-02": [
      { dayOrder: 1, topic: "Logical Reasoning Basics", topicsToCover: "Blood Relations, Directions" },
      { dayOrder: 2, topic: "Syllogisms and Puzzles", topicsToCover: "Venn Diagrams, Seating Arrangements" },
      { dayOrder: 3, topic: "Data Interpretation", topicsToCover: "Pie Charts, Bar Graphs, Tables" },
      { dayOrder: 4, topic: "Number Series and Patterns", topicsToCover: "Finding Patterns, Next in Series" },
    ],
    "Aptitude-03": [
      { dayOrder: 1, topic: "Probability and Permutations", topicsToCover: "Basics of Probability, Counting Principles" },
      { dayOrder: 2, topic: "Algebra and Equations", topicsToCover: "Linear, Quadratic Equations" },
      { dayOrder: 3, topic: "Geometry and Mensuration", topicsToCover: "Shapes, Areas, Volumes" },
      { dayOrder: 4, topic: "Advanced Data Interpretation", topicsToCover: "Case Studies, Complex Charts" },
    ],
  
    // Frontend Batches
    "Frontend-01": [
      { dayOrder: 1, topic: "HTML Basics", topicsToCover: "Tags, Attributes, Structure" },
      { dayOrder: 2, topic: "CSS Basics", topicsToCover: "Selectors, Properties, Box Model" },
      { dayOrder: 3, topic: "CSS Flexbox", topicsToCover: "Layout, Alignments" },
      { dayOrder: 4, topic: "Responsive Design", topicsToCover: "Media Queries, Mobile First" },
    ],
    "Frontend-02": [
      { dayOrder: 1, topic: "JavaScript Basics", topicsToCover: "Variables, Data Types, Functions" },
      { dayOrder: 2, topic: "DOM Manipulation", topicsToCover: "Events, Selectors, Elements" },
      { dayOrder: 3, topic: "ES6 Features", topicsToCover: "Arrow Functions, Promises, Modules" },
      { dayOrder: 4, topic: "Asynchronous JavaScript", topicsToCover: "Callbacks, Async/Await" },
    ],
    "Frontend-03": [
      { dayOrder: 1, topic: "React Basics", topicsToCover: "Components, JSX, Props" },
      { dayOrder: 2, topic: "State and Lifecycle", topicsToCover: "useState, useEffect" },
      { dayOrder: 3, topic: "React Router", topicsToCover: "Navigation, Dynamic Routes" },
      { dayOrder: 4, topic: "Redux Basics", topicsToCover: "State Management, Actions, Reducers" },
    ],
    "Frontend-04": [
      { dayOrder: 1, topic: "Vue.js Basics", topicsToCover: "Vue Instance, Components, Directives" },
      { dayOrder: 2, topic: "Vue Router", topicsToCover: "Navigation, Dynamic Routing" },
      { dayOrder: 3, topic: "Vuex for State Management", topicsToCover: "Store, Actions, Mutations" },
      { dayOrder: 4, topic: "Vue.js with APIs", topicsToCover: "Fetching Data, Displaying Results" },
    ],
  };
  

  const CurriculumTable = ({ selectedBatch }) => {
    const [mentorData, setMentorData] = useState([]);
  
    // Load curriculum for the selected batch
    useEffect(() => {
      if (selectedBatch) {
        const batchCurriculum = curriculum[selectedBatch] || [];
        setMentorData(
          batchCurriculum.map((item) => ({
            ...item,
            completed: false,
            videoUrl: "",
          }))
        );
      } else {
        setMentorData([]);
      }
    }, [selectedBatch]);
  
    const handleUpdate = (index, field, value) => {
      const updatedData = [...mentorData];
      updatedData[index][field] = value;
      setMentorData(updatedData);
    };
  
    const handleSubmit = () => {
      const incompleteFields = mentorData.filter(
        (item) => !item.completed || !item.videoUrl.trim()
      );
    
      if (incompleteFields.length > 0) {
        Swal.fire({
          title: "Incomplete Fields",
          text: "Please ensure all topics are marked as completed and video URLs are filled.",
          icon: "warning",
          confirmButtonText: "Ok",
        });
        return;
      }
    
      Swal.fire({
        title: "Submission Successful",
        text: "Mentor data has been submitted successfully!",
        icon: "success",
        confirmButtonText: "Great!",
      });
    
      console.log("Mentor Data Submitted:", mentorData);
      // Add logic to send data to the backend or update student courses
    };
    
  
    return (
      <div className="bg-black text-white p-6 rounded-lg shadow-lg">
        {mentorData.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="table-auto w-full text-left border-collapse">
              <thead className="bg-gray-800">
                <tr>
                  <th className="p-3 border-b-2 border-gray-600">Day Order</th>
                  <th className="p-3 border-b-2 border-gray-600">Topic</th>
                  <th className="p-3 border-b-2 border-gray-600">Topics to Cover</th>
                  <th className="p-3 border-b-2 border-gray-600">Completed</th>
                  <th className="p-3 border-b-2 border-gray-600">Video URL</th>
                </tr>
              </thead>
              <tbody>
                {mentorData.map((item, index) => (
                  <tr
                    key={index}
                    className="odd:bg-gray-900 even:bg-gray-800 hover:bg-gray-700 transition-colors"
                  >
                    <td className="p-3 border-b border-gray-600">{item.dayOrder}</td>
                    <td className="p-3 border-b border-gray-600">{item.topic}</td>
                    <td className="p-3 border-b border-gray-600">{item.topicsToCover}</td>
                    <td className="p-3 border-b border-gray-600">
                      <input
                        type="checkbox"
                        className="w-5 h-5 text-blue-500 border-gray-300 rounded focus:ring focus:ring-blue-300"
                        checked={item.completed}
                        onChange={(e) =>
                          handleUpdate(index, "completed", e.target.checked)
                        }
                      />
                    </td>
                    <td className="p-3 border-b border-gray-600">
                      <input
                        type="text"
                        value={item.videoUrl}
                        className="w-full px-3 py-2 bg-gray-900 text-white border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        onChange={(e) =>
                          handleUpdate(index, "videoUrl", e.target.value)
                        }
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="flex justify-end mt-4">
              <button
                className="px-6 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition-all"
                onClick={handleSubmit}
              >
                Submit to Student Courses
              </button>
            </div>
          </div>
        ) : (
          <p className="text-center text-lg">Please select a batch to view the curriculum.</p>
        )}
      </div>
    );
  };
  
  

export default CurriculumTable;
