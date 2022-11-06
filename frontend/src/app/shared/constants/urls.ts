import { environment } from "src/environments/environment";

const BASE_URL= environment.production?'':'http://localhost:5000';

export const PRODUCTOS_URL = BASE_URL + '/productos';
export const PRODUCTOS_GET_ALL = PRODUCTOS_URL;
export const PRODUCTOS_ADD_ONE = PRODUCTOS_URL;
export const PRODUCTOS_EDIT = PRODUCTOS_URL;
export const PRODUCTOS_GET_BY_ID = PRODUCTOS_URL+'/';
export const PRODUCTOS_DELETE_BY_ID = PRODUCTOS_URL+'/';
export const PRODUCTOS_BY_NAME = PRODUCTOS_URL + '/search/';

export const CATEGORIA_URL = BASE_URL + '/categorias';
export const CATEGORIA_GET_ALL = CATEGORIA_URL;
export const CATEGORIA_ADD_ONE = CATEGORIA_URL;
export const CATEGORIA_EDIT = CATEGORIA_URL;
export const CATEGORIA_GET_BY_ID = CATEGORIA_URL+'/';
export const CATEGORIA_DELETE_BY_ID = CATEGORIA_URL+'/';
export const CATEGORIA_GET_TAGS = CATEGORIA_URL + '/tags';

export const USUARIO_URL = BASE_URL + '/usuarios';
export const USUARIO_LOGIN = USUARIO_URL+'/login';
export const USUARIO_REGISTRO = USUARIO_URL+'/registro';
export const USUARIO_GET_ALL = USUARIO_URL;
export const USUARIO_ADD = USUARIO_URL;
export const USUARIO_UPDATE = USUARIO_URL;
export const USUARIO_GET_BY_ID = USUARIO_URL+'/';
export const USUARIO_DELETE_BY_ID = USUARIO_URL+'/';

export const PEDIDO_URL = BASE_URL + '/pedidos';
export const PEDIDO_BY_USUARIO = PEDIDO_URL;
export const PEDIDO_BY_ID = PEDIDO_URL+'/';
export const PEDIDO_CONFIRMAR = PEDIDO_URL;
export const PEDIDO_INICIAR = PEDIDO_URL;
export const PEDIDO_SEGUIMIENTO = PEDIDO_URL+'/seguimiento';
