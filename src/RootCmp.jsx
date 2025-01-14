import React from 'react'
import { Routes, Route } from 'react-router'

import { HomePage } from './pages/HomePage'

import { AppHeader } from './cmps/AppHeader'
import { AppFooter } from './cmps/AppFooter'


export function RootCmp() {
    return (
        <div className="main-container">
            <AppHeader />

            <main>
                <Routes>
                    <Route path="" element={<HomePage />} />
            
                    {/* <Route path="story/:storyId" element={<StoryDetails />} />
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


