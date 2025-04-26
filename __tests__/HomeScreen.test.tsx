import { render, screen } from '@testing-library/react-native';
import HomeScreen from "~/app/(tabs)";
import {getNews} from '~/app/api/newsApi';

jest.mock('~/app/api/newsApi', () => ({
  getNews: jest.fn(),
}));

describe('HomeScreen', () => {
  it('renders list of news articles', async () => {
    (getNews as jest.Mock).mockResolvedValueOnce([
      { id: 1, title: 'Test News', content: 'Content of test news' },
    ]);

    render(<HomeScreen />);

    expect(await screen.findByText('Test News')).toBeTruthy();
  });
});
