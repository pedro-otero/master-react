import React, { useContext, useEffect } from 'react';
import { act, render } from '@testing-library/react';

import View, { ViewContext } from './view';

describe('Load Failure component', () => {
  it('displays children', async () => {
    let utils;
    await act(async () => {
      utils = render(<View failureMessage="THIS FAILED">
            Everything is okay!!!
      </View>);
    });

    expect(utils.getByText('Everything is okay!!!')).toBeInTheDocument();
    expect(utils.queryByText('THIS FAILED')).not.toBeInTheDocument();
  });

  it('displays failure message', async () => {
    const BadComponent = () => {
      const { setIsError } = useContext(ViewContext);
      useEffect(() => {
        setIsError(true);
      }, [setIsError]);
      return <div />;
    };

    let utils;
    await act(async () => {
      utils = render(<View failureMessage="THIS FAILED">
        <BadComponent />
      </View>);
    });

    expect(utils.queryByText('Everything is okay!!!')).not.toBeInTheDocument();
    expect(utils.getByText('THIS FAILED')).toBeInTheDocument();
  });
});
