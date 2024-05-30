import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { ReviewProcessProvider } from './components/admin/Admin_ReviewContext';
import Header from './components/Header';
import UserInfo from './components/UserInfo';
import AppRoutes from './routes';
import axios from 'axios';
import './App.css';
import './styles.css';
import { DarkModeProvider } from './DarkModeContext';
function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(true);  // 초기 로그인 상태를 false로 설정
    const [isAdmin, setIsAdmin] = useState(true);  // 초기 관리자 상태를 false로 설정
    const [userInfoVisible, setUserInfoVisible] = useState(false);
    //const [currentUser, setCurrentUser] = useState(null);  // 초기 사용자 정보를 null로 설정
    const [currentUser, setCurrentUser] = useState({
        name: "고영민",
        role: "Project Mangaer",
        organization: "Project Management",
        email: "catmin@company.com",
        isAdmin: true
    });  // 사용자 정보를 초기 설정값으로 제공
    const location = useLocation();

    // useEffect(() => {
    //     // 로그인 상태 확인 및 사용자 정보 가져오기
    //     const checkLoginStatus = async () => {
    //         try {
    //             const response = await axios.get('/api/auth/status');
    //             setIsLoggedIn(response.data.isLoggedIn);
    //             setIsAdmin(response.data.isAdmin);
    //             setCurrentUser(response.data.user);
    //         } catch (error) {
    //             console.error('Failed to fetch user status:', error);
    //             setIsLoggedIn(false);  // 에러 발생 시 로그인 상태를 false로 설정
    //             setIsAdmin(false);  // 에러 발생 시 관리자 상태를 false로 설정
    //         }
    //     };

    //     checkLoginStatus();
    // }, []);

    useEffect(() => {
        console.log(location.pathname);  // 현재 경로 로깅
    }, [location]);
    

    const handleSettingsClick = () => setUserInfoVisible(true);
    const closeUserInfo = () => setUserInfoVisible(false);
    const isReviewProcessPage = location.pathname.startsWith('/admin/review/');

    
    return (
        <ReviewProcessProvider>
            <DarkModeProvider>
            <div className="App">
                {isLoggedIn && !isReviewProcessPage && (
                    <>
                        <Header isAdmin={isAdmin} handleLogout={() => setIsLoggedIn(false)} handleSettings={handleSettingsClick} />
                        {userInfoVisible && (
                            <UserInfo user={currentUser} isOpen={userInfoVisible} onClose={closeUserInfo} updateMember={() => { }} />
                        )}
                    </>
                )}
                <AppRoutes isLoggedIn={isLoggedIn} isAdmin={isAdmin} />
            </div>
            </DarkModeProvider>
        </ReviewProcessProvider>
    );
}

export default App;
