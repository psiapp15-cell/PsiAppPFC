
const useMocksEnv = import.meta.env.VITE_USE_MOCKS;

export const USE_MOCKS = useMocksEnv === undefined ? true : useMocksEnv !== 'false';

export const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:3333/api';
