import React from 'react';
import { useSelector } from 'react-redux';
import ListGenerator from './ListGenerator.jsx';
import Toolbar from './Toolbar.jsx';

export default function Home() {
  const { username } = useSelector((state) => state.user);
  return (
    <div>
      <Toolbar username={`Hello, ${username}`} />
      <ListGenerator />
    </div>
  );
}
