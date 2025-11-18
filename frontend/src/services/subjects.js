// src/services/subjects.js

// Importamos la instancia de Axios configurada con el Interceptor
import axiosClient from '../api/axiosClient'; 

const SUBJECTS_URL = '/subjects'; 

/**
 * Obtiene la lista de todas las asignaturas.
 */
export const listSubjects = async () => {
    // axiosClient ya tiene el token adjunto gracias al Interceptor
    const { data } = await axiosClient.get(SUBJECTS_URL);
    return data;
};

/**
 * Crea una nueva asignatura.
 * @param {object} payload - Datos de la nueva asignatura.
 */
export const createSubject = async (payload) => {
    const { data } = await axiosClient.post(SUBJECTS_URL, payload);
    return data;
};

/**
 * Actualiza una asignatura existente.
 * @param {string | number} id - ID de la asignatura a actualizar.
 * @param {object} payload - Datos actualizados de la asignatura.
 */
export const updateSubject = async (id, payload) => {
    const { data } = await axiosClient.put(`${SUBJECTS_URL}/${id}`, payload);
    return data;
};

/**
 * Elimina una asignatura.
 * @param {string | number} id - ID de la asignatura a eliminar.
 */
export const removeSubject = async (id) => {
    // La respuesta esperada es un 204 No Content
    await axiosClient.delete(`${SUBJECTS_URL}/${id}`);
};

// Exportamos un objeto de servicio para facilitar la importación en los componentes
export const subjectService = {
    listSubjects,
    createSubject,
    updateSubject,
    removeSubject,
};