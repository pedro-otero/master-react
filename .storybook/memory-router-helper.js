import React from "react";
import {MemoryRouter} from "react-router-dom";
import { storiesOf } from '@storybook/react';

export default function (name, module) {
  return storiesOf(name, module)
    .addDecorator(story => (
      <MemoryRouter initialEntries={['/']}>{story()}</MemoryRouter>
    ));
}
