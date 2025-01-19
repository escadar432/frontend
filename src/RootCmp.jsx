import React from 'react'
import { Routes, Route } from 'react-router'

import { HomePage } from './pages/HomePage'

import { AppFooter } from './cmps/AppFooter'


export function RootCmp() {
    return (
        <div className="app flex column">
            <main className="main-content">
                <Routes>
                    <Route path="" element={<HomePage />} />
            
                    {/* <Route path="post/:postId" element={<PostDetails />} />
                    <Route path="user/:id" element={<UserDetails />} />
                    <Route path="review" element={<ReviewIndex />} />
                    <Route path="chat" element={<ChatApp />} />
                    <Route path="admin" element={<AdminIndex />} />
                    <Route path="login" element={<LoginSignup />}>
                        <Route index element={<Login />} />
                        <Route path="signup" element={<Signup />} />
                    </Route> */}
                </Routes>
            </main>
            <AppFooter />
        </div>
    )
}


