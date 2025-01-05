import { type ReactDigitalPlugin } from '../react-digital';
import { ThemeProvider } from './theme';

export default class DigitalUiPlugin implements ReactDigitalPlugin<{}> {
    public readonly config = {};
    public readonly Provider = ThemeProvider;
    public readonly Middlewares = [];
}
