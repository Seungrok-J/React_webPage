import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import LoginForm from './components/Login';
import Register from './components/Register';
import AdminPage from './components/admin/Admin_Page';
import OrganizationManagement from './components/admin/Admin_OrganizationManagement';
import ReviewManagement from './components/admin/Admin_ReviewManagement';
import ReviewName from './components/admin/Admin_ReviewName';
import ReviewTarget from './components/admin/Admin_ReviewTarget';
import ReviewTemplate from './components/admin/Admin_ReviewTemplate';
import ReviewVisibility from './components/admin/Admin_ReviewVisibility';
import ReviewShare from './components/admin/Admin_ReviewShare';
import ReviewDate from './components/admin/Admin_ReviewDate';
import Home from './components/Home';
import Goals from './components/my/My_Goals';
import Admin_GoalManagement from './components/admin/Admin_GoalManagement';
import UserInfo from './components/UserInfo';
import MySidebar from './components/my/My_Sidebar';
import AdminSidebar from './components/admin/Admin_Sidebar';
import Permission from './components/admin/Admin_GoalPermission';
import Template from './components/admin/Admin_TemplateManagement';
import MyReviewManagement from './components/my/My_Review';
import ReviewDetailsPage from './components/admin/Admin_ReviewDetailsPage';
import ParticipantReview from './components/admin/Admin_ParticipantReviewDetails';
import MyReview from './components/my/My_MyReview';
import ComprehensiveSearch from './components/admin/Admin_ComprehensiveSearch';

export default function AppRoutes({ isLoggedIn, isAdmin }) {
    return (
        <Routes>
            <Route path="/" element={isLoggedIn ? (isAdmin ? <Navigate to="/admin" /> : <Navigate to="/Home" />) : <LoginForm />} />
            <Route path="/admin" element={isAdmin ? <><AdminSidebar /><AdminPage /></> : <Navigate to="/" />} />
            <Route path="/Home" element={isLoggedIn ? <><MySidebar /><Home /></> : <Navigate to="/" />} />
            <Route path="/goals" element={isLoggedIn ? <><MySidebar /><Goals /></> : <Navigate to="/" />} />
            <Route path="/my-page/review-management" element={isLoggedIn ? <><MySidebar /><MyReviewManagement /></> : <Navigate to="/" />} />
            <Route path="/my-page/my-review" element={isLoggedIn ? <><MySidebar /><MyReview /></> : <Navigate to="/" />} />
            <Route path="/admin/organization-management" element={isLoggedIn && isAdmin ? <><AdminSidebar /><OrganizationManagement /></> : <Navigate to="/" />} />
            <Route path="/register" element={<Register />} />
            <Route path="/admin/goal-management" element={isLoggedIn && isAdmin ? <><AdminSidebar /><Admin_GoalManagement /></> : <Navigate to="/" />} />
            <Route path="/admin/review-management" element={isLoggedIn && isAdmin ? <><AdminSidebar /><ReviewManagement /></> : <Navigate to="/" />} />
            <Route path="/admin/review/name" element={<ReviewName />} />
            <Route path="/admin/review/target" element={<ReviewTarget />} />
            <Route path="/admin/review/template" element={<ReviewTemplate />} />
            <Route path="/admin/review/visibility" element={<ReviewVisibility />} />
            <Route path="/admin/review/share" element={<ReviewShare />} />
            <Route path="/admin/review/date" element={<ReviewDate />} />
            <Route path="/admin/goal-permission" element={isLoggedIn && isAdmin ? <><AdminSidebar /><Permission /></> : <Navigate to="/" />} />
            <Route path="/admin/template-management" element={isLoggedIn && isAdmin ? <><AdminSidebar /><Template /></> : <Navigate to="/" />} />
            <Route path="/admin/review/:reviewId/details" element={<ReviewDetailsPage />} />
            <Route path="/admin/review/:reviewId/participant/:participantId" element={<ParticipantReview />} />
            <Route path="/admin/comprehensiveSearch" element={isLoggedIn && isAdmin ? <><AdminSidebar /><ComprehensiveSearch /></> : <Navigate to="/" />}/>
        </Routes>
    );
}
