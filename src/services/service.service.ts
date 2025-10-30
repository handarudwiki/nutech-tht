import ServiceRepository from "../repositories/service.repository";

export default class ServiceService {
    static async getAll() {
        return ServiceRepository.findAll();
    }
}