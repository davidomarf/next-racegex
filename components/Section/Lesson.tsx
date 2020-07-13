import React from 'react';
import { LevelLesson } from 'models';
import ReactMarkdown from 'react-markdown';

type LessonProps = {
  lesson: LevelLesson;
};

const Lesson = ({ lesson }: LessonProps) => {
  return (
    <>
      {JSON.stringify(lesson, null, 2)}

      <h2>{lesson && lesson.title}</h2>
      <ReactMarkdown source={lesson && lesson.content}></ReactMarkdown>
    </>
  );
};

export default Lesson;
