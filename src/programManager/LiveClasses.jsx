import React from 'react';

const LiveClasses = () => {
  // Sample data for live classes
  const liveClasses = [
    { id: 1, subject: 'Core Java', instructor: 'John Doe', time: '10:00 AM - 11:30 AM', batch: 'Batch A', status: 'Ongoing' },
    { id: 2, subject: 'Advance Java', instructor: 'Jane Smith', time: '11:45 AM - 1:15 PM', batch: 'Batch B', status: 'Upcoming' },
    { id: 3, subject: 'Python', instructor: 'Sam Wilson', time: '2:00 PM - 3:30 PM', batch: 'Batch A', status: 'Ongoing' },
    { id: 4, subject: 'Frontend', instructor: 'Emily Davis', time: '4:00 PM - 5:30 PM', batch: 'Batch C', status: 'Upcoming' },
    { id: 5, subject: 'MYSQL', instructor: 'Robert Brown', time: '5:45 PM - 7:15 PM', batch: 'Batch D', status: 'Upcoming' },
    { id: 6, subject: 'Aptitude', instructor: 'Sophia Johnson', time: '10:00 AM - 11:30 AM', batch: 'Batch E', status: 'Ongoing' },
    { id: 7, subject: 'Soft Skills', instructor: 'Michael Lee', time: '11:45 AM - 1:15 PM', batch: 'Batch F', status: 'Upcoming' },
    { id: 8, subject: 'Data Science', instructor: 'Olivia Green', time: '2:00 PM - 3:30 PM', batch: 'Batch G', status: 'Ongoing' },
    { id: 9, subject: 'Data Analytics', instructor: 'William Harris', time: '4:00 PM - 5:30 PM', batch: 'Batch H', status: 'Upcoming' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 py-10">
      <div className="container mx-auto px-6">
        <h1 className="text-5xl font-extrabold text-center text-blue-800 mb-12">Live Classes</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {liveClasses.map((liveClass) => (
            <div
              key={liveClass.id}
              className={`p-6 rounded-xl shadow-lg transition transform hover:scale-105 hover:shadow-2xl ${
                liveClass.status === 'Ongoing' ? 'bg-green-100' : 'bg-white'
              }`}
            >
              <h2 className="text-2xl font-bold text-blue-600 mb-2">{liveClass.subject}</h2>
              <p className="text-gray-700 text-lg mb-2">
                <span className="font-medium">Instructor:</span> {liveClass.instructor}
              </p>
              <p className="text-gray-700 text-lg mb-2">
                <span className="font-medium">Time:</span> {liveClass.time}
              </p>
              <p className="text-gray-700 text-lg mb-2">
                <span className="font-medium">Batch:</span> {liveClass.batch}
              </p>
              <div className="text-center mt-4">
                <span
                  className={`inline-block px-4 py-2 rounded-full text-sm font-semibold shadow-md ${
                    liveClass.status === 'Ongoing'
                      ? 'bg-green-500 text-white'
                      : 'bg-yellow-400 text-black'
                  }`}
                >
                  {liveClass.status}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-gray-600 text-lg">Stay updated with the latest classes and improve your skills!</p>
        </div>
      </div>
    </div>
  );
};

export default LiveClasses;
