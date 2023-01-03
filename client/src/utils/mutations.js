import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
mutation login($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    token
    user {
      _id
      username
      email
      isAdmin
    }
  }
}
    `;
    
    export const ADD_USER = gql`
   mutation addUser($username: String!, $email: String!, $password: String!) {
  addUser(username: $username, email: $email, password: $password) {
    token
    user {
      _id
      username
      email
      isAdmin
    }
  }
}
  `;

export const SAVE_LESSON = gql`
mutation saveLesson($lessonData: LessonInput!) {
  saveLesson(lessonData: $lessonData) {
    token
      user {
        _id
        username
        email
        isAdmin
        savedLesson {
          title
          description
          tabsURL
          videoURL
        }
      }
}
}
`;
      export const REMOVE_LESSON = gql`
    mutation removeLesson( $lessonId: ID!) {
    removeLesson(lessonId: $lessonId) {
      token
      user {
        _id
        username
        email
        isAdmin
        savedLesson {
          title
          description
          tabsURL
          videoURL
        }
      }
    }
    }
  `;