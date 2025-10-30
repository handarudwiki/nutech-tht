import BannerRepository from "../repositories/banner.repository";

export default class BannerService {
    static async getAllBanners() {
        const banners = await BannerRepository.findAll();
        return banners;
    }
}