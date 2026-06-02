export type State = {
  errors?: {
    nome?: string[];
    email?: string[];
    perfil?: string[];
    setorId?: string[];
    membroId?: string[];
    instrumento?: string[]
  };
  message?: string | null;
};
