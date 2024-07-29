"use client"

import { NoteListComponent } from '@/Components/NoteListComponent';
import './globals.css'
import { CreateNoteComponent } from '@/Components/CreateNoteComponent';
import { useContext, useEffect, useState } from 'react';
import { Note } from '@/Types';
import axios from 'axios';
import { NoteContext } from '@/context/NoteContext';

export default function Home() {
  const context = useContext(NoteContext);

  return (
    <>
      <NoteListComponent notes={context?.notes}/>
      <CreateNoteComponent/>
    </>
  );
}
