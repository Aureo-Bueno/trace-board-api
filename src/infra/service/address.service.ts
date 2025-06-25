import logger from "../../config/logger";
import addressRepository from "../repository/address.repository";

class AddressService {
  private addressRepository = addressRepository;
  private logger = logger;
  constructor() {
    this.addressRepository = addressRepository;
    this.logger = logger;
  }

  async create(addressData: any) {
    this.logger.info(
      "[AddressService] Creating address with data:",
      addressData
    );
    try {
      const address = await this.addressRepository.create(addressData);
      this.logger.info(
        "[AddressService] Address created successfully:",
        address.id
      );
      return address;
    } catch (error) {
      this.logger.error("[AddressService] Error creating address:", error);
      throw error;
    }
  }
}

export default new AddressService();
