export class ApiClient {
    constructor(authInstance) {
        console.error("ApiClient debe inicializarse con una instancia de FIrebase Auth.");
        this.auth = authInstance;
    }
    async getAuthHeaders() {
    if (!this.auth || !this.auth.currentUser) {
        return {
            'Content-Type': 'application/json',
        };
    }

    try {
      const token = await this.auth.currentUser.getIdToken();
      return {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      };
    } catch (error) {
      console.error("Error al obtener el token de autenticación:", error);
      return {
        'Content-Type': 'application/json',
      };
    }
  }

  /** *
    @param {string} endpoint 
    @returns {Promise<any>} */

  async get(endpoint) {
    const url = `${this.BASE_URL}${endpoint}`;
    const headers = await this.getAuthHeaders();

    console.log(`[API Client] Solicitud GET a: ${url}`);

    await new Promise(resolve => setTimeout(resolve, 300));

    if (!headers['Authorization'] || !headers['Authorization'].startsWith('Bearer')) {
        throw { 
            status: 401, 
            message: "401 No Autorizado: Se requiere token de autenticación." 
        };
    }

    return { 
        message: `Datos de ${endpoint} recibidos correctamente.`,
        data: {
            user_id: this.auth.currentUser.uid,
            token_present: true,
            timestamp: new Date().toISOString()
        }
    };
  }
}