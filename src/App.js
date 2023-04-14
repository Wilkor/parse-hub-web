import React from 'react';
import Routes from "./routes/routers";
import { PageHeader } from './Components/PageHeader'
export default function App() {
    const title = `.parse(Hub)`;
    return (
        <>
            <PageHeader title={title}></PageHeader>
            <Routes  />
        </>
    );
}