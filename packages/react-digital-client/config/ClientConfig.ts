import type { CreateAxiosDefaults } from 'axios';
import type { DefaultOptions } from '@tanstack/react-query';

export interface ClientConfig {
    axiosConfig?: CreateAxiosDefaults;
    tanstackConfig?: DefaultOptions;
}
