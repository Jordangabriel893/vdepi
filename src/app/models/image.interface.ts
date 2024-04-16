export interface ILightboxImage {
    src: string;
    caption?: string;
    thumb?: string;
    [propName: string]: any; // Permite adicionar propriedades extras, se necessário
  }