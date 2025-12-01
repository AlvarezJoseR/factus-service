# FACTUS API

API para integración con servicios de facturación electrónica FACTUS. Sistema que maneja peticiones a la API de FACTUS, controla intentos fallidos y almacena resultados.

## 🚀 Características

- **Autenticación JWT** - Sistema seguro de login y registro
- **Gestión de usuarios** - Registro y autenticación de usuarios
- **Tracking de peticiones** - Control completo del ciclo de peticiones a FACTUS
- **Control de intentos** - Manejo automático de reintentos
- **Logging estructurado** - Logs detallados del sistema
- **Arquitectura modular** - Separación clara de responsabilidades

## 📋 Requisitos

- Node.js 18+
- MySQL 8.0+
- npm o yarn

## ⚡ Instalación

```bash
# Clonar repositorio
git clone <repository-url>
cd FACTUS

# Instalar dependencias
npm install

# Configurar variables de entorno
cp .env.example .env
# Editar .env con tus configuraciones

# Crear base de datos
mysql -u root -p < factus_schema.sql

# Iniciar servidor
npm start
```

## 🔧 Configuración

### Variables de entorno (.env)

```env
# Servidor
PUERTO=3000
NODE_ENV=development

# Frontend CORS
NODE_FRONTEND=http://localhost:3000

# Base de datos
DB_HOST=localhost
DB_USER=root
DB_PASS=
DB_NAME=factus_api
DB_PORT=3306

# JWT
JWT_SECRET=tu_jwt_secret_aqui
JWT_EXPIRES=24
```

### Base de datos

Ejecutar el archivo `factus_schema.sql` para crear la estructura:

```bash
mysql -u root -p < factus_schema.sql
```

## 📚 Endpoints

### Autenticación

#### POST `/api/auth/login`
Autenticar usuario existente

**Request:**
```json
{
  "email": "usuario@example.com",
  "password": "1234567890"
}
```

**Response:**
```json
{
  "status": 200,
  "message": "Login exitoso",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "businessName": "Empresa Example",
    "email": "usuario@example.com",
    "phone": "+52 55 1234 5678",
    "lastLogin": "2025-11-30T10:00:00.000Z"
  }
}
```

### Usuarios

#### POST `/api/users/register`
Registrar nuevo usuario

**Request:**
```json
{
  "business_name": "Empresa Example S.A. de C.V.",
  "email": "usuario@example.com",
  "password": "1234567890",
  "phone": "+52 55 1234 5678",
  "address": "Calle Example #123, Col. Centro, CDMX"
}
```

**Response:**
```json
{
  "status": 201,
  "message": "Usuario registrado exitosamente",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 2,
    "businessName": "Empresa Example S.A. de C.V.",
    "email": "usuario@example.com",
    "phone": "+52 55 1234 5678"
  }
}
```

## 🏗️ Arquitectura

```
src/
├── config/          # Configuraciones
├── controllers/     # Controladores HTTP
├── services/        # Lógica de negocio
├── repositories/    # Acceso a datos
├── routes/          # Definición de rutas
├── utils/           # Utilidades (JWT, bcrypt)
└── middleware/      # Middlewares
```

## 🗄️ Base de datos

### Tablas principales:

- **users** - Usuarios del sistema
- **factus_services** - Servicios disponibles de FACTUS
- **factus_requests** - Peticiones realizadas a FACTUS
- **system_logs** - Logs del sistema

### Flujo de peticiones:

1. **Usuario** hace petición
2. **Sistema** registra en `factus_requests`
3. **API FACTUS** procesa petición
4. **Sistema** actualiza estado y respuesta
5. **Logs** registran todo el proceso

## 🔐 Autenticación

El sistema utiliza **JWT (JSON Web Tokens)** para la autenticación:

1. Usuario se registra o hace login
2. Sistema genera JWT token
3. Cliente incluye token en header: `Authorization: Bearer <token>`
4. Sistema valida token en peticiones protegidas

## 🧪 Testing con Postman

Importar la colección `factus_api.postman_collection.json`:

1. Abrir Postman
2. Import > Upload Files > `factus_api.postman_collection.json`
3. Configurar variable `baseUrl` = `http://localhost:3000`
4. Ejecutar requests (el token se guarda automáticamente)

## 📦 Dependencias principales

```json
{
  "bcrypt": "^5.1.0",
  "cors": "^2.8.5",
  "dotenv": "^17.2.3",
  "express": "^5.1.0",
  "jsonwebtoken": "^9.0.0",
  "mysql2": "^3.15.3",
  "uuid": "^9.0.0"
}
```

## 🚀 Scripts disponibles

```bash
# Desarrollo (con watch)
npm run dev

# Producción
npm start

# Tests
npm test
```

## 📝 Notas de desarrollo

### Servicios FACTUS disponibles:

- **stamp_cfdi** - Timbrado de facturas CFDI
- **cancel_cfdi** - Cancelación de facturas CFDI  
- **check_status** - Consulta estatus de facturas
- **validate_rfc** - Validación de RFC con SAT

### Control de intentos:

- Máximo 3 intentos por petición
- Tracking automático de fallos
- Logs detallados de errores
- Estados: pending, processing, success, error, failed

## 🤝 Contribución

1. Fork el proyecto
2. Crear rama feature (`git checkout -b feature/AmazingFeature`)
3. Commit cambios (`git commit -m 'Add AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abrir Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver archivo `LICENSE` para detalles.

## 📞 Soporte

Para soporte técnico o preguntas:
- Email: soporte@factus.com
- Documentación: [docs.factus.com](https://docs.factus.com)

---

**FACTUS API** - Sistema de integración para facturación electrónica