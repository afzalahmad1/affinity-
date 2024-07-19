import React from 'react';
import { render } from '@testing-library/react-native';
import CarouselContainer from '../../../src/components/specific/RegisterAndLogin/CarouselContainer';
import { Affinity_Logo } from '../../../src/theme/images';
import colors from '../../../src/theme/colors';

describe('CarouselContainer', () => {
  it('renders correctly', () => {
    const { getByTestId } = render(<CarouselContainer />);
    
    // Check if the logo container is rendered
    const logoContainer = getByTestId('logo-container');
    expect(logoContainer).toBeTruthy();
    
    // Check if the logo image is rendered
    const logoImage = getByTestId('logo-image');
    expect(logoImage).toBeTruthy();
    expect(logoImage.props.source).toEqual(Affinity_Logo);

    // Check if the carousel container is rendered
    const carouselContainer = getByTestId('carousel-container');
    expect(carouselContainer).toBeTruthy();
    
    // Check if the carousel text is rendered
    const carouselText = getByTestId('carousel-text');
    expect(carouselText).toBeTruthy();
  });
});
