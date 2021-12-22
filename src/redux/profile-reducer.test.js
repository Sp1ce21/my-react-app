import React from 'react';
import profileReducer, { addPostActionCreator } from './profile-reducer';

test('adding new post message', () => {
    let action = addPostActionCreator('it`s new post')

    let state = {
        posts: [
            {text: 'Hello!' },
            {text: 'Guys' },
            {text: 'Welcome to the' },
            {text: 'Club' },
            {text: 'Body!' },
        ],
    }

    let newState = profileReducer(state, action);

    expect(newState.posts.length).toBe(6);

  });
  