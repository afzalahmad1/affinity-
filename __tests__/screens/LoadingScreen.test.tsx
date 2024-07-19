import React from 'react';
import { render } from '@testing-library/react-native';
import LoadingScreen from '../../src/screens/RegisterAndLogin/LoadingScreen';
import { Affinity_Logo } from '../../src/theme/images';

describe('LoadingScreen', () => {
  it('renders correctly', () => {
    const { getByTestId } = render(<LoadingScreen />);
    
    // Check if the loading container is rendered
    const loadingContainer = getByTestId('loading-container');
    expect(loadingContainer).toBeTruthy();

    // Check if the image is rendered
    const image = getByTestId('loading-image');
    expect(image).toBeTruthy();
    expect(image.props.source).toEqual(Affinity_Logo);
    expect(image.props.style).toEqual({
      resizeMode: 'contain',
      width: 150,
    });
  });
});
