import type { Tool } from './components/Tools';

export interface PuckUrlState {
    entity?: string;
    tool?: Tool['id'];
}
