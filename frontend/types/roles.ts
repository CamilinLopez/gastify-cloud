// Define el tipo de datos de rol
export interface Role {
  id: string;
  nombre: string;
}

// Define el tipo de estado
export interface RolesState {
  roles: Role[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  messageResponse: string | null;
  error: ResposeData | null;
}
export interface ResposeData {
  message: string;
  result: Role[];
}

export interface RolesResponse {
  roles: Role[];
}