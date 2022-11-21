// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { useState, useMemo } from 'react';
import { Route, Routes } from 'react-router-dom';

import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';

import Layout from './redux/screens/Layout';
import RequireAuth from './redux/screens/RequireAuth';

import './styles/global.scss';

import AdminHomeScreen from './screens/admin/AdminHomeScreen';
import AdminProfileScreen from './screens/admin/AdminProfileScreen';

import StudentHomeScreen from './screens/student/StudentHomeScreen';
import StudentEnrollmentScreen from './screens/student/StudentEnrollmentScreen';
import StudentReportCardScreen from './screens/student/StudentReportCardScreen';
import StudentScheduleScreen from './screens/student/StudentScheduleScreen';
import StudentProfileScreen from './screens/student/StudentProfileScreen';
import FacultyHomeScreen from './screens/faculty/FacultyHomeScreen';
import FacultyScheduleScreen from './screens/faculty/FacultyScheduleScreen';
import FacultyProfileScreen from './screens/faculty/FacultyProfileScreen';
import FacultyAdvisoryClassScreen from './screens/faculty/FacultyAdvisoryClassScreen';
import FacultyShsGradeScreen from './screens/faculty/FacultyShsGradeScreen';
import AdminStudentRecordsScreen from './screens/admin/AdminStudentRecordsScreen';
import AdminStudentMasterlist from './screens/admin/AdminStudentMasterlist';
import AdminStudentProfileScreen from './screens/admin/AdminStudentProfileScreen';
import AdminFacultyMasterlistScreen from './screens/admin/AdminFacultyMasterlistScreen';
import AdminFacultyProfileScreen from './screens/admin/AdminFacultyProfileScreen';
import AdminStrandScreen from './screens/admin/AdminStrandScreen';
import AdminEnrolleesScreen from './screens/admin/AdminEnrolleesScreen';
import AdminSubjectScreen from './screens/admin/AdminSubjectScreen';
import AdminFacultyScheduleScreen from './screens/admin/AdminFacultyScheduleScreen';
import AdminStudentScheduleScreen from './screens/admin/AdminStudentScheduleScreen';
import AdminStudentEnrolledlist from './screens/admin/AdminStudentEnrolledlist';
import AdminCreateEnrolleeScreen from './screens/admin/AdminCreateEnrolleeScreen';
import AdminEnrolleeScreen from './screens/admin/AdminEnrolleeScreen';
import AdminViewSubjectScreen from './screens/admin/AdminViewSubjectScreen';
import AdminCreateSubjectScreen from './screens/admin/AdminCreateSubjectScreen';
import AdminStudentSectionsScreen from './screens/admin/AdminStudentSectionsScreen';
import AdminCreateSectionScreen from './screens/admin/AdminCreateSectionScreen';
import AdminViewSectionScreen from './screens/admin/AdminViewSectionScreen';
import AdminCreateScheduleScreen from './screens/admin/AdminCreateScheduleScreen';

//css is rough change when finalizing
export function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<LoginScreen />} />

          {/*Protected Routes */}
          <Route element={<RequireAuth />}>
            {/* Admin Screens */}
            <Route path="/admin/home" element={<AdminHomeScreen />} />
            <Route path="/admin/profile" element={<AdminProfileScreen />} />
            <Route
              path="/admin/studentrecords"
              element={<AdminStudentRecordsScreen />}
            />
            <Route
              path="/admin/studentlist"
              element={<AdminStudentMasterlist />}
            />
            <Route
              path="/admin/student"
              element={<AdminStudentProfileScreen />}
            />
            <Route
              path="/admin/facultylist"
              element={<AdminFacultyMasterlistScreen />}
            />
            <Route
              path="/admin/faculty"
              element={<AdminFacultyProfileScreen />}
            />
            <Route path="/admin/strand" element={<AdminStrandScreen />} />
            <Route
              path="/admin/enrollees/:strand"
              element={<AdminEnrolleesScreen />}
            />
            <Route
              path="/admin/enrollee/:strand/:id"
              element={<AdminEnrolleeScreen />}
            />
            <Route
              path="/admin/enrollee/create"
              element={<AdminCreateEnrolleeScreen />}
            />
            <Route
              path="/admin/subject/:strand"
              element={<AdminSubjectScreen />}
            />
            <Route
              path="/admin/subject/:strand/:id"
              element={<AdminViewSubjectScreen />}
            />
            <Route
              path="/admin/subject/:subjectStrand/create"
              element={<AdminCreateSubjectScreen />}
            />
            <Route
              path="/admin/facultyschedule"
              element={<AdminFacultyScheduleScreen />}
            />
            <Route
              path="/admin/facultyschedule/create"
              element={<AdminCreateScheduleScreen />}
            />
            <Route
              path="/admin/studentschedule"
              element={<AdminStudentScheduleScreen />}
            />
            <Route
              path="/admin/enrolledlist"
              element={<AdminStudentEnrolledlist />}
            />
            <Route
              path="/admin/section"
              element={<AdminStudentSectionsScreen />}
            />
            <Route
              path="/admin/section/:id"
              element={<AdminViewSectionScreen />}
            />
            <Route
              path="/admin/section/create"
              element={<AdminCreateSectionScreen />}
            />

            {/* Student Screens */}
            <Route path="/student/home" element={<StudentHomeScreen />} />
            <Route
              path="/student/enrollment"
              element={<StudentEnrollmentScreen />}
            />
            <Route
              path="/student/reportcard"
              element={<StudentReportCardScreen />}
            />
            <Route
              path="/student/schedule"
              element={<StudentScheduleScreen />}
            />
            <Route path="/student/profile" element={<StudentProfileScreen />} />

            {/* Faculty Screens */}
            <Route path="/faculty/home" element={<FacultyHomeScreen />} />
            <Route
              path="/faculty/schedule"
              element={<FacultyScheduleScreen />}
            />
            <Route path="/faculty/profile" element={<FacultyProfileScreen />} />
            <Route
              path="/faculty/shsgrade"
              element={<FacultyShsGradeScreen />}
            />
            <Route
              path="/faculty/advisoryclass"
              element={<FacultyAdvisoryClassScreen />}
            />
            <Route path="/register" element={<RegisterScreen />} />
          </Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
