import BannerRepository from "../repositories/banner.repository";

export default class BannerService {
    static async getAll() {
        const banners = await BannerRepository.findAll();
        return banners;
    }
}