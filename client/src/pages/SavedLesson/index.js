import React from 'react';
import { Jumbotron, Container, CardColumns, Card, Button } from 'react-bootstrap';

import { useQuery } from '@apollo/client';
import { QUERY_ME } from '../../utils/queries';
// import { REMOVE_LESSON } from '../../utils/mutations';

import Auth from '../../utils/auth';
// import { removeLessonId } from '../../utils/localStorage';

const SavedLesson = () => {
  const { loading, data } = useQuery(QUERY_ME);
  // const [removeLesson ] = useMutation(REMOVE_LESSON);

  const lessonData = data?.me || {};



  // create function that accepts the LESSON's mongo _id value as param and deletes the LESSON from the database
  const handleDeleteLesson = async (LessonId) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

  //   try {
  //     const lessonData  = await removeLesson({
  //       variables: { LessonId },
  //     });

  //     // upon success, remove LESSON's id from localStorage
  //     removeLessonId(LessonId);
  //   } catch (err) {
  //     console.error(err);
  //   }
  };

  if (loading) {
    return <h2>LOADING...</h2>;
  }

  return (
    <>
      <Jumbotron fluid className='text-light bg-dark'>
        <Container>
          <h1>Viewing {lessonData.username}'s Lessons!</h1>
        </Container>
      </Jumbotron>
      <Container>
        <h2>
          {lessonData.SavedLesson?.length
            ? `Viewing ${lessonData.SavedLesson.length} saved ${
              lessonData.SavedLesson.length === 1 ? 'Lesson' : 'Lessons'
            }:`
            : 'You have no saved Lessons!'}
        </h2>
        <CardColumns>
          {lessonData.SavedLesson?.map((Lesson) => {
            return (
              <Card key={Lesson.LesonId} border='dark'>
                {Lesson.image ? (
                <Card.Img 
                src={Lesson.image} 
                alt={`The cover for ${Lesson.title}`} 
                variant='top' 
                /> 
                ): null}
                <Card.Body>
                  <Card.Title>{Lesson.title}</Card.Title>
                  <p className='small'>Authors: {Lesson.authors}</p>
                  <Card.Text>{Lesson.description}</Card.Text>
                  <Button className='btn-block btn-danger' 
                  onClick={() => handleDeleteLesson(Lesson.LessonId)}>
                    Delete this Lesson!
                  </Button>
                </Card.Body>
              </Card>
            );
          })}
        </CardColumns>
      </Container>
    </>
  );
};

export default SavedLesson;
