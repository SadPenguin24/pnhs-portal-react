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
import AdminScheduleScreen from './screens/admin/AdminScheduleScreen';
import AdminStudentEnrolledlist from './screens/admin/AdminStudentEnrolledlist';
import AdminCreateEnrolleeScreen from './screens/admin/AdminCreateEnrolleeScreen';
import AdminEnrolleeScreen from './screens/admin/AdminEnrolleeScreen';
import AdminViewSubjectScreen from './screens/admin/AdminViewSubjectScreen';
import AdminCreateSubjectScreen from './screens/admin/AdminCreateSubjectScreen';
import AdminStudentSectionsScreen from './screens/admin/AdminStudentSectionsScreen';
import AdminCreateSectionScreen from './screens/admin/AdminCreateSectionScreen';
import AdminViewSectionScreen from './screens/admin/AdminViewSectionScreen';
import AdminCreateScheduleScreen from './screens/admin/AdminCreateScheduleScreen';
import AdminCreateProfileScreen from './screens/admin/AdminCreateProfileScreen';
import AdminViewScheduleScreen from './screens/admin/AdminViewScheduleScreen';
import FacultyHandleSectionsScreen from './screens/faculty/FacultyHandleSectionsScreen';
import FacultyEditStudentGrade from './screens/faculty/FacultyEditStudentGrade';

//css is rough change when finalizing
export function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<LoginScreen />} />
          <Route
            path="/enrollee/create"
            element={<AdminCreateEnrolleeScreen />}
          />

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
              path="/admin/student/:id"
              element={<AdminStudentProfileScreen />}
            />
            <Route
              path="/admin/facultylist"
              element={<AdminFacultyMasterlistScreen />}
            />
            <Route
              path="/admin/faculty/:id"
              element={<AdminFacultyProfileScreen />}
            />
            <Route path="/admin/strand" element={<AdminStrandScreen />} />
            <Route
              path="/admin/enrollees/:strand"
              element={<AdminEnrolleesScreen />}
            />
            <Route
              path="/admin/enrollee/:pathStrand/:id"
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
              path="/admin/subject/:pathStrand/:id"
              element={<AdminViewSubjectScreen />}
            />
            <Route
              path="/admin/subject/:subjectStrand/create"
              element={<AdminCreateSubjectScreen />}
            />
            <Route
              path="/admin/schedule/:role"
              element={<AdminScheduleScreen />}
            />
            <Route
              path="/admin/schedule/:role/:id"
              element={<AdminViewScheduleScreen />}
            />
            <Route
              path="/admin/schedule/:role/create"
              element={<AdminCreateScheduleScreen />}
            />
            {/* Admin Student Enrolled Masterlist */}
            {/* <Route
              path="/admin/enrolledlist"
              element={<AdminStudentEnrolledlist />}
            /> */}
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
            <Route
              path="/admin/createprofile"
              element={<AdminCreateProfileScreen />}
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
              path="/faculty/shsgrade/sections"
              element={<FacultyHandleSectionsScreen />}
            />
            <Route
              path="/faculty/shsgrade/section/:sectionId"
              element={<FacultyShsGradeScreen />}
            />
            <Route
              path="/faculty/shsgrade/section/:sectionId/student/:studentId/subject/:subjectId"
              element={<FacultyEditStudentGrade />}
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
