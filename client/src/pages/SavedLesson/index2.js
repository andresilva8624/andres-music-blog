import React, { useState, useEffect } from 'react';
import { Jumbotron, Container, Col, Form, Button, Card, CardColumns } from 'react-bootstrap';

import Auth from '../../utils/auth';
import { useMutation } from '@apollo/client';
import { SAVE_LESSON } from '../../utils/mutations';
import { saveLessonIds, getSavedLessonIds } from '../../utils/localStorage';

const SearchLessons = () => {
  // create state for holding returned google api data
  const [searchedLessons, setSearchedLessons] = useState([]);
  // create state for holding our search field data
  const [searchInput, setSearchInput] = useState('');

  // create state to hold saved bookId values
  const [savedLessonIds, setSavedLessonIds] = useState(getSavedLessonIds());

  const [saveLesson, { error }] = useMutation(SAVE_LESSON);

  // set up useEffect hook to save `savedBookIds` list to localStorage on component unmount
  // learn more here: https://reactjs.org/docs/hooks-effect.html#effects-with-cleanup
  useEffect(() => {
    return () => saveLessonIds(savedLessonIds);
  });

  // create method to search for books and set state on form submit
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    if (!searchInput) {
      return false;
    }

    try {
      const response = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=${searchInput}`
      );

      if (!response.ok) {
        throw new Error('something went wrong!');
      }

      const { items } = await response.json();

      const lessonData = items.map((lesson) => ({
        lessonId: lesson.id,
        authors: lesson.volumeInfo.authors || ['No author to display'],
        title: lesson.volumeInfo.title,
        description: lesson.volumeInfo.description,
        image: lesson.volumeInfo.imageLinks?.thumbnail || '',
      }));

      setSearchedLessons(lessonData);
      setSearchInput('');
    } catch (err) {
      console.error(err);
    }
  };

  // create function to handle saving a lesson to our database
  const handleSaveLesson = async (lessonId) => {
    // find the lesson in `searchedBooks` state by the matching id
    const lessonToSave = searchedLessons.find((lesson) => lesson.lessonId === lessonId);

    // get token
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      const { data } = await saveLesson({
        variables: { lessonData: { ...lessonToSave } },
      });
      console.log(savedLessonIds);
      setSavedLessonIds([...savedLessonIds, lessonToSave.lessonId]);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <Jumbotron fluid className='text-light bg-dark'>
        <Container>
          <h1>Search for Lesson!</h1>
          <Form onSubmit={handleFormSubmit}>
            <Form.Row>
              <Col xs={12} md={8}>
                <Form.Control
                  name='searchInput'
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  type='text'
                  size='lg'
                  placeholder='Search for a lesson'
                />
              </Col>
              <Col xs={12} md={4}>
                <Button type='submit' variant='success' size='lg'>
                  Submit Search
                </Button>
              </Col>
            </Form.Row>
          </Form>
        </Container>
      </Jumbotron>

      <Container>
        <h2>
          {searchedLessons.length
            ? `Viewing ${searchedLessons.length} results:`
            : 'Search for a lesson to begin'}
        </h2>
        <CardColumns>
          {searchedBooks.map((lesson) => {
            return (
              <Card key={lesson.bookId} border='dark'>
                {lesson.image ? (
                  <Card.Img 
                  src={lesson.image} 
                  alt={`The cover for ${lesson.title}`} 
                  variant='top' 
                  />
                ) : null}
                <Card.Body>
                  <Card.Title>{lesson.title}</Card.Title>
                  <p className='small'>Authors: {lesson.authors}</p>
                  <Card.Text>{lesson.description}</Card.Text>
                  {Auth.loggedIn() && (
                    <Button
                      disabled={savedLessonIds?.some(
                        (savedId) => savedId === lesson.bookId
                        )}
                      className='btn-block btn-info'
                      onClick={() => handleSaveBook(lesson.lessonId)}
                      >
                      {savedLessonIds?.some((savedId) => savedId === lesson.lessonId)
                        ? 'This lesson has already been saved!'
                        : 'Save this Lesson!'}
                    </Button>
                  )}
                </Card.Body>
              </Card>
            );
          })}
        </CardColumns>
      </Container>
    </>
  );
};

export default SearchLessons;
