import React, { useState, useCallback, useEffect } from 'react';

import styles from './Section.module.scss';
import Link from 'next/link';

import { LevelLesson, Level } from 'models';
import { getLesson } from 'API/api';

import Lesson from './Lesson';
import Breadcrumbs from './Breadcrumbs';
import ReactMarkdown from 'react-markdown';

type SectionProps = Level & {
  activeLesson: string;
};

const Section = ({
  title,
  subtitle,
  lessons,
  id,
  activeLesson,
}: SectionProps) => {
  const [lesson, setLesson] = useState((null as unknown) as LevelLesson);

  const reqLesson = useCallback(async (id: string) => {
    setLesson(await getLesson(id));
  }, []);

  useEffect(() => {
    if (!lessons) {
      reqLesson(activeLesson);
    } else {
      setLesson(lessons.find(e => e.id === activeLesson)!);
    }
  }, [reqLesson, activeLesson, lessons]);

  return (
    <div className={styles.section}>
      {!activeLesson && (
        <>
          <h2>{title}</h2>
          <h3>{subtitle}</h3>
          <hr />
          {lessons.map(e => (
            <Link
              href='/learn/[levelId]/[lessonId]'
              as={`/learn/${id}/${e.id}`}
              key={e.title}
              passHref
            >
              <div className={styles.link}>
                <h2>{e.title}</h2>
                <ReactMarkdown source={e.subtitle} />
              </div>
            </Link>
          ))}
        </>
      )}
      {activeLesson && (
        <>
          <Breadcrumbs lesson={lesson} id={id} title={title} />
          <Lesson lesson={lesson} />
        </>
      )}
    </div>
  );
};

export default Section;
