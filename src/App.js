import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import ProgramManagerSignup from './Signup/ProgramManagerSignup/ProgramManagerSignup';
import StudentSearch from './StudentSearch/StudentSearch';
import NotFound from './NotFound';
import Home from './Home/Home';
import ScrollToTop from './ScrollToTop'
import StudentLogin from './Login/StudentLogin';
import Admin from './Login/Admin.js'
import AddJob from './AddJob/AddJob';
import BDEDashboard from './BDEDashboard/BDEDashboard';
import JobsList from './JobsList/JobsList';
import StudentsApplied from './StudentsApplied/StudentsApplied';
import BDEStudentsAppliedJobsList from './BDEStudentsAppliedJobsList/BDEStudentsAppliedJobsList';
import StudentsList from './StudentsList/StudentsList';
import EmailApplyJob from './EmailApplyJob/EmailApplyJob';
import ForgotPassword from './ForgotPassword/ForgotPassword';
// import BdeForgotPassword from './ForgotPassword/BdeForgotPassword'
// import RequestForm from './RequestForm/Requestform'
  import {SidebarV} from './Student/SidebarV';
import StudentProfileUpdateVV from './StudentProfileUpdate/StudentProfileUpdateVV';
import SuperAdmin from './Login/SuperAdmin';
import Bdemanagement from './Admin/Bdemanagement.js';
import ProgramManagement from './Admin/ProgramManagement.js';
import MentorManagement from './Admin/MentorManagement.js';
import Reports from './Admin/Reports.js';
import AtsUpload from './Ats/AtsUpload.js';
import AtsResult from './Ats/AtsResult.js';
import AttendanceSystem from './Mentor/AttendanceSystem.jsx';
import CompilerHome from './Compiler/CompilerHome.js';
import MockInterviewHome from './MockInterview/MockInterviewHome.js';
import CurriculumManagement from './programManager/CurriculumManagement.jsx';
import Course from './Mentor/Course.jsx';
import AttendanceTable from './Mentor/AttendanceTable.js'
import CreateExam from './OnlineExam/admin/CreateExam.jsx'
import AddQuestions from './OnlineExam/admin/AddQuestions.jsx'
import ManageQuestions from './OnlineExam/admin/ManageQuestions.jsx';
import EditExam from './OnlineExam/admin/EditExam.jsx';
import ManageExams from './OnlineExam/admin/ManageExams.jsx';
import EditQuestion from './OnlineExam/admin/EditQuestion.jsx'
import MainReport from './SuperAdmin/AttendanceReport/MainReport.jsx';
import StudentCurriculum from './Curriculam/StudentCurriculum.js';
import ManageStudentsList from './programManager/ManageStudentsList.jsx'
import BatchScheduler from './programManager/BatchScheduler.jsx';
import BatchForm from './programManager/BatchForm.jsx';
import StudentDashboard from './StudentProfile/StudentDashboard.jsx';
import ViewBatch from './programManager/ViewBatch.jsx';
import MentorDashboard from './Mentor/MentorDashboard.jsx';
import ProgramManagerDashboard from './programManager/ProgramManagerDashboard.jsx';
import LeaveRequest from './programManager/LeaveRequest.jsx';
import LiveClasses from './programManager/LiveClasses.jsx';
import InstructorCompletion from './programManager/InstructorCompletion.jsx';
// import Bdemanagement from './Superadmin/Bdemanagement';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const userType = localStorage.getItem('userType');

  if (!userType) {
    return <Navigate to="/" replace />;
  }


  if (!allowedRoles.includes(userType)) {
    return <Navigate to="/not-found" replace />;
  }

  return children;
};

export default function App() {
  return (
    <div>
      <SidebarV />
      <ScrollToTop/>

      <div>
        <Routes>
         <Route
          path="/"
          element={
            localStorage.getItem('userType') ? (
              <Navigate
                to={
                  {
                    student_login_details: '/student-dashboard',
                    Mentors: '/mentor-dashboard',
                    BDE_data: '/dashboard',
                    Manager: '/manager-dashboard',
                    superAdmin: '/reports',
                    super: '/attendance-report',
                  }[localStorage.getItem('userType')] || '/not-found'
                }
                replace
              />
            ) : (
              <Home />
            )
          }
        />

         <Route
          path="/"
          element={
            localStorage.getItem('userType') ? (
              <Navigate
                to={
                  {
                    student_login_details: '/student-dashboard',
                    Mentors: '/mentor-dashboard',
                    BDE_data: '/dashboard',
                    Manager: '/manager-dashboard',
                    superAdmin: '/reports',
                    super: '/attendance-report',
                  }[localStorage.getItem('userType')] || '/not-found'
                }
                replace
              />
            ) : (
              <Home />
            )
          }
        />

          <Route
          path="/login"
          element={
            localStorage.getItem('userType') ? (
              <Navigate
                to={
                  {
                    student_login_details: '/student-dashboard',
                    Mentors: '/mentor-dashboard',
                    BDE_data: '/dashboard',
                    Manager: '/manager-dashboard',
                    superAdmin: '/reports',
                    super: '/attendance-report',
                  }[localStorage.getItem('userType')] || '/not-found'
                }
                replace
              />
            ) : (
              <StudentLogin /> 
            )
          }
        />

         <Route
          path="/superadmin"
          element={
            localStorage.getItem('userType') ? (
              <Navigate
                to={
                  {
                    student_login_details: '/student-dashboard',
                    Mentors: '/mentor-dashboard',
                    BDE_data: '/dashboard',
                    Manager: '/manager-dashboard',
                    superAdmin: '/reports',
                    super: '/attendance-report',
                  }[localStorage.getItem('userType')] || '/not-found'
                }
                replace
              />
            ) : (
              <SuperAdmin /> 
            )
          }
        />

          <Route
          path="/admin"
          element={
            localStorage.getItem('userType') ? (
              <Navigate
                to={
                  {
                    student_login_details: '/student-dashboard',
                    Mentors: '/mentor-dashboard',
                    BDE_data: '/dashboard',
                    Manager: '/manager-dashboard',
                    superAdmin: '/reports',
                    super: '/attendance-report',
                  }[localStorage.getItem('userType')] || '/not-found'
                }
                replace
              />
            ) : (
              <Admin /> 
            )
          }
        />


       <Route
          path="/forgotPassword"
          element={
            localStorage.getItem('userType') ? (
              <Navigate
                to={
                  {
                    student_login_details: '/student-dashboard',
                    Mentors: '/mentor-dashboard',
                    BDE_data: '/dashboard',
                    Manager: '/manager-dashboard',
                    superAdmin: '/reports',
                    super: '/attendance-report',
                  }[localStorage.getItem('userType')] || '/not-found'
                }
                replace
              />
            ) : (
              <ForgotPassword /> 
            )
          }
        />


      
            
  
          {/* <Route path="/login" element={<StudentLogin />} />
          <Route path="/superadmin" element={<SuperAdmin />} /> */}

          {/* <Route path='/forgotPassword' element={<ForgotPassword/>}/> */}
          {/* <Route path='/bdeforgotPassword' element={<BdeForgotPassword/>}/> */}
         
          <Route 
            path="/addjob" 
            element={
              <ProtectedRoute allowedRoles={['BDE_data','company','Manager']}>
                <AddJob />
              </ProtectedRoute>
            } 
          />

           <Route 
            path="/manager-dashboard" 
            element={
              <ProtectedRoute allowedRoles={['Manager']}>
                <ProgramManagerDashboard />
              </ProtectedRoute>
            } 
          />

          <Route 
            path="/leave-request" 
            element={
              <ProtectedRoute allowedRoles={['Manager']}>
                <LeaveRequest />
              </ProtectedRoute>
            } 
          />

          <Route 
            path="/live-classes" 
            element={
              <ProtectedRoute allowedRoles={['Manager']}>
                <LiveClasses />
              </ProtectedRoute>
            } 
          />

          
         <Route 
            path="/course-completion" 
            element={
              <ProtectedRoute allowedRoles={['Manager']}>
                <InstructorCompletion />
              </ProtectedRoute>
            } 
          />


        
          <Route 
            path="/studentsearch" 
            element={
              <ProtectedRoute allowedRoles={['Manager','BDE_data','super']}>
                <StudentSearch />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/bdes" 
            element={
              <ProtectedRoute allowedRoles={['superAdmin','admin']}>
                <Bdemanagement />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/mentors" 
            element={
              <ProtectedRoute allowedRoles={['superAdmin','admin']}>
                <MentorManagement />
              </ProtectedRoute>
            } 

          />
           
           <Route 
            path="/attendance" 
            element={
              <ProtectedRoute allowedRoles={['Mentors']}>
                < AttendanceSystem/>
              </ProtectedRoute>
            } 

          />
           <Route 
            path="/mentor-dashboard" 
            element={
              <ProtectedRoute allowedRoles={['Mentors']}>
                < MentorDashboard/>
              </ProtectedRoute>
            } 

          />
           <Route 
            path="/course" 
            element={
              <ProtectedRoute allowedRoles={['Mentors']}>
                < Course/>
              </ProtectedRoute>
            } 

          />

          <Route 
            path="/create-exam" 
            element={
              <ProtectedRoute allowedRoles={['Mentors']}>
                <CreateExam />
              </ProtectedRoute>
            } 
          />

           <Route 
            path="/add-questions/:examId" 
            element={
              <ProtectedRoute allowedRoles={['Mentors']}>
                <AddQuestions />
              </ProtectedRoute>
            } 
          />

          <Route 
            path="/manage-exams" 
            element={
              <ProtectedRoute allowedRoles={['Mentors']}>
                <ManageExams />
              </ProtectedRoute>
            } 
          />

          <Route 
            path="/manage-questions/:examId" 
            element={
              <ProtectedRoute allowedRoles={['Mentors']}>
                <ManageQuestions />
              </ProtectedRoute>
            } 
          />

          <Route 
            path="/edit-question/:questionId" 
            element={
              <ProtectedRoute allowedRoles={['Mentors']}>
                <EditQuestion />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/edit-exam/:examId" 
            element={
              <ProtectedRoute allowedRoles={['Mentors']}>
                <EditExam />
              </ProtectedRoute>
            } 
          />



            <Route 
            path="/attendancedata" 
            element={
              <ProtectedRoute allowedRoles={['Mentors','super','Manager']}>
                < AttendanceTable/>
              </ProtectedRoute>
            } 

          />
          
          <Route 
            path="/student-enroll" 
            element={
              <ProtectedRoute allowedRoles={['superAdmin','Manager','admin']}>
                <ProgramManagerSignup />
              </ProtectedRoute>
            } 
          />
           <Route 
            path="/curriculum" 
            element={
              <ProtectedRoute allowedRoles={['superAdmin']}>
                <CurriculumManagement />
              </ProtectedRoute>
            } 
          />
           <Route 
            path="/program-managers" 
            element={
              <ProtectedRoute allowedRoles={['superAdmin','admin']}>
                <ProgramManagement />
              </ProtectedRoute>
            } 
          />

          <Route 
            path="/reports" 
            element={
              <ProtectedRoute allowedRoles={['superAdmin','admin','super']}>
                <Reports />
              </ProtectedRoute>
            } 
          />

          <Route 
            path="/attendance-report" 
            element={
              <ProtectedRoute allowedRoles={['super']}>
                <MainReport />
              </ProtectedRoute>
            } 
          />


          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute allowedRoles={['BDE_data','company','Manager','super']}>
                <BDEDashboard />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/jobslist" 
            element={
              <ProtectedRoute allowedRoles={['student_login_details']}>
                <JobsList />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/courses" 
            element={
              <ProtectedRoute allowedRoles={['student_login_details']}>
                <StudentCurriculum />
              </ProtectedRoute>
            } 
          />
           <Route 
            path="/compiler" 
            element={
              <ProtectedRoute allowedRoles={['student_login_details','Mentors','super']}>
                <CompilerHome />
              </ProtectedRoute>
            } 
          />
             <Route 
            path="/mock-interviews" 
            element={
              <ProtectedRoute allowedRoles={['student_login_details']}>
                <MockInterviewHome />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/studentsapplied" 
            element={
              <ProtectedRoute allowedRoles={['company', 'BDE_data','Manager','super']}>
                <StudentsApplied />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/bdestudentsappliedjoblist/:jobId" 
            element={
              <ProtectedRoute allowedRoles={['BDE_data','Manager','super']}>
                <BDEStudentsAppliedJobsList />
              </ProtectedRoute>
            } 
          />
           <Route 
            path="/managestudentslist" 
            element={
              <ProtectedRoute allowedRoles={['Manager','BDE_data','Manager',"Mentors"]}>
                <ManageStudentsList />
              </ProtectedRoute>
            } 
          />

          <Route 
            path="/batchschedule" 
            element={
              <ProtectedRoute allowedRoles={['Manager']}>
                <BatchScheduler />
              </ProtectedRoute>
            } 
          />

            <Route 
            path="/createbatch" 
            element={
              <ProtectedRoute allowedRoles={['Manager']}>
                <BatchForm />
              </ProtectedRoute>
            } 
          />
          
          <Route 
            path="/viewbatch" 
            element={
              <ProtectedRoute allowedRoles={['Manager']}>
                <ViewBatch />
              </ProtectedRoute>
            } 
          />
          
          {/* <Route 
            path="/student-profile" 
            element={
              <ProtectedRoute allowedRoles={['student_login_details']}>
                <StudentProfile />
              </ProtectedRoute>
            } 
          /> */}
           <Route 
            path="/student-dashboard" 
            element={
              <ProtectedRoute allowedRoles={['student_login_details']}>
                <StudentDashboard />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/student-profile" 
            element={
              <ProtectedRoute allowedRoles={['student_login_details']}>
                <StudentProfileUpdateVV />
              </ProtectedRoute>
            } 
          />
            <Route 
            path="/ats-upload" 
            element={
              <ProtectedRoute allowedRoles={['student_login_details','super']}>
                <AtsUpload />
              </ProtectedRoute>
            } 
          />

          <Route 
            path="/ats-result" 
            element={
              <ProtectedRoute allowedRoles={['student_login_details','super']}>
                <AtsResult />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/studentslist" 
            element={
              <ProtectedRoute allowedRoles={['BDE_data','Manager','Mentors','super','superAdmin']}>
                <StudentsList />
              </ProtectedRoute>
            } 
          />
          
          <Route 
            path="/directapply/:student_id/:job_id" 
            element={
              <ProtectedRoute allowedRoles={['student_login_details']}>
                <EmailApplyJob />
              </ProtectedRoute>
            } 
          />

          
          <Route path="/not-found" element={<NotFound />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
      {/* <Footer /> */}
    </div>
  );
}


