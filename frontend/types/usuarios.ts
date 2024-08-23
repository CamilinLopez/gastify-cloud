// Interface para las credenciales del usuario (registro o login)
export interface UserCredentials {
  nombre:string
  email: string;
  password: string;
}

// Interface para la respuesta del servidor después del registro o login
export interface UserResponse {
  message: string;
  user: {
    id: string; // ID del usuario registrad
    email: string;
    // Puedes agregar otros campos de usuario si es necesario, como ID, nombre, etc.
  };
  dashboard:string
  // Agrega campos adicionales si es necesario, como tokens de autenticación
}

// Estado inicial del slice de usuarios
export interface InitialStateUsuarios {
  user: UserResponse;
  messageResponse: string | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: ResposeData | null;
}

interface ResposeData {
  message: string;
  result: UserResponse[];
}


// types/usuarios.ts
export interface User {
  id: number;
  email: string;
  verificado: boolean;
  fecha_creacion: string;
  rol: {nombre:string};
}

export interface UsersState {
  data: User[];
  messageResponse: string;
  error: string | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
}

export interface UsersSetPasswordState {
  email: string;
  password:string;
  empresa:string;
}