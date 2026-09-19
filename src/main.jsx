import React from 'react';
import {hydrateRoot,createRoot} from 'react-dom/client';
import App from './App.jsx';
import './styles.css';
const path=window.location.pathname.replace(/\/$/,'')||'/';
const root=document.getElementById('root');
if(root.querySelector('main')) hydrateRoot(root,<App path={path}/>);else createRoot(root).render(<App path={path}/>);

const legacyHashes={"#about":"#victoria","#stories":"#historias","#services":"#precios","#rec589650300":"#contacto"};
if(legacyHashes[window.location.hash]){const next=legacyHashes[window.location.hash];history.replaceState(null,"",next);document.querySelector(next)?.scrollIntoView();}
